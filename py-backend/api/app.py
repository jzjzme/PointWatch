#!flask/bin/python
from flask import Flask, jsonify
from pyflights import PyFlight
import json

app = Flask(__name__)
flight = PyFlight(api_key='')


@app.route('/')
def flights(adults,origin,price,dest,date):
	# parameters:
	# adults = 1
	# origin = 'SFO'
	# price  = 'EUR500'
	# dest   = 'LAS'
	# date   = '2017-10-25'
	
	search = flight.search(params={
        'adult_count': '%d'%adults,
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
