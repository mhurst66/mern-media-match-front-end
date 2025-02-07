// imports
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router'
import { UserContext } from '../../contexts/UserContext'
import { signUp } from '../../services/authService'
import Logo from '/logos/Logo.png'
import styles from './SignUpForm.module.css'

// components
const SignUpForm = () => {
  // hooks
  const { setUser } = useContext(UserContext)
  const navigate = useNavigate()

  // state variables
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    passwordConfirm: '',
  })
  const [message, setMessage] = useState('')
  const { username, password, passwordConfirm } = formData

  // handler functions
  const handleChange = (evt) => {
    setMessage('')
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault()

    try {
      const newUser = await signUp(formData)
      setUser(newUser)
      navigate('/')
    } catch (err) {
      setMessage(err.message)
    }
  }

  // predicate function
  const isSignUpValid = () => {
    return !(username && password && password.length > 5 && password === passwordConfirm)
  }

  // return
  return (
    <>
      <main className={styles.container}>
        <section>
          <h1>Sign Up</h1>
          <img src={Logo} alt="Media Match Logo" />
        </section>
        <section>
          <form onSubmit={handleSubmit}>
            <p style={{ color: "red" }}>{message}</p>
            <div>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="name"
                name="username"
                placeholder="No Special Characters Allowed"
                value={username}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Must be at least 6 characters"
                value={password}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="confirm">Confirm Password:</label>
              <input
                type="password"
                id="confirm"
                name="passwordConfirm"
                placeholder="Must be at least 6 characters"
                value={passwordConfirm}
                onChange={handleChange}
                required
              />
            </div>
            <button disabled={isSignUpValid()}>Sign Up</button>
          </form>
        </section>
      </main>
    </>
  )
}

// export
export default SignUpForm