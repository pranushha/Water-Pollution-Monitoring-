from twilio.rest import Client
import os
# Twilio credentials
account_sid = os.getenv("TWILIO_ACCOUNT_SID")
auth_token = os.getenv("TWILIO_AUTH_TOKEN")
twilio_number = "+15342009153"  # Your Twilio phone number
target_number = "+919970939067"  # Recipient number

client = Client(account_sid, auth_token)

message = client.messages.create(
    body="Test alert: Water quality exceeded safe limits!",
    from_=twilio_number,
    to=target_number
)

print(message.sid)