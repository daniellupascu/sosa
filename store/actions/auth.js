export const SIGNUP = "SIGNUP";
export const LOGIN = "LOGIN";

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

      dispatch({ type: SIGNUP, email, password });
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

      dispatch({ type: LOGIN, email, password });
    } catch (err) {
      throw err;
    }
  };
};
