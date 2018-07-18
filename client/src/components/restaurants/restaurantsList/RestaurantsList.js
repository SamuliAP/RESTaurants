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
    nameErrors,
    addressErrors,
    fetchingDelete,
    fetching
  } = props
  return (
    <div className="restaurants-list">
      {/* 
        If no restaurants found, render a really sad story to seem more humane 
        even though you're really just a heartless corporate orverlord that actually 
        stole Timmys christmas presents. 
      */}
      {restaurants.length === 0 && !fetching &&
        <div>
          <p>No restaurants found :(</p>
          <p>Please go on and create some, or little Timmy here will get absolutely zero christmas presents:</p>
          <h4>
            {"q(:c)-|-<"}
          </h4>
          <p> Yeah it's just a crude draft but he definitely exists, so go create those restaurants already you heartless monster.</p>
        </div>
      }
      {restaurants.length > 0 && !fetching &&
      <div>
        <RestaurantsListHeader />
        {restaurants.map((restaurant) => 
          <RestaurantsListRow 
            saveEditName={saveEditName}
            fetchingDelete={fetchingDelete}
            fetching={fetching}
            saveEditAddress={saveEditAddress}
            key={restaurant.id}
            name={restaurant.name}
            address={restaurant.address}
            owner={restaurant.owner}
            id={restaurant.id}
            deleteRestaurant={deleteRestaurant}
            user={user}
            nameErrors={nameErrors}
            addressErrors={addressErrors}
            />
          )}
        </div>
      }
    </div>
  );
}

export default RestaurantsList;