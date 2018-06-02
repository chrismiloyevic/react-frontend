import Cookies from 'browser-cookies'
import { fetchAccount } from 'features/account'


export const loginUser = ({ email, password }) => (
  async (dispatch, getState, { joinApi }) => {
    try {
      const { result, ok, error } = await joinApi.createToken({ email, password })

      if (ok) {
        Cookies.set('hw-token', result.token)
        await dispatch(fetchAccount())
      }

      return ok
    }
    catch (error) {
      return false
    }
  }
)
