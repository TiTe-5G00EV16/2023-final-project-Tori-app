import React, { useRef, useState, useContext } from "react";
import { useMutation } from "react-query";
import Joi from "joi";

import Card from "../../shared/components/card/Card";
import Input from "../../shared/components/input/Input";

import { signUpUser, loginUser } from "../api/users";

import './Authenticate.css';
import { AuthContext } from '../../shared/context/auth-context';

const Authenticate = props => {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const [isLoginMode, setLoginMode] = useState(true);
  const [inputError, setInputError] = useState("");

  const schema = Joi.object().keys({
    name: Joi.string().min(3).max(20).required(),
    email: Joi.string().min(4).email({ tlds: { allow: false } }).required(),
    password: Joi.string().min(8).required()
  })

  const validateData = (user) => {
    const result = schema.validate(user);

    console.log(result);
    if(result.error){
      switch ( result.error.details[0].path[0]) {
        case "name":
          nameRef.current.style.backgroundColor = "salmon";
          setInputError("Invalid name");
          return false;
        case "email":
          emailRef.current.style.backgroundColor = "salmon";
          setInputError("Invalid email");
          return false;
        case "password":
          emailRef.current.style.backgroundColor = "salmon";
          setInputError("Password must be atleast 8 characters long");
          return false;
      }
    }
    return true;
  }

  const switchModeHanlder = () => {
    setLoginMode(prevMode => !prevMode);
  }

  const auth = useContext(AuthContext);

   const signUpUserMutation = useMutation({
    mutationFn: signUpUser,
    onSuccess: (data) => {
      // Will execute only once, for the last mutation,
      // regardless which mutation resolves first
      console.log(data);
      auth.login(data.id, data.token);
    },
    onError: (error) => {
      console.log(error);
    }
  });

  const loginUserMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      // Will execute only once, for the last mutation,
      // regardless which mutation resolves first
      console.log(data);
      auth.login(data.id, data.token);
    },
    onError: (error) => {
      // An error happened!
      console.log(error);
    }
  });

  const onSubmitHandler = event => {
    event.preventDefault();
    if(!isLoginMode){
      if(!validateData({
        name: nameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value
        })
      ){
        return;
      }
    }

    if (isLoginMode) {
      loginUserMutation.mutate({
        email: emailRef.current.value,
        password: passwordRef.current.value
      })
    } else {
      signUpUserMutation.mutate({
        name: nameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value
      })
    }
  }

  return(
    <Card className="authentication">
      <h2>{isLoginMode? 'Login': 'Sign Up'}</h2>
      <form onSubmit={onSubmitHandler}>
        {!isLoginMode &&
          <Input id="name" ref={nameRef} type="text" label="Name"/>
        }
        <Input id="email" ref={emailRef} type="text" label="Email" />
        <Input id="password" ref={passwordRef} type="password" label="Password" />
        <p style={{color: 'red'}} data-cy="errorMsg">{inputError}</p>
        <button type="submit" >
          {isLoginMode? 'LOGIN' : 'SIGNUP'}
        </button>
      </form>
      <button onClick={switchModeHanlder}>
        {isLoginMode? 'SignUp' : 'Login'} instead?
      </button>
    </Card>
  )
};

export default Authenticate;