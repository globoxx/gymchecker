import subprocess
from flask import Flask, request

app = Flask(__name__, static_folder="./frontend/build", static_url_path="/")

@app.route("/")
def index():
    return app.send_static_file("index.html")

@app.route("/execute", methods=["POST"])
def execute():
    code = request.get_json().get("code")
    inputs = request.get_json().get("inputs", [])
    try:
        process = subprocess.Popen(["python", "-u", "-c", code],
                                   stdin=subprocess.PIPE,
                                   stdout=subprocess.PIPE,
                                   stderr=subprocess.PIPE)
        output = ""
        for input_data in inputs:
            output += process.stdin.write(input_data.encode() + b'\n')
            output += process.stdout.readline().decode()
        process.stdin.close()
        output += process.stdout.read().decode()
        return output
    except Exception as e:
        return str(e)

if __name__ == "__main__":
    app.run()