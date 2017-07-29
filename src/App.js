import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import HereMap from './components/Map'
import { sampleAction } from './actions/app'
import './scss/index.scss'

class App extends Component {

  sampleFunction = (sampleParam, e) => {
    const { dispatch } = this.props;
    console.log(sampleParam);
    console.log(e)
    return dispatch(sampleAction(sampleParam));
  }

  render() {
    return (
      <div className='container' style={{height: '100vh', width: '100vw'}}>
        <HereMap />
      </div>
    )
  }
}

function mapStateToProps(store) {
  return {
    sampleState: store.app.sampleState,
  }
}

App.defaultProps = {
  sampleState: '',
}

App.propTypes = {
  currentInput: PropTypes.string,
  isLocked: PropTypes.bool,
  PIN: PropTypes.string,
  dispatch: PropTypes.func,
}

export default connect(mapStateToProps)(App)