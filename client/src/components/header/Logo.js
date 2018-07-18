import React from 'react'
import Typography from '@material-ui/core/Typography';

const Logo = props => {

  const toRestaurantsPage = () => {
    props.toRestaurantsPage()
    return false
  } 
  return (
    <div className="logo">
      <Typography 
        onClick={toRestaurantsPage} 
        style={{
          width: '130px',
          padding: '20px',
          cursor: 'pointer'
        }} 
        variant="title" 
        color="inherit"
      >
        RESTaurants
      </Typography>
    </div>
  )
}

export default Logo
