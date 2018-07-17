import React from 'react'
import { Typography } from '@material-ui/core';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';

const RestaurantsListHeader = () => {
  return (
    <ExpansionPanel expanded={false}>
      <ExpansionPanelSummary>
        <div className="list-header-column">
          <Typography> Name </Typography>
        </div>
        <div className="list-header-column">
          <Typography> Address </Typography>
        </div>
        <div className="list-header-action-column">
          <Typography> Delete </Typography>
        </div>
      </ExpansionPanelSummary>
    </ExpansionPanel>
  )
}

export default RestaurantsListHeader
