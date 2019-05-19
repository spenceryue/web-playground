import React, { Component } from 'react';
import Logo from './logo';
import './form.css';

import { withFormik, Form, Field, ErrorMessage }  from 'formik';
import * as yup from 'yup';

const LoginPage = () => (
  <div>
    <Logo/>
    <LoginForm/>
  </div>
);

const LoginValidation = yup.object().shape({
  email: yup
    .string()
    .email()
    .required(),
  password: yup
    .string()
    .min(8)
    .required()
});

class LoginFormBase extends Component {
  render() {
    return ( <Form>

      <Field
        type='text'
        name='email'
        placeholder='email' />

      <br/>
      <ErrorMessage name='email'/>
      <br/>

      <Field
        type='password'
        name='password'
        placeholder='password' />

      <br/>
      <ErrorMessage name='password'/>
      <br/>

      <button
        type='submit'>
        Log In
      </button>
    </Form>
    )
  }
}

const LoginForm = withFormik({
  handleSubmit: ( values, { setSubmitting }) =>
  {
    console.log('submitted email: ', values.email);
    console.log('submitted password: ', values.password);
  },
  validationSchema: LoginValidation
})(LoginFormBase);

export default LoginPage;
