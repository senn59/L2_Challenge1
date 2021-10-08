from datetime import time
from flask import Flask, render_template ,request, abort, Response
from pymongo import MongoClient
from flask_socketio import SocketIO, emit
from werkzeug import debug
from datetime import datetime, timedelta
import json
#connect to database
conn = MongoClient("localhost", 27017)
db = conn.local
col = db.timestamps

app = Flask(__name__)
socketio = SocketIO(app)

@app.route("/")
def main():
    return render_template("index.html")

@app.route("/webhook", methods=["POST"])
def webhook():
    if request.method == "POST":
        webhook_data = request.json
        try:
            if webhook_data["auth"] == "-]E.?^DuEbzS5F.r":
                del webhook_data["auth"]
                col.insert_one(webhook_data)
                col_data = col.find(query)
                #list and send data
                data = []
                for x in col_data: data.append(x[field])
                socketio.emit("update", {"data": data})
            else:
                print("Webhook not authorized")
        except Exception:
            print("Invalid webhook")
        return Response(status=200)
    else:
        abort(400)

#get list of last 7 days
def getLast7Days():
    now = datetime.now()
    last7days = []
    for x in range(7):
        date = now - timedelta(days=x)
        last7days.append(date.strftime("%d/%m/%y"))
    return last7days


@socketio.on("getData")
def getData(msg):
    queries = {
        "week": {"date": {"$in": getLast7Days()}},
        "day": {"date": datetime.today().strftime("%d/%m/%y")},
        "specific": {"date": msg["data"]}
    }
    global query
    global field
    query = queries[msg["queryType"]]
    field = msg["field"]

    col_data = col.find(query)
    data = []
    for x in col_data: data.append(x[field])
    emit("update", {"data": data})

if __name__ == "__main__":
    socketio.run(app, debug=True)