import * as types from '../actions/constants'
import { regionScaleBy } from '../data/sa3_data';

const initState = {
  suburb: 'Sydney Inner City',
  scaleBy: regionScaleBy.POP_CHILD,
  capacity: 1000,
  budget: 600,
  year: 2016,
  days: 5,
  quality: 0
}

const app = (state = initState, action) => {
  switch (action.type) {
    case types.UPDATE_SUBURB: {
      return {
        ...state, suburb: action.suburb
      }
    }
    case types.UPDATE_SCALE_BY: {
      return {
        ...state, scaleBy: action.scaleBy
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
    case types.UPDATE_DAYS: {
      return {
        ...state, days: action.days
      }
    }
    case types.UPDATE_QUALITY: {
      return {
        ...state, quality: action.quality
      }
    }
    default:
      return state
  }
}

export default app
