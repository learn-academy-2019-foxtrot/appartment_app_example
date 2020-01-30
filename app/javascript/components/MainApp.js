import React from "react"
import PropTypes from "prop-types"
class MainApp extends React.Component {
  render () {
    const{ signed_in, sign_in_route, sign_out_route } = this.props
    return (
      <React.Fragment>
        <h1>Appartment App</h1>
        {signed_in &&
          <a href={sign_out_route}>Sign Out</a>
        }

        {!signed_in &&
          <a href={sign_in_route}>Sign In</a>
        }
      </React.Fragment>
    );
  }
}

export default MainApp
