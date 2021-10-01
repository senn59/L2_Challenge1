from datetime import datetime, timedelta
from pymongo import MongoClient
conn = MongoClient("localhost", 27017)
db = conn.local
col = db.timestamps


now = datetime.now()
last7days = []
for x in range(7):
    date = now - timedelta(days=x)
    last7days.append(date.strftime("%d/%m/%y"))
    

col_data = col.find({"date": {"$in": ["30/09/21", "29/09/21"]}})
for x in col_data:
    print(x)
#datetime.now() + datetime.timedelta(days=7)