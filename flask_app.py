import subprocess
from flask import Flask, render_template,  request

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/execute", methods=["POST"])
def execute():
    code = request.get_json().get("code")
    try:
        output = subprocess.run(["python", "-c", code], capture_output=True, text=True)
        return output.stdout or output.stderr
    except Exception as e:
        return str(e)

if __name__ == "__main__":
    app.run()