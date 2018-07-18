import React from 'react'
import { Avatar, ListItemText, List, ListItem } from '@material-ui/core'
import { AccountBox, AccountCircle, SupervisorAccount } from '@material-ui/icons'

const UsersList = props => {

  const { users, updateUser } = props
  return (
    <List component="nav" className="col-4 users-list">
      {users.map(user => 
        <ListItem key={user._id} button onClick={() => updateUser(user)}>
          <Avatar>
            {user.role === 'admin' && 
              <SupervisorAccount />
            }
            {user.role === 'manager' && 
              <AccountCircle />
            }
            {user.role === 'basic' && 
              <AccountBox />
            }
          </Avatar>
          <ListItemText
            primary={user.email} 
            secondary={user.role} 
          />
        </ListItem>
      )}
    </List>
  )
}

export default UsersList
