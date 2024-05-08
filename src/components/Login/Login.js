import React, { useState, useEffect, useReducer, useContext } from "react";
import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../context/Authcontext";
import Input from "../UI/input/Input";

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

  const authctx = useContext(AuthContext);

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
    authctx.onLogin(
      emailState.value,
      passwordState.value,
      enteredCollege.value
    );
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          id="email"
          label="E-mail"
          type="email"
          isValid={emailState.isValid}
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        ></Input>
        <Input
          id="password"
          label="password"
          type="password"
          isValid={passwordState.isValid}
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        ></Input>

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
