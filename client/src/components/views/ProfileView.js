import React from 'react'
import Title from '../common/Title'

import ProfileContainer from '../profile/ProfileContainer'
const ProfileView = props => {
  const { user, logout } = props
  return (
    <div>
      <Title title="Profile"/>
      <ProfileContainer authUser={user} logout={logout}/>
    </div>
  )
}

export default ProfileView
