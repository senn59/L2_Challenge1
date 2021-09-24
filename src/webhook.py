import requests
import json
from datetime import datetime
from discord_webhook import DiscordWebhook
webhook_url = "http://127.0.0.1:5000/webhook"
discord_webhook_url = "https://discord.com/api/webhooks/890539825608945684/TAKgjjrMNvzCp3Ehx7UiEbQ9nQLWZMzU_GbhTTMVv169-beJpkiYsvpCQcgTSZ54rg10"

timestamp = datetime.timestamp(datetime.now())
data = {"timestamp": timestamp}
r = requests.post(webhook_url, data=json.dumps(data), headers={"Content-type": "application/json"})


webhook = DiscordWebhook(url=discord_webhook_url, content=str(timestamp))
response = webhook.execute()