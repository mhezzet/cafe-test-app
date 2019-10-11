import React from 'react'
import history from '../history'
const Header = () => (
  <nav className='navbar navbar-light shadow-sm bg-white'>
    <a
      style={{ cursor: 'pointer' }}
      onClick={() => history.push('/')}
      className='navbar-brand'
    >
      Cafe React
    </a>
  </nav>
)

export default Header
