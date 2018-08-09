import React, { Component } from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import FIELDS from './formFields';

class SurveyForm extends Component {
  renderFields() {
    return _.map(FIELDS, field => {
      return (
        <Field
          component={SurveyField}
          key={field.name}
          type="text"
          label={field.label}
          name={field.name}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <form
          onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}
          style={{ marginTop: '100px' }}
        >
          {this.renderFields()}
          <Link to="/surveys" className="red btn-flat white-text">
            CANCEL
          </Link>
          <button className="teal btn-flat right white-text" type="submit">
            NEXT
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  errors.recipients = validateEmails(values.recipients || '');

  _.each(FIELDS, ({ name }) => {
    if (!values[name]) {
      errors[name] = 'You must provide a value';
    }
  });

  return errors;
}

export default reduxForm({
  validate: validate, //这里被赋予validate这个key的function会自动被call，在表格提交的时候。
  form: 'surveyForm',
  destroyOnUnmount: false // 这个是reduxform在表格提交后，是否摧毁用户输入的数据
})(SurveyForm);
