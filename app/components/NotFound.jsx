import React from 'react'
import { Link } from 'react-router'

const NotFound = props => {
  const {pathname} = props.location || {pathname: '<< no path >>'}
  console.error('NotFound: %s not found (%o)', pathname, props)
  return (
      <Link to="/"><img src="http://i.imgur.com/DCDflSs.jpg" /></Link>
  )
}

export default NotFound
