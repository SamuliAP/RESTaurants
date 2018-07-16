import React from 'react'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';

const RestaurantsListRow = props => {

  const { title } = props
  return (
    <ExpansionPanel>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography >{title}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        asd
      </ExpansionPanelDetails>
    </ExpansionPanel>
  )
}

export default RestaurantsListRow
