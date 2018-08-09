import React from 'react';
import { connect } from 'react-redux';
import FIELDS from './formFields';
import _ from 'lodash';
import { withRouter } from 'react-router-dom';

import * as actions from '../../actions';

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
  const reviewFields = _.map(FIELDS, field => {
    return (
      <div key={field.name} style={{ marginTop: '20px' }}>
        <label>{field.label}</label>
        <div>{formValues[field.name]}</div>
      </div>
    );
  });

  return (
    <div style={{ marginTop: '100px' }}>
      <h4>Please confirm your entries.</h4>
      {reviewFields}
      <button
        className="yellow white-text darken-3 btn-flat"
        onClick={onCancel}
        style={{ marginTop: '30px' }}
      >
        BACK
      </button>
      <button
        onClick={() => submitSurvey(formValues, history)}
        className="green white-text  btn-flat right"
        style={{ marginTop: '30px' }}
      >
        SEND<i className="material-icons right">email</i>
      </button>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    formValues: state.form.surveyForm.values
  };
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
