import React, { useState, useEffect, useReducer } from "react";
import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const emailReducer = (state, action) => {
  if (action.type === "userInput") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "inputBlur") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === "userInput") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === "inputBlur") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: "", isValid: false };
};

const collegeReducer = (state, action) => {
  if (action.type === "userInput") {
    return { value: action.val, isValid: action.val.trim().length > 2 };
  }
  if (action.type === "inputBlur") {
    return { value: state.value, isValid: state.value.trim().length > 2 };
  }
  return { value: "", isValid: false };
};

const Login = (props) => {
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  const [enteredCollege, dispatchCollege] = useReducer(collegeReducer, {
    value: "",
    isValid: null,
  });

  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("checking form validity");
      setFormIsValid(
        emailState.isValid !== null &&
          passwordState.isValid &&
          enteredCollege.isValid
      );
    }, 500);
    return () => {
      console.log("cleanUp");
      clearTimeout(identifier);
    };
  }, [emailState.isValid, passwordState.isValid, enteredCollege.isValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "userInput", val: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "userInput", val: event.target.value });
  };

  const collegeChangeHandler = (event) => {
    dispatchCollege({ type: "userInput", val: event.target.value });
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "inputBlur" });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "inputBlur" });
  };

  const validateCollegeHandler = () => {
    dispatchCollege({ type: "inputBlur" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value, enteredCollege.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false && emailState.isValid !== null
              ? classes.invalid
              : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false && passwordState.isValid !== null
              ? classes.invalid
              : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>

        <div
          className={`${classes.control} ${
            enteredCollege.isValid === false && enteredCollege.isValid !== null
              ? classes.invalid
              : ""
          }`}
        >
          <label htmlFor="college">College</label>
          <input
            type="text"
            id="college"
            value={enteredCollege.value}
            onChange={collegeChangeHandler}
            onBlur={validateCollegeHandler}
          />
        </div>

        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
