import React from 'react'
import history from '../history'
const Header = () => (
  <nav className='navbar navbar-light shadow-sm bg-white'>
    <span
      style={{
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: 15,
        color: '#43425d',
        letterSpacing: '0.2em'
      }}
      onClick={() => history.push('/')}
      className='navbar-brand'
    >
      CAFE REACT
    </span>
  </nav>
)

export default Header
