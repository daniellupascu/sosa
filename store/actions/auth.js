import { AsyncStorage } from "react-native";

export const SIGNUP = "SIGNUP";
export const LOGIN = "LOGIN";
export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";

export const authenticate = (userId, token) => {
  return { type: AUTHENTICATE, userId, token };
};

export const logout = () => {
  return { type: LOGOUT };
};

export const signup = (email, password) => {
  return async dispatch => {
    try {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCMogAYBpZcwk6MIpLQ5NGdNZEQWSS5F-g",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true
          })
        }
      );

      if (!res.ok) {
        const errorResData = await res.json();
        const errorCause = errorResData.error.message;
        let errorMessage;

        if (errorCause === "EMAIL_EXISTS") {
          errorMessage = "Email already exists";
        } else if (errorCause === "OPERATION_NOT_ALLOWED") {
          errorMessage = "Operation not allowed";
        } else if (errorCause === "TOO_MANY_ATTEMPTS_TRY_LATER") {
          errorMessage = "Try later";
        }
        throw new Error(errorMessage);
      }

      const resData = await res.json();

      // dispatch({ type: SIGNUP, data: resData });
      dispatch(authenticate(resData.localId, resData.idToken));

      const expirationDate = new Date(
        new Date().getTime() + +resData.expiresIn * 1000
      );
      saveDataToStorage(
        resData.idToken,
        resData.localId,
        expirationDate.toISOString()
      );
    } catch (err) {
      throw err;
    }
  };
};

export const login = (email, password) => {
  return async dispatch => {
    try {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCMogAYBpZcwk6MIpLQ5NGdNZEQWSS5F-g",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true
          })
        }
      );

      if (!res.ok) {
        const errorResData = await res.json();
        const errorCause = errorResData.error.message;
        let errorMessage;

        if (errorCause === "EMAIL_NOT_FOUND") {
          errorMessage = "Email not registered";
        } else if (errorCause === "INVALID_PASSWORD") {
          errorMessage = "Invalid password";
        } else if (errorCause === "USER_DISABLED") {
          errorMessage = "User disabled";
        } else if (errorCause === "INVALID_EMAIL") {
          errorMessage = "Invalid Email";
        }
        throw new Error(errorMessage);
      }

      const resData = await res.json();

      // dispatch({ type: LOGIN, data: resData });
      dispatch(authenticate(resData.localId, resData.idToken));

      const expirationDate = new Date(
        new Date().getTime() + +resData.expiresIn * 1000
      );
      saveDataToStorage(
        resData.idToken,
        resData.localId,
        expirationDate.toISOString()
      );
    } catch (err) {
      throw err;
    }
  };
};

const saveDataToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      token,
      userId,
      expirationDate
    })
  );
};
