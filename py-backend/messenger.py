#messenger.py
#send text message to individual when points are being purchased. Links to flights
#add to API
import nexmo

client = nexmo.Client(key=' ', secret=' ')

response = client.send_message({'from': '12012413501', 'to': '19169908919', 'text': 'Someone wants to purchase your points! bit.ly92384239842'})

response = response['messages'][0]

if response['status'] == '0':
  print ('Sent message', response['message-id'])

  print ('Remaining balance is', response['remaining-balance'])
else:
  print ('Error:', response['error-text'])
