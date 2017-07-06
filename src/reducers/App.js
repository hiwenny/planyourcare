import * as types from '../actions/constants'

const initState = {
  sampleState: 'click on any buttons to change the displayed value',
}

const app = (state = initState, action) => {
  switch (action.type) {
    case types.SAMPLE_ACTION: {
      return {
        ...state, sampleState: action.samplePayload
      }
    }
    default:
      return state
  }
}

export default app
