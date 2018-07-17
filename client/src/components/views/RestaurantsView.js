import React from 'react'
import RestaurantsListContainer from '../restaurants/restaurantsList/RestaurantsListContainer'
import CreateRestaurantContainer from '../restaurants/CreateRestaurantContainer'

const RestaurantsView = props => {
  const showCreateRestaurant = () => user.role === 'admin' || user.role === 'manager'
  
  const { user } = props
  return (
    <div>
      {showCreateRestaurant && <CreateRestaurantContainer />}
      <RestaurantsListContainer />
    </div>
  )
}

export default RestaurantsView
