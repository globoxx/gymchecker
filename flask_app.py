import subprocess
from flask import Flask, request

app = Flask(__name__, static_folder="./frontend/build", static_url_path="/")

@app.route("/")
def index():
    return app.send_static_file("index.html")

@app.route("/execute", methods=["POST"])
def execute():
    code = request.get_json().get("code")
    input_data = request.get_json().get("input", '')
    try:
        process = subprocess.Popen(["python", "-u", "-c", code],
                                   stdin=subprocess.PIPE,
                                   stdout=subprocess.PIPE,
                                   stderr=subprocess.PIPE)
        output, error = process.communicate(input=input_data.encode(), timeout=30)
        return output or error
    except Exception as e:
        return str(e)

if __name__ == "__main__":
    app.run()