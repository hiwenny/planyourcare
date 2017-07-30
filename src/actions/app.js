import * as actionTypes from './constants'

export function updateSuburb(suburb) {
  return {
    type: actionTypes.UPDATE_SUBURB,
    suburb: suburb
  }
}

export function updateScaleBy(scaleBy) {
  return {
    type: actionTypes.UPDATE_SCALE_BY,
    scaleBy,
  }
}

export function updateYear(year) {
  console.log('UPDATING YEAR', year);
  return {
    type: actionTypes.UPDATE_YEAR,
    year,
  }
}
