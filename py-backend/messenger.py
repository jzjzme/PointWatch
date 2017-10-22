#messenger.py
#send text message to individual when points are being purchased. Links to flights
#add to API
import nexmo


endpoint = "wss://h0j3zwoo.api.satori.com"
appkey = "d3fE5A8bc1D9C2e8761DfCf7d6cab13a"

client = nexmo.Client(key='d4f97f0e', secret='2e02d0a63e14517f')

response = client.send_message({'from': '12012413501', 'to': '19169908919', 'text': 'Someone wants to purchase your points! bit.ly92384239842'})

response = response['messages'][0]

if response['status'] == '0':
  print ('Sent message', response['message-id'])

  print ('Remaining balance is', response['remaining-balance'])
else:
  print ('Error:', response['error-text'])
