import requests
import json
from datetime import datetime
from discord_webhook import DiscordWebhook
webhook_url = "http://127.0.0.1:5000/webhook"
discord_webhook_url = "https://discord.com/api/webhooks/892729220583800862/DGR1x-brlABE6fOKa0wLMPbWxW_-S3davpx2N46Il9TOmvqo8CvfmX9HX6_okYxSMN0Y"

data = {
    "hour": datetime.today().strftime("%H:%M"),
    "date": datetime.today().strftime("%d/%m/%y"),
    "auth": "-]E.?^DuEbzS5F.r"
}
r = requests.post(webhook_url, data=json.dumps(data), headers={"Content-type": "application/json"})
print("Webhook sent!")

webhook = DiscordWebhook(url=discord_webhook_url, content="<@179273443710205953> SENSOR WENT OFF!")
response = webhook.execute()