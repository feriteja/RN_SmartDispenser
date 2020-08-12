const initialState = {data: null};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_HISTORY':
      return {data: action.payload};

    default:
      return state;
  }
}
