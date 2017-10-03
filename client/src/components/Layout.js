import React, { Component } from 'react'
import {Link} from 'react-router-dom'

class Layout extends Component {
  render() {
    return (
      <div>
        <header>
          <div className="mainNav">
            <h1 className="logo">Grumble :-|</h1>
            <nav>
              <ul>
                <li><Link to="/">Home Page</Link></li>
                <li><Link to="/registration">Register</Link></li>
                <li><Link to="/grumb">Post a Grumb</Link></li>
                <li><Link to="/login">Login/Logout</Link></li>
              </ul>
            </nav>
          </div>
          <div className="haroldBox">
            <h3 className="harold">Harold says, "Why is it called, 'Taking a Crap'? It's not like you are taking it with you anywhere."</h3>
          </div>
        </header>
        {this.props.children}
        <footer>
          &copy; 2017 Grumbliees International
        </footer>
      </div>
    )
  }
}

export default Layout