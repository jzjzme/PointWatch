#!flask/bin/python
from flask import Flask, jsonify
from flask import request
from pyflights import PyFlight
import json

app = Flask(__name__)
flight = PyFlight(api_key='AIzaSyBNFMQ6w1pnPwjAudfZw-iliHUucHRxqiA')

@app.route('/flights', methods=['GET'])
def flights():
	# examples parameters:
	# adults = 1
	# origin = 'SFO'
	# price  = 'EUR500'
	# dest   = 'LAS'
	# date   = '2017-10-25'
	#http://127.0.0.1:5000/flights?adults=1&origin=SFO&price=EUR500&dest=LAS&date=2017-10-25

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
        'solutions': 1
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
    
	return output

if __name__ == '__main__':
	app.run(debug=True)