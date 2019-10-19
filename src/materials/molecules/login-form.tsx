import React from 'react'
import Modal from 'react-modal'
import cn from 'classnames'
import { loginUser } from '../../helpers/api'
import User from '../../models/interfaces/user'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
}

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root')

interface LoginFormProps {
  isOpen: boolean
  onClose: () => void
  onLoginSuccess: (user: User) => void
}

interface LoginFormState {
  error: boolean
}

export default class LoginForm extends React.Component<
  LoginFormProps,
  LoginFormState
> {
  private subtitle: HTMLHeadingElement | null

  private username: HTMLInputElement | null

  private password: HTMLInputElement | null

  constructor(props: LoginFormProps) {
    super(props)

    this.state = { error: false }

    this.subtitle = null
    this.username = null
    this.password = null
  }

  afterOpenModal = () => {
    if (this.subtitle !== null) {
      // references are now sync'd and can be accessed.
      this.subtitle.style.color = '#f00'
    }
    this.setState({ error: false })
  }

  handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    const { onLoginSuccess, onClose } = this.props
    e.preventDefault()
    if (this.username !== null && this.password !== null) {
      try {
        const user = await loginUser(this.username.value, this.password.value)
        onLoginSuccess(user)
        onClose()
      } catch (err) {
        this.setState({ error: true })
      }
    }
  }

  handleFocusInput = (e: React.FocusEvent<HTMLInputElement>) => {
    const label = document.querySelector(`[for=${e.target.id}]`)
    if (label && !label.classList.contains('active')) {
      label.classList.add('active')
    }
  }

  handleBlurInput = (e: React.FocusEvent<HTMLInputElement>) => {
    const label = document.querySelector(`[for=${e.target.id}]`)
    if (label && !e.target.value) {
      label.classList.remove('active')
    }
  }

  render() {
    const { isOpen, onClose } = this.props
    const { error } = this.state
    return (
      <Modal
        isOpen={isOpen}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={onClose}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div>
          <h5 className="login-form__heading mx-auto mb-2 text-center">
            Sign in
          </h5>
          <div className="login-form__formContainer d-flex flex-column px-3 py-4">
            <form
              className="login-form__form d-flex flex-column mx-auto mb-2"
              onSubmit={this.handleSubmitForm}
            >
              {error && (
                <span>
                  Login failed !!
                  <br />
                  Username or password is wrong !!
                  <br />
                </span>
              )}
              <span className="login-form__formHeader my-3 text-center">
                Sign in with your username
              </span>
              <div className="form-group">
                <div className={cn('form-group', 'mb-4')}>
                  <label htmlFor="registerInputUsername">
                    Username
                    <input
                      type="username"
                      className="form-control floatLabel"
                      id="registerInputUsername"
                      required
                      onFocus={this.handleFocusInput}
                      onBlur={this.handleBlurInput}
                      autoComplete="username"
                      ref={el => {
                        this.username = el
                      }}
                    />
                  </label>
                </div>
                <div className={cn('form-group')}>
                  <label htmlFor="registerInputPassword">
                    Password
                    <input
                      type="password"
                      className="form-control floatLabel mt-2"
                      id="registerInputPassword"
                      required
                      onFocus={this.handleFocusInput}
                      onBlur={this.handleBlurInput}
                      autoComplete="current-password"
                      ref={el => {
                        this.password = el
                      }}
                    />
                  </label>
                </div>
              </div>
              <button type="submit" className="btn login-form__signIn">
                Sign in
              </button>
            </form>
          </div>
        </div>
      </Modal>
    )
  }
}
