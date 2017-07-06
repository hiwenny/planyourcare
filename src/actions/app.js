import * as actionTypes from './constants'

export function sampleAction(payload) {
  return {
    type: actionTypes.SAMPLE_ACTION,
    samplePayload: payload
  }
}
