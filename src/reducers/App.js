import * as types from '../actions/constants'
import { regionScaleBy } from '../data/sa3_data';

const initState = {
  suburb: 'Sydney',
  scaleBy: regionScaleBy.POP_CHILD,
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
    default:
      return state
  }
}

export default app
