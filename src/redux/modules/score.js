// widgets.js

// Actions
const LOAD   = 'score/LOAD';
const CREATE = 'score/CREATE';
const UPDATE = 'score/UPDATE';
const DELETE = 'score/DELETE';

const initialState = {
    list: [],
  };

// Action Creators
export function loadScore() {
  return { type: LOAD };
}

export function createScore(score) {
  return { type: CREATE, score };
}

export function updateScore(score) {
  return { type: UPDATE, score };
}

export function deleteScore(score) {
  return { type: DELETE, score };
}

// Reducer
export default function reducer(state = {}, action = {}) {
    switch (action.type) {
      // do reducer stuff
      default: return state;
    }
  }

// side effects, only as applicable
// e.g. thunks, epics, etc
// export function getWidget () {
//   return dispatch => get('/widget').then(widget => dispatch(updateWidget(widget)))
// }
