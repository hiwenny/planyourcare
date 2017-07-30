import * as types from '../actions/constants'

const initState = {
  suburb: 'Sydney',
}

const app = (state = initState, action) => {
  switch (action.type) {
    case types.UPDATE_SUBURB: {
      return {
        ...state, suburb: action.suburb
      }
    }
    default:
      return state
  }
}

export default app
