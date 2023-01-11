
from flask import Flask, render_template, request

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/execute", methods=["POST"])
def execute():
    code = request.form["code"]
    #You may want to consider using subprocess.run() with the `python` command instead of eval or exec for security reasons
    try:
        output = eval(code)
        if output is not None:
            return str(output)
        else:
            return ""
    except Exception as e:
        return str(e)

if __name__ == "__main__":
    app.run()