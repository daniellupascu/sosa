import { LOGIN, SIGNUP, AUTHENTICATE, LOGOUT } from "../actions/auth";

const initialState = {
  token: null,
  userId: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        ...state,
        token: action.token,
        userId: action.userId
      };
    case LOGOUT:
      return {
        ...initialState
      };
    // case LOGIN:
    //   return {
    //     ...state,
    //     token: action.data.idToken,
    //     userId: action.data.localId
    //   };
    // case SIGNUP:
    //   return {
    //     ...state,
    //     token: action.data.idToken,
    //     userId: action.data.localId
    //   };
    default:
      return state;
  }
};
