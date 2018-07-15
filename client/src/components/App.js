import React, { Component } from 'react'

import Header from './header/Header'
import Footer from './footer/Footer'

class App extends Component {
  render() {
    return (
      <div className="app">
        <Header auth={false} />
        <div className="content">
        </div>
        <Footer />
      </div>
    );
  }
}

export default App