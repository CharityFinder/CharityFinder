import React from 'react'

const LogoPage = ({message, logo}) => {
  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>{message}</p>
    </header>
  )
}

export default LogoPage
