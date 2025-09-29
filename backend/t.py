from twilio.rest import Client

# Twilio credentials
account_sid = "AC23b5df062f2915fcf14c5c3dcf1068a5"
auth_token = "85f331f2fe15b1c13697e09a12795013"
twilio_number = "+15342009153"  # Your Twilio phone number
target_number = "+919970939067"  # Recipient number

client = Client(account_sid, auth_token)

message = client.messages.create(
    body="Test alert: Water quality exceeded safe limits!",
    from_=twilio_number,
    to=target_number
)

print(message.sid)