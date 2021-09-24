from flask import Flask, render_template ,request, abort

app = Flask(__name__)
@app.route("/")
def hello_world():
    return render_template("home.html")

@app.route("/webhook", methods=["POST"])
def webhook():
    if request.method == "POST":
        print(request.json)
        return "success",  200
    else:
        abort(400)

if __name__ == "__main__":
    app.run(debug=True)