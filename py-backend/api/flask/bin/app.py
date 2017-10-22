#!flask/bin/python
from flask import Flask, jsonify
from flask import request
from pyflights import PyFlight
from visa.helpers.visa_api_client import VisaAPIClient
import datetime
import json

app = Flask(__name__)
flight = PyFlight(api_key='AIzaSyD7VsS765wmLmGAzbnzit0sk_dB_wFULDI')#no API key because public repositiory

@app.route('/search', methods=['GET']) #search for flights
def search():
	# examples parameters:
	# adults = 1
	# origin = 'SFO'
	# price  = 'EUR500'
	# dest   = 'LAS'
	# date   = '2017-10-25'
	#http://127.0.0.1:5000/search?adults=1&origin=SFO&price=USD500&dest=LAX&date=2017-10-22

	adults = request.args.get('adults')
	origin = request.args.get('origin')
	price  = request.args.get('price')
	dest   = request.args.get('dest')
	date   = request.args.get('date')

	search = flight.search(params={
        'adult_count': '%s'%adults,
        'origin': '%s'%origin,
        'max_price': '%s'%price,
        'destination': '%s'%dest,
        'date': '%s'%date,
        'solutions': 10
	})
	for results in search:
	    output =  json.dumps(
	    	{
	        'id' : results.flight_number(),
	        'date' : date,
	        'departs_at' : results.departure_time(),
	        'arrives_at' : results.arrival_time(),
	        'price' : results.sale_total()
	        },
	        sort_keys=True, indent=4, separators=(',',': '))
    
	return results

@app.route('/transaction', methods=['GET']) #VISA Direct transaction to 

def screen():
	self.visa_api_client = VisaAPIClient() #sample data, real data will be read via JSON
		self.watch_list_inquiry = json.loads(''' { 
			"acquirerCountryCode": "101",
			"acquiringBin": "408999",
			"address": {
				"city": "San Francisco",
				"cardIssuerCountryCode": "USA"
				},
				"referenceNumber": "000000004",
				"name": "Jackie Zhang"
				}''')

def purchase():
	purchaseType = requests.args.get('type')
	date = datetime.datetime.now().strftime("%Y-%m-%dT%H:%M:%S") #visa direct transaction
		self.visa_api_client = VisaAPIClient()
		self.push_funds_request = json.loads('''{
			"systemsTraceAuditNumber": 350420,
			"retrievalReferenceNumber": "401010350420",
			"localTransactionDateTime": "'''+ date + '''",
			"acquiringBin": 409999,
			"acquirerCountryCode": "101",
			"senderAccountNumber": "1234567890123456",
			"transactionCurrencyCode": "USD",
			"senderName": "Jackie Zhang",
			"senderCountryCode": "USA",
			"senderAddress": "44 Market St.",
			"senderCity": "San Francisco",
			"senderStateCode": "CA",
			"recipientName": "Adam Smith",
			"recipientPrimaryAccountNumber": "4957030420210454",
			"amount": "200.00",
			"businessApplicationId": "AA",
			"transactionIdentifier": 234234322342343,
			"merchantCategoryCode": 6012,
			"sourceOfFundsCode": "03",
			"cardAcceptor": {
				"name": "John Smith",
				"terminalId": "13655392",
				"idCode": "VMT200911026070",
				"address": {
					"state": "CA",
					"county": "081",
					"country": "USA",
					"zipCode": "94105"
					}
				},
			"feeProgramIndicator": "123"
			}''')

		#store type of purchase flight, etc.

@app.route('/seller', methods=['GET']) #VISA Offers available to use

def offers():
	#find offers from VISA offers API
	#Nothing here

	
if __name__ == '__main__':
	app.run(debug=True)
