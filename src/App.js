import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Header from './components/Header'
import HereMap from './components/Map'
import Sidebar from './components/Sidebar'
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
      <div className='container'>
        <Header />
        <main className='content'>
          <Sidebar />
          <HereMap />
        </main>
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
