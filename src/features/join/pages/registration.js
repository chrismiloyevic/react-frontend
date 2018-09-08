import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { withFormik } from 'formik'

import { Col, Row } from 'styled-components-layout'
import { Card, Input, H2, Button, Link } from 'ui/atoms'
import { PrimitiveFooter } from 'ui/organisms'
import { Container, CenterContentTemplate } from 'ui/templates'

import { userRegister } from '../effects/registration'
import { userLogin } from '../effects/join'


const mapDispatchToProps = (dispatch) => ({
  onRegister: (registerData) => dispatch(userRegister, registerData),
  onLogin: (loginData) => dispatch(userLogin, loginData),
})

const formik = {
  mapPropsToValues: () => ({
    email: '',
    password: '',
    passwordRepeat: '',
  }),
  validate: (values) => {
    const errors = {}

    if (!values.email) {
      errors.email = 'Required'
    }

    if (!values.password) {
      errors.password = 'Required'
    }

    if (values.password !== values.passwordRepeat) {
      errors.passwordRepeat = 'Not equals'
    }

    return errors
  },
  handleSubmit: async (values, { props, setSubmitting }) => {
    const { ok } = await props.onRegister(values)

    if (ok) {
      const isLogged = await props.onLogin(values)

      if (isLogged) {
        props.history.push('/')
      }
      else {
        setSubmitting(false)
      }
    }
    else {
      setSubmitting(false)
    }
  },
}

const enhance = compose(
  connect(null, mapDispatchToProps),
  withFormik(formik),
)

const RegisterForm = enhance(({
  errors,
  handleBlur,
  handleChange,
  handleSubmit,
  isSubmitting,
  touched,
  values,
}) => (
  <form onSubmit={handleSubmit}>
    <Col gap="1rem">
      <H2>Join to HowToCards</H2>
      <Input
        type="email"
        name="email"
        placeholder="Email"
        autoComplete="emails"
        disabled={isSubmitting}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.email}
        failed={touched.email && Boolean(errors.email)}
      />
      <Input
        type="password"
        name="password"
        placeholder="Password"
        autoComplete="password"
        disabled={isSubmitting}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.password}
        failed={touched.password && Boolean(errors.password)}
      />
      <Input
        type="password"
        name="passwordRepeat"
        placeholder="Repeat password"
        autoComplete="password"
        disabled={isSubmitting}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.passwordRepeat}
        failed={touched.passwordRepeat && Boolean(errors.passwordRepeat)}
      />
      <Button.Primary
        type="submit"
        disabled={isSubmitting}
      >
        Create account
      </Button.Primary>
    </Col>
  </form>
))

export const RegistrationPage = ({ history }) => (
  <CenterContentTemplate footer={<PrimitiveFooter />}>
    <Container justify="center" align="center">
      <Col align="center" width="40rem">
        <Card>
          <RegisterForm history={history} />
        </Card>
        <Row padding="3rem 0 0" gap="0.5rem">
          <span>Already have account?</span>
          <Link to="/join">Join</Link>
        </Row>
      </Col>
    </Container>
  </CenterContentTemplate>
)

RegistrationPage.propTypes = {
  history: PropTypes.shape({}).isRequired,
}
