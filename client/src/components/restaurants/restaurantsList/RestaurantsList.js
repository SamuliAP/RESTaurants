import React from 'react';

import RestaurantsListRow from './RestaurantsListRow'
import '../../../assets/css/restaurants.css'

const SimpleExpansionPanel = props => {
  const { restaurants, deleteRestaurant, user } = props
  return (
    <div className="restaurants-list">
      {restaurants.map((restaurant) => 
        <RestaurantsListRow 
          key={restaurant.id}
          name={restaurant.name}
          address={restaurant.address}
          owner={restaurant.owner}
          id={restaurant.id}
          deleteRestaurant={deleteRestaurant}
          user={user}
        />
      )}
    </div>
  );
}

export default SimpleExpansionPanel;
