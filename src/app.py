from datetime import time
from flask import Flask, render_template ,request, abort, Response
from pymongo import MongoClient
from flask_socketio import SocketIO, emit
from werkzeug import debug
#connect to database
conn = MongoClient("localhost", 27017)
db = conn.local
col = db.timestamps


app = Flask(__name__)
socketio = SocketIO(app)

@app.route("/")
def main():
    col_data = col.find({})
    data = []
    for x in col_data: data.append([x["hour"], x["date"]])
    return render_template("index.html", data=data)

@app.route("/webhook", methods=["POST"])
def webhook():
    if request.method == "POST":
        #try:
        webhook_data = request.json
        if webhook_data["auth"] == "-]E.?^DuEbzS5F.r":
            del webhook_data["auth"]
            col.insert_one(webhook_data)
            col_data = col.find({})

            #put data in a list and send it
            data = []
            for x in col_data: data.append([x["hour"], x["date"]])
            socketio.emit("new_webhook", {"data": data})
        else:
            print("Webhook not authorized")
        #except Exception:
        #    print("Invalid webhook data")
        return Response(status=200)
    else:
        abort(400)

if __name__ == "__main__":
    socketio.run(app, debug=True)