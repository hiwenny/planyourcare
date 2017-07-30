import * as actionTypes from './constants'

export function updateSuburb(suburb) {
  return {
    type: actionTypes.UPDATE_SUBURB,
    suburb: suburb
  }
}

export function updateCapacity(capacity) {
  return {
    type: actionTypes.UPDATE_CAPACITY,
    capacity: capacity
  }
}

export function updateBudget(budget) {
  return {
    type: actionTypes.UPDATE_BUDGET,
    budget: budget
  }
}

export function updateYear(year) {
  return {
    type: actionTypes.UPDATE_YEAR,
    year: year
  }
}