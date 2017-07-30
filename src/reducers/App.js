import * as types from '../actions/constants'

const initState = {
  suburb: 'Sydney',
  capacity: 0,
  budget: 0,
  year: 2016
}

const app = (state = initState, action) => {
  switch (action.type) {
    case types.UPDATE_SUBURB: {
      return {
        ...state, suburb: action.suburb
      }
    }
    case types.UPDATE_CAPACITY: {
      return {
        ...state, capacity: action.capacity
      }
    }
    case types.UPDATE_BUDGET: {
      return {
        ...state, budget: action.budget
      }
    }    
    case types.UPDATE_YEAR: {
      return {
        ...state, year: action.year
      }
    }    
    default:
      return state
  }
}

export default app
