import React from 'react'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';

import CommentsContainer from '../comments/CommentsContainer'

const RestaurantsListRow = props => {

  const { name, address, id } = props
  return (
    <ExpansionPanel>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <div className="list-column">
          {name}
        </div>
        <div className="list-column">
          <Typography>{address}</Typography>
        </div>
      </ExpansionPanelSummary>
      <CommentsContainer restaurant={id}/>
    </ExpansionPanel>
  )
}

export default RestaurantsListRow
