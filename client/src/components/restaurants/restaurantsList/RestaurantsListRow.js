import React from 'react'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';

import CommentsContainer from '../comments/CommentsContainer'
import DeleteRestaurantButton from './DeleteRestaurantButton'

const RestaurantsListRow = props => {

  const thisDeleteRestaurant = () => props.deleteRestaurant(props.id)

  const showDeleteRestaurantButton = () => {
    if(user.role === 'admin' || props.owner === user._id) {
      return true
    }
    return false
  }

  const { name, address, id, user } = props
  return (
    <ExpansionPanel>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <div className="list-column">
          {name}
        </div>
        <div className="list-column">
          <Typography>{address}</Typography>
        </div>
        {showDeleteRestaurantButton() && 
          <div className="list-column">
            <DeleteRestaurantButton deleteRestaurant={thisDeleteRestaurant} />
          </div>
        }
      </ExpansionPanelSummary>
      <CommentsContainer restaurant={id}/>
    </ExpansionPanel>
  )
}

export default RestaurantsListRow
