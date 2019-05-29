import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Logo from './logo';
import { compose } from 'recompose';
import './form.css';

import { Formik, withFormik, Form, Field, ErrorMessage }  from 'formik';
import { withFirebase } from '../Firebase';
import * as yup from 'yup';

import * as ROUTES from '../../constants/routes';

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
    return ( 
      <Formik
        initialValues={
          {
            email: '',
            password: ''
          }
        }

        onSubmit={(values, actions) => {
            this.props.firebase
              .doSignInWithEmailAndPassword(values.email, values.password)
              .then(() => {
                this.props.history.push(ROUTES.TEST);
              })
              .catch(error => {
                this.setState({ error });
              });
          }
        }
      >
        <Form>
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
      </Formik>
    )
  }
}

const LoginForm = compose(
  withRouter,
  withFirebase,
  /*
      withFormik({
        handleSubmit: ( values, { setSubmitting }) =>
        {
          this.props.firebase.doSignInWithEmailAndPassword(
            values.email,
            values.password
          ).then(() => {
            this.props.history.push(ROUTES.LANDING);
          });
        },
          validationSchema: LoginValidation
      })
      */

)(LoginFormBase);

export default LoginPage;
