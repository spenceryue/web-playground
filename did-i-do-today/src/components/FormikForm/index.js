import { Formik, FormikProps, Form, Field } from 'formik';

import React, { Component } from 'react';

class FormikForm extends Component {
  handleSubmit = (values, {
    props = this.props,
    setSubmitting
  }) => {
    setSubmitting(false);
    return;
  }

  render() (
    <Formik
      initialValues={{
        first_name: '',
        email: '',
        gender: ''
      }}
      
      validate={ (values) => {
        let errors = [];

        return errors;
      }}
      
      onSubmit={handleSubmit}
      
      render={formProps: FormikProps => {
        return (
          <Form>
            <Field type='text'/>  
            <button
              type='submit'
              disabled={formProps.isSubmitting}>
              Submit Form
            </button>
          </Form>
        );
      }}
    />
  )
};

export default FormikForm;
