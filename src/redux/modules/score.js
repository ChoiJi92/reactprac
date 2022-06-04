// score.js
import { db } from "../../firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  QuerySnapshot,
  
} from "firebase/firestore";
import { async } from "@firebase/util";

// Actions
const LOAD = "score/LOAD";
const CREATE = "score/CREATE";
const UPDATE = "score/UPDATE";
const DELETE = "score/DELETE";
const RESET = "score/RESET";

const initialState = {
  score: [],
};

// Action Creators
export function loadScore(score) {
  return { type: LOAD, score };
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
export function resetScore(score) {
  return { type: RESET, score };
}
// middlewares
export const loadScoreFB = () => {
  return async function (dispatch) {
    // const score_data = await query(collection(db,'score'))
    // const score_snapshot = onSnapshot(score_data,(QuerySnapshot) => {
    //   let score_list = [];
    //   QuerySnapshot.forEach((doc)=>{
    //     score_list.push({id: doc.id, ...doc.data()})
    //   })
    //   dispatch(loadScore(score_list));
    // })
    const score_data = await getDocs(collection(db, "score"));
    let score_list = [];
    score_data.forEach((doc) => {
      score_list.push({ id: doc.id, ...doc.data() });
    });
    dispatch(loadScore(score_list));
  };
};
export const updateScoreFB = (week, number) => {
  return async function (dispatch, getState) {
    const score_list = getState().score.score; // getState() 현재 store에 있는 상태를 출력
    const id = score_list.filter((v) => v.week === week)[0].id;
    const docRef = doc(db, "score", id);
    await updateDoc(docRef, { rate: number });
    const score_week = score_list
      .map((v) => (v.week === week ? { ...v, rate: number } : v))
      .filter((v) => v.week === week);
    dispatch(updateScore(score_week));
  };
};
export const resetScoreFB = (number) => {
  return async function (dispatch, getState) {
    const score_list = getState().score.score;
    for(let i =0; i<score_list.length; i++){
      const docRef = doc(db, "score", String(i));
      await updateDoc(docRef, { rate: number });
    }
    const score_reset = score_list.map((v) => {
      return { ...v, rate: number };
    });
    dispatch(resetScore(score_reset));
  };
};
// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "score/LOAD": {
      const day = new Date().getDay();
      const realweek = action.score.map(
        (v, i) => (v = action.score[(day + i) % 7])
      );
      return { score: realweek };
    }
    case "score/UPDATE": {
      const update_score_list = state.score.map((v, i) =>
        v.week === action.score[0].week
          ? { ...v, rate: action.score[0].rate }
          : v
      );
      return { ...state, score: update_score_list };
    }
    case "score/RESET": {
      return { ...state, score: action.score };
    }
    // do reducer stuff
    default:
      return state;
  }
}

// side effects, only as applicable
// e.g. thunks, epics, etc
// export function getWidget () {
//   return dispatch => get('/widget').then(widget => dispatch(updateWidget(widget)))
// }
