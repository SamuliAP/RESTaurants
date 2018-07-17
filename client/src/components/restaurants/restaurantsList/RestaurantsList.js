import React from 'react';

import RestaurantsListRow from './RestaurantsListRow'
import '../../../assets/css/restaurants.css'

const SimpleExpansionPanel = props => {
  const { restaurants } = props
  return (
    <div className="restaurants-list">
      {restaurants.map((restaurant) => 
        <RestaurantsListRow 
          key={restaurant.id}
          name={restaurant.name}
          address={restaurant.address}
          id={restaurant.id}
        />
      )}
    </div>
  );
}

export default SimpleExpansionPanel;
