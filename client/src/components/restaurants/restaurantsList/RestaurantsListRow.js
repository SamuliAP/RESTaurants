import React from 'react'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';

import CommentsContainer from '../comments/CommentsContainer'
import DeleteRestaurantButton from './DeleteRestaurantButton'
import EditRestaurantButton from './EditRestaurantButton'
import { TextField, Button, ExpansionPanelActions, ExpansionPanelDetails } from '@material-ui/core';
import Errors from '../../common/Errors';

class RestaurantsListRow extends React.Component {

  constructor(props) {
    super(props)
  
    this.state = {
      expanded: false,
      newName: this.props.name,
      newAddress: this.props.address,
      editName: false,
      editAddress: false,
      comments: false,
    }
  }

  componentDidUpdate(prevProps, prevState) {  
    if(this.state.submitted 
      && !this.props.fetching 
      && prevProps.fetching 
      && this.props.nameErrors.length === 0
      && this.props.addressErrors.length === 0
    ) {
      this.setState({ 
        expanded: false, 
        submitted: false,
        editName: false,
        editAddress: false,
        comments: false
      })
    }
  }

  handleCancel = () => this.setState({ 
    expanded: false, 
    submitted: false,
    editName: false,
    editAddress: false,
    comments: false
  })

  deleteRestaurant = () => this.props.deleteRestaurant(this.props.id)
  
  saveEditName = () => {
    this.setState({
      submitted: true
    }, () => this.props.saveEditName({
      name: this.state.newName
    }, this.props.id ))
  }
  saveEditAddress = () => {
    this.setState({
      submitted: true
    }, () => this.props.saveEditAddress({
      address: this.state.newAddress
    }, this.props.id ))
  }

  initEditName = () => this.setState({ editName:true, comments:false })
  initEditAddress = () => this.setState({ editAddress:true, comments:false })

  handleExpand = () => {
    this.setState(state => ({
      expanded    : !state.expanded,
      comments    : !state.expanded && !state.editAddress && !state.editName,
      editName    : !state.expanded ? state.editName : false,
      editAddress : !state.expanded ? state.editAddress : false,
    }))
  }

  handleInputChange = e => this.setState({ [e.target.name]: e.target.value })

  showActionButton = () => {
    if(this.props.user.role === 'admin' || (this.props.owner === this.props.user._id && this.props.user.role === 'manager')) {
      return true
    }
    return false
  }

  render() {
    const { id, name, address, fetchingDelete, nameErrors, addressErrors } = this.props
    const { 
      editName, 
      editAddress, 
      newName,
      newAddress,
      expanded,
      comments
    } = this.state

    return (
      <ExpansionPanel expanded={expanded && !fetchingDelete} onChange={this.handleExpand}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <div className="list-column">
            {name}
          </div>
          <div className="list-edit-column">
            {this.showActionButton() && !editName && !editAddress && !comments &&
              <EditRestaurantButton handleClick={this.initEditName} />
            }
          </div>

          <div className="list-column">
            <Typography>{address}</Typography>
          </div>
          <div className="list-edit-column">
            {this.showActionButton() && !editName && !editAddress && !comments && 
              <EditRestaurantButton handleClick={this.initEditAddress} />
            }
          </div>
          
          <div className="list-action-column">
            {this.showActionButton() && 
              <DeleteRestaurantButton handleClick={this.deleteRestaurant} />
            }
          </div>
        </ExpansionPanelSummary>

        { !editName && !editAddress && comments && 
          <CommentsContainer restaurant={id}/>
        }

        { editName && 
          <div>
            <ExpansionPanelDetails>
              <Typography variant="display1"> Edit name </Typography>
            </ExpansionPanelDetails>
            {nameErrors && nameErrors.length > 0 && 
              <ExpansionPanelDetails>
                <Errors errors={nameErrors} />
              </ExpansionPanelDetails>
            }
            <ExpansionPanelDetails>
              <TextField

                label="New Name"
                name="newName"
                fullWidth
                value={newName}
                onChange={this.handleInputChange}
                margin="normal"
              />
            </ExpansionPanelDetails>
            <ExpansionPanelActions>
              <Button size="small" onClick={this.handleCancel}>Cancel</Button>
              <Button size="small" color="primary" onClick={this.saveEditName}>
                Save
              </Button>
            </ExpansionPanelActions>
          </div>
        }

        { editAddress && 
          <div>
            <ExpansionPanelDetails>
              <Typography variant="display1"> Edit Address </Typography>
            </ExpansionPanelDetails>
            {addressErrors && addressErrors.length > 0 && 
              <ExpansionPanelDetails>
                <Errors errors={addressErrors} />
              </ExpansionPanelDetails>
            }
            <ExpansionPanelDetails>
              <TextField
                label="New Address"
                name="newAddress"
                fullWidth
                value={newAddress}
                onChange={this.handleInputChange}
                margin="normal"
              />
            </ExpansionPanelDetails>
            <ExpansionPanelActions>
              <Button size="small" onClick={this.handleCancel}>Cancel</Button>
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
