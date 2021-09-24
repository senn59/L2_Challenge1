from datetime import time
from os import times
from flask import Flask, render_template ,request, abort
from pymongo import MongoClient
import json
#connect to database
conn = MongoClient("localhost", 27017)
db = conn.local
col = db.timestamps
app = Flask(__name__)
@app.route("/")
def hello_world():
    return render_template("index.html")

@app.route("/webhook", methods=["POST"])
def webhook():
    if request.method == "POST":
        try:
            timestamp = request.json
            if type(timestamp["timestamp"]) == float:
                col.insert_one(timestamp)
                col_data = col.find({})
                for x in col_data:
                    print(x["timestamp"])
            else:
                raise TypeError
        except Exception:
            print("Invalid webhook data")
        return "success",  200
    else:
        abort(400)

if __name__ == "__main__":
    app.run(debug=True)