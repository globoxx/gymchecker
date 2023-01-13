import subprocess
from flask import Flask, request

app = Flask(__name__, static_folder="./frontend/build", static_url_path="/")

@app.route("/")
def index():
    return app.send_static_file("index.html")

@app.route("/execute", methods=["POST"])
def execute():
    code = request.form["code"]
    try:
        output = subprocess.run(["python", "-c", code], capture_output=True, text=True)
        return output.stdout or output.stderr
    except Exception as e:
        return str(e)

if __name__ == "__main__":
    app.run()