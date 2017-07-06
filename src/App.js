import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { StatelessComponentwithProps } from './components'
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
    const { sampleState } = this.props;
    return (
      <div className='container'>
        <div className='display-text'><code>{sampleState}</code></div>
        {
          ['Button 1', 'Button 2'].map((val, i) => <StatelessComponentwithProps key={i} label={val} onClick={this.sampleFunction} />)
        }
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
