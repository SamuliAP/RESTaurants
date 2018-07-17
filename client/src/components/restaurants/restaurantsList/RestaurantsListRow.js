import React from 'react'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';

import CommentsContainer from '../comments/CommentsContainer'
import DeleteRestaurantButton from './DeleteRestaurantButton'
import EditRestaurantButton from './EditRestaurantButton'
import Errors from '../../common/Errors'
import { TextField, Button, ExpansionPanelActions, ExpansionPanelDetails } from '@material-ui/core';

class RestaurantsListRow extends React.Component {

  state = {
    expanded: false,
    newName: this.props.name,
    newAddress: this.props.address,
    editName: false,
    editAddress: false
  }

  deleteRestaurant = () => this.props.deleteRestaurant(this.props.id)
  saveEditName = () => {
    this.props.saveEditName({
      name: this.state.newName
    }, this.props.id )
    this.handleExpand()
  }
  saveEditAddress = () => {
    this.props.saveEditAddress({
      address: this.state.newAddress
    }, this.props.id )
    this.handleExpand()
  }

  initEditName = () => this.setState({ editName:true })
  initEditAddress = () => this.setState({ editAddress:true })

  handleExpand = () => {
    this.setState(state => ({
      expanded: !state.expanded
    }), () => setTimeout( () => this.setState(state => {
      if(!state.expanded) {
        return {
          editName: false,
          editAddress: false
        }
      } else return state
    }), 400))
  }

  handleInputChange = e => this.setState({ [e.target.name]: e.target.value })

  showActionButton = () => {
    if(this.props.user.role === 'admin' || this.props.owner === this.props.user._id) {
      return true
    }
    return false
  }

  render() {
    const { id, name, address } = this.props
    const { 
      editName, 
      editAddress, 
      newName,
      newAddress,
      expanded
    } = this.state

    return (
      <ExpansionPanel expanded={expanded} onChange={this.handleExpand}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <div className="list-column">
            {name}
          </div>
          <div className="list-edit-column">
            {this.showActionButton() && !editName && !editAddress &&
              <EditRestaurantButton handleClick={this.initEditName} />
            }
          </div>

          <div className="list-column">
            <Typography>{address}</Typography>
          </div>
          <div className="list-edit-column">
            {this.showActionButton() && !editName && !editAddress &&
              <EditRestaurantButton handleClick={this.initEditAddress} />
            }
          </div>
          
          {this.showActionButton() && 
            <div className="list-action-column">
              <DeleteRestaurantButton handleClick={this.deleteRestaurant} />
            </div>
          }
        </ExpansionPanelSummary>

        { !editName && !editAddress &&
          <CommentsContainer restaurant={id}/>
        }

        { editName && 
          <div>
            <ExpansionPanelDetails>
              <TextField
                className="list-column"
                label="New Name"
                name="newName"
                fullWidth
                value={newName}
                onChange={this.handleInputChange}
                margin="normal"
              />
            </ExpansionPanelDetails>
            <ExpansionPanelActions>
              <Button size="small" onClick={this.handleExpand}>Cancel</Button>
              <Button size="small" color="primary" onClick={this.saveEditName}>
                Save
              </Button>
            </ExpansionPanelActions>
          </div>
        }

        { editAddress && 
          <div>
            <ExpansionPanelDetails>
              <div className="list-header-column"> </div>
              <TextField
                className="list-header-column"
                style={{marginRight:'30px'}}
                label="New Address"
                name="newAddress"
                fullWidth
                value={newAddress}
                onChange={this.handleInputChange}
                margin="normal"
              />
              <div className="list-header-action-column"> </div>
            </ExpansionPanelDetails>
            <ExpansionPanelActions>
              <Button size="small" onClick={this.handleExpand}>Cancel</Button>
              <Button size="small" color="primary" onClick={this.saveEditAddress}>
                Save
              </Button>
            </ExpansionPanelActions>
          </div>
        }
      </ExpansionPanel>
    )
  }
}

export default RestaurantsListRow
