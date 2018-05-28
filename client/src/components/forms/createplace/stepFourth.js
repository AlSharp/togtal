import React, { Component } from "react";
import { FieldArray, Field, reduxForm } from 'redux-form';
import { Table, FormGroup, FormControl } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

import validate from './validate';

const units = [
  'lb', 'gram', 'kg', 'litre', 'gallon'
]

const DateInputField = ({ input: { value, onChange }, meta: { touched, error }, defaultValue }) => (
  <div>
    <DatePicker
      dateForm='YYYY-MM-DD'
      selected={value ? moment(value) : moment()}
      onChange={value => onChange(moment(value).format('YYYY-MM-DD'))
      }
      className="form-control input-sm"
    />
  </div>
)

const InputField = ({ type, placeholder, input: { value, onChange }, meta: { touched, error } }) => 
  <div>
    <FormGroup bsSize="small" validationState={touched && error ? error : null}>
      {
        type !== 'select' ?
        <FormControl
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={value => onChange(value)}
        /> :
        <FormControl
          componentClass="select"
          value={value}
          onChange={(value) => onChange(value)}
        >
          <option value></option>
          {
            units.map((unit, index) => (
              <option key={index} value={unit}>{unit}</option>
            ))
          }
        </FormControl>
      }
    </FormGroup>
  </div>

const ProductRow = ({ fields, meta: { error, submitFailed } }) => 
  <Table className="table-add-prices">
    <thead>
      <tr>
        <th style={{width: '4%'}}>#</th>
        <th style={{width: '30%'}}>Product title</th>
        <th style={{width: '15%'}}>Amount</th>
        <th style={{width: '15%'}}>Units</th>
        <th style={{width: '15%'}}>Price</th>
        <th style={{width: '17%'}}>Date</th>
        <th style={{width: '4%'}}></th>
      </tr>
    </thead>
    <tbody>
      {
        fields.map((product, index) => (
          <tr key={index}>
            <td>
              {index + 1}
            </td>
            <td>
              <Field
                name={`${product}.title`}
                type="text"
                component={InputField}
                placeholder="Examples: Bread, Whole Milk"
              />
            </td>
            <td>
              <Field
                name={`${product}.amount`}
                type="text"
                component={InputField}
                placeholder="1000"
              />
            </td>
            <td>
              <Field
                name={`${product}.units`}
                type="select"
                component={InputField}
              />
            </td>
            <td>
              <Field
                name={`${product}.price_histories.price`}
                type="text"
                component={InputField}
                placeholder="100.00"
              />
            </td>
            <td>
              <Field
                name={`${product}.price_histories.date`}
                component={DateInputField}
              />
            </td>
            <td>
              <button type="button" className="btn btn-link btn-sm" onClick={() => fields.remove(index)}>
                <i className="material-icons">delete</i>
              </button>
            </td>
          </tr>
        ))
      }
      <tr>
        <td colSpan="7">
          <button type="button" className="btn btn-primary btn-block" onClick={() => fields.push({})}>
            Add product
          </button>
          <div className="fv-error-addnewplace">
              <span>{submitFailed && error && error}</span>
          </div>
        </td>
      </tr>
    </tbody>
  </Table>

class StepFourth extends Component {
  render() {
    const { number, title, handleSubmit, prevStep } = this.props;
    return(
      <div className="step">
        <div className="step-header">
          <div className="step-header-number">
            { number <= 4 ? 4 : <i className="material-icons md-18">done</i> }
          </div>
          <span className="step-header-title">
            {title}
          </span>
        </div>
        <div className="step-body">
          { number === 4 ?
            <div className="step-body-content">
              <form onSubmit={handleSubmit}>
                <FieldArray
                  name="products"
                  component={ProductRow}
                />
                <div className="step-body-btn-nav">
                  <button type="button" className="btn btn-danger" onClick={ prevStep }>
                    Back
                  </button>
                  <button type="button" className="btn btn-warning" onClick={ prevStep }>
                    Skip this step
                  </button>
                  <button type="submit" className="btn btn-success">
                    Next
                  </button>
                </div>
              </form>
            </div> :
            null
          }
          <div className="step-body-footer">
          </div>
        </div>
      </div>     
    )
  }
}

export default reduxForm({
  form: 'addNewPlaceForm',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate
})(StepFourth);