import * as types from '../actions/constants'
import { regionScaleBy } from '../data/sa3_data';

const initState = {
  suburb: 'Sydney',
  scaleBy: regionScaleBy.POP_CHILD,
  year: 2016,
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
