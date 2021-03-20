import { string } from 'joi'
import { signInValidate, signUpValidate } from '.'

describe('validations', () => {
  describe('signInValidate', () => {
    it('Should validate empty fields', () => {
      const values = { email: '', password: '' }

      expect(signInValidate(values)).toMatchObject({
        email: '"email" is not allowed to be empty',
        password: '"password" is not allowed to be empty'
      })
    })
    it('Should return invalid email error', () => {
      const values = { email: 'someinvalidemail', password: '12345' }

      expect(signInValidate(values)).toMatchObject({
        email: '"email" must be a valid email'
      })
    })
  })

  describe('signUpValidate', () => {
    it('should validate empty fields', () => {
      const values = { username: '', email: '', password: '' }

      expect(signUpValidate(values)).toMatchObject({
        email: expect.any(String),
        username: expect.any(String),
        password: expect.any(String)
      })
    })
    it('should return short user name error', () => {
      const values = { username: 'aas', email: '', password: '' }

      expect(signUpValidate(values).username).toMatchInlineSnapshot(
        `"\\"username\\" length must be at least 5 characters long"`
      )
    })
    it('should return invalid email error', () => {
      const values = {
        username: 'somename',
        email: 'invalidemail',
        password: ''
      }

      expect(signUpValidate(values).email).toMatchInlineSnapshot(
        `"\\"email\\" must be a valid email"`
      )
    })

    it('should return error if password does not match with confirm password', () => {
      const values = {
        username: 'somename',
        email: 'some@valid.com',
        password: '1234',
        confirm_password: '6789'
      }

      expect(signUpValidate(values).confirm_password).toMatchInlineSnapshot(
        `"confirm_password does not match with passord"`
      )
    })
  })
})
