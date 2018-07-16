import React from 'react';


import RestaurantsListRow from './RestaurantsListRow'
import '../../../assets/css/restaurants.css'

const SimpleExpansionPanel = props => {
  return (
    <div className="restaurants-list">
      <RestaurantsListRow title="hellurei" />
      <RestaurantsListRow title="hellurei" />
    </div>
  );
}

export default SimpleExpansionPanel;
