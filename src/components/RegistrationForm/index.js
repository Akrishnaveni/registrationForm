import {Component} from 'react'

import './index.css'

class RegistrationForm extends Component {
  state = {
    firstNameInput: '',
    lastNameInput: '',
    showFirstNameError: false,
    showLastNameError: false,
    isFormSubmitted: false,
  }

  submitAnotherResponse = () => {
    this.setState(prevState => ({
      firstNameInput: '',
      lastNameInput: '',
      showFirstNameError: false,
      showLastNameError: false,
      isFormSubmitted: !prevState.isFormSubmitted,
    }))
  }

  onChangeFirstName = event => {
    this.setState({firstNameInput: event.target.value})
  }

  onChangeLastName = event => {
    this.setState({lastNameInput: event.target.value})
  }

  validateFirstName = () => {
    const {firstNameInput} = this.state

    return firstNameInput !== ''
  }

  onBlurFirstName = () => {
    const isValidFirstName = this.validateFirstName()
    this.setState({showFirstNameError: !isValidFirstName})
  }

  validateLastName = () => {
    const {lastNameInput} = this.state

    return lastNameInput !== ''
  }

  onBlurLastName = () => {
    const isValidLastName = this.validateLastName()
    this.setState({showLastNameError: !isValidLastName})
  }

  renderFirstNameField = () => {
    const {showFirstNameError} = this.state
    const inputClassName = showFirstNameError
      ? 'name-input-field error-field'
      : 'name-input-field'
    return (
      <div className="form-container">
        <label htmlFor="firstname" className="input-label">
          FIRST NAME
        </label>
        <input
          id="firstname"
          type="text"
          placeholder="First name"
          className={inputClassName}
          onChange={this.onChangeFirstName}
          onBlur={this.onBlurFirstName}
        />
      </div>
    )
  }

  renderLastNameField = () => {
    const {showLastNameError} = this.state
    const inputClassName = showLastNameError
      ? 'name-input-field error-field'
      : 'name-input-field'
    return (
      <div className="form-container">
        <label htmlFor="lastname" className="input-label">
          LAST NAME
        </label>
        <input
          id="lastname"
          type="text"
          placeholder="Last name"
          className={inputClassName}
          onChange={this.onChangeLastName}
          onBlur={this.onBlurLastName}
        />
      </div>
    )
  }

  submitForm = event => {
    event.preventDefault()

    const isValidFirstName = this.validateFirstName()
    const isValidLastName = this.validateLastName()

    if (isValidFirstName && isValidLastName) {
      this.setState({isFormSubmitted: true})
    } else {
      this.setState({
        showFirstNameError: !isValidFirstName,
        showLastNameError: !isValidLastName,
        isFormSubmitted: false,
      })
    }
  }

  renderRegistrationForm = () => {
    const {showFirstNameError, showLastNameError} = this.state
    return (
      <>
        <form className="form-input-container" onSubmit={this.submitForm}>
          {this.renderFirstNameField()}
          {showFirstNameError && <p className="error-message">Required</p>}
          {this.renderLastNameField()}
          {showLastNameError && <p className="error-message">Required</p>}
          <button className="submit-button" type="button">
            Submit
          </button>
        </form>
      </>
    )
  }

  renderSubmissionSuccessView = () => {
    const {isFormSubmitted} = this.state
    return (
      <>
        <div className="success-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/success-icon-img.png"
            alt="success"
            className="success-img"
          />
          <p className="success-desription">Submitted Successfully</p>
          <button
            type="button"
            className="submit-button"
            onClick={this.submitAnotherResponse}
          >
            Submit Another Response
          </button>
        </div>
      </>
    )
  }

  render() {
    const {isFormSubmitted} = this.state

    return (
      <div className="registration-form-container">
        <h1 className="form-title">Registration</h1>
        <div className="view-container">
          {isFormSubmitted
            ? this.renderSubmissionSuccessView()
            : this.renderRegistrationForm()}
        </div>
      </div>
    )
  }
}

export default RegistrationForm
