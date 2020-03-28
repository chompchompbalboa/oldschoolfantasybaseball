//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import axiosDefault from 'axios'

//-----------------------------------------------------------------------------
// Attach X-CSRF token to each request
//-----------------------------------------------------------------------------
const token: HTMLMetaElement | null = document.querySelector('meta[name="csrf-token"]')
let axiosWithToken = axiosDefault

if (axiosWithToken?.defaults?.headers?.common) {
  axiosWithToken.defaults.headers.common['X-CSRF-TOKEN'] = token !== null ? token.content : null
  axiosWithToken.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
}

export default axiosWithToken
