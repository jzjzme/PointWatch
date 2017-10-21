import React from 'react'
import { observer, inject } from 'mobx-react'


const Flights = observer(({ store: { flight: { searchResults } } }) => (
  <div>
    {searchResults.trips.map((flight, i) => (
      <div key={`${i}-${flight.di}`}>
        {flight.departure_name}
      </div>
    ))}
  </div>
))

export default inject('store')(Flights)