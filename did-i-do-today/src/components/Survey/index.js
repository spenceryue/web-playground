import React, { Component } from 'react';

import Debug from '../Debug';

import { Formik, Form, Field, ErrorMessage }  from 'formik';

import * as yup from 'yup';

const Survey = () => (
  <div>
    <h1>Survey</h1>
    <Formik>
      {({ values }) => 
          (
            <Form>
            </Form>
          )
      }
    </Formik>
  </div>
)

export default Survey;
