const initialState = {auth: false, type: null};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'LOGINADMINUSER':
      return {auth: true, type: action.payload};

    case 'LOGOUTADMINUSER':
      return {auth: false, type: null};

    default:
      return state;
  }
}
