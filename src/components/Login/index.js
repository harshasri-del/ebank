import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'

class Login extends Component {
  state = {userId: '', pin: '', isShowError: false, showError: ''}

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    console.log('errorMsg')
    this.setState({isShowError: true, showError: errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {userId, pin} = this.state
    const userDetails = {userId, pin}
    const url = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangeUserId = event => {
    this.setState({userId: event.target.value})
  }

  onChangePin = event => {
    this.setState({pin: event.target.value})
  }

  renderUserIdField = () => {
    const {userId} = this.state
    return (
      <>
        <label className="input-label" htmlFor="userId">
          User ID
        </label>
        <input
          placeholder="Enter User ID"
          type="text"
          id="userId"
          className="userId-input-field"
          value={userId}
          onChange={this.onChangeUserId}
        />
      </>
    )
  }

  renderPinField = () => {
    const {pin} = this.state
    return (
      <>
        <label className="input-label" htmlFor="pin">
          PIN
        </label>
        <input
          placeholder="Enter PIN"
          type="password"
          id="pin"
          className="userId-input-field"
          value={pin}
          onChange={this.onChangePin}
        />
      </>
    )
  }

  render() {
    const {isShowError, showError} = this.state
    return (
      <div className="login-container">
        <div className="login-card">
          <div className="left-part">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png "
              alt="website login"
              className="website-login"
            />
          </div>
          <div className="right-part">
            <div className="right-card">
              <h1 className="login-heading">Welcome Back!</h1>
              <form className="form-container" onSubmit={this.onSubmitForm}>
                <div className="input-container">
                  {this.renderUserIdField()}
                </div>

                <div className="input-container">{this.renderPinField()}</div>

                <button type="submit" className="login-button">
                  Login
                </button>
                {isShowError && <p className="error-class">{showError}</p>}
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
