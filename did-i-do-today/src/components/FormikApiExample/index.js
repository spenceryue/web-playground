import React, { Component } from 'react';
import { Formik } from 'formik';
import { withFirebase } from '../Firebase';

class BasicExample extends Component {
  render() {
    const date = new Date();
    date.setDate(date.getDate() - 17);
    console.log(date);

    this.props.firebase.doGetAnswers('gtang.gt', date, console.log);

    return (
  <div>
    <h1>My Form</h1>
    <Formik
      initialValues={{ name: 'george' }}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }, 1000);
      }}

      render={props => (
        <form onSubmit={props.handleSubmit}>
          <input
            type='text'
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            value={props.values.name}
            name='name'
          />
          {props.errors.name && <div id='feedback'>{props.errors.name}</div>}
          <button type='submit'>Submit</button>
        </form>
      )}
    />
  </div>
    );
  }
}

export default withFirebase(BasicExample);
