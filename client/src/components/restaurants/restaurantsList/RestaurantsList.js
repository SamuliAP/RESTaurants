import React from 'react';

import RestaurantsListHeader from './RestaurantsListHeader'
import RestaurantsListRow from './RestaurantsListRow'
import '../../../assets/css/restaurants.css'


const RestaurantsList = props => {
  const { 
    restaurants, 
    deleteRestaurant, 
    user, 
    saveEditName, 
    saveEditAddress,
    errors
  } = props
  return (
    <div className="restaurants-list">
      <RestaurantsListHeader />
      {restaurants.map((restaurant) => 
        <RestaurantsListRow 
          saveEditName={saveEditName}
          saveEditAddress={saveEditAddress}
          key={restaurant.id}
          name={restaurant.name}
          address={restaurant.address}
          owner={restaurant.owner}
          id={restaurant.id}
          deleteRestaurant={deleteRestaurant}
          user={user}
          errors={errors}
        />
      )}
    </div>
  );
}

export default RestaurantsList;