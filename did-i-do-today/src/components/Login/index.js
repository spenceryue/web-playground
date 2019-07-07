import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Logo } from '../Logo';
import { compose } from 'recompose';
import './form.css';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import { withFirebase } from '../Firebase';
import * as yup from 'yup';

import * as ROUTES from '../../constants/routes';

const LoginPage = () => (
  <React.Fragment>
    <div className='logo-container'>
      <Logo />
    </div>
    <div className='loginDiv'>
      <LoginForm />
    </div>
  </React.Fragment>
);

const LoginValidation = yup.object().shape({
  email: yup.string().email().required(),

  password: yup.string().min(8).required(),
});

class LoginFormBase extends Component {
  constructor(props) {
    super(props);
    this.loginSubmit = this.loginSubmit.bind(this);
    this.state = {};
  }

  loginSubmit(values, actions) {
    this.props.firebase
      .doSignInWithEmailAndPassword(values.email, values.password)
      .then(() => {
        let lastDate = new Date(JSON.parse(localStorage.getItem('lastDateSubmitted')));
        let todayDate = new Date();

        if (
          lastDate.getYear() === todayDate.getYear() &&
          lastDate.getDate() === todayDate.getDate() &&
          lastDate.getMonth() === todayDate.getMonth
        ) {
          this.props.history.push(ROUTES.ANSWERS);
        }
        else {
          let prevWeek = new Date(todayDate);
          prevWeek.setDate(prevWeek.getDate() - 6);

          this.props.firebase.doGetAnswers(values.email, prevWeek, answer => {
            localStorage.setItem('answers', JSON.stringify(answer));
            let date = answer[answer.length - 1].timeCreated.toDate();
            if (
              date.getYear() === todayDate.getYear() &&
              date.getDate() === todayDate.getDate() &&
              date.getMonth() === todayDate.getMonth()
            ) {
              this.props.history.push(ROUTES.ANSWERS);
            }
            else {
              this.props.history.push(ROUTES.QUESTIONS);
            }
          });
        }
      })
      .catch(error => {
        this.setState({ error });
      });
  }

  render() {
    const { error } = this.state;

    return (
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={LoginValidation}
        onSubmit={this.loginSubmit}
      >
        <Form>
          <Field className='loginInput' type='text' name='email' placeholder='email' />

          <br />
          <ErrorMessage name='email' />
          <br />

          <Field className='loginInput' type='password' name='password' placeholder='password' />

          <br />
          <ErrorMessage name='password' />
          <br />

          <button className='loginButton' type='submit'>
            Log In
          </button>

          {error && <p id='loginerror'>{error.message}</p>}
        </Form>
      </Formik>
    );
  }
}

const LoginForm = compose(withRouter, withFirebase)(LoginFormBase);

export default LoginPage;
