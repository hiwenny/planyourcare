import * as actionTypes from './constants'

export function updateSuburb(suburb) {
  return {
    type: actionTypes.UPDATE_SUBURB,
    suburb: suburb
  }
}
