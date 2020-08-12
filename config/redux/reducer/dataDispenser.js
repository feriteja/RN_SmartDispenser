import dataType from '../action/action';
import {act} from 'react-test-renderer';

const initialState = {data: null};

export default function (state = initialState, action) {
  switch (action.type) {
    case dataType.GETDISPENSER:
      return {data: action.data};

    default:
      return state;
  }
}
