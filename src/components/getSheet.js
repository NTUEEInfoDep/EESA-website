import gapi from 'gapi-client'

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly']

export function init() {
  gapi.load('client', () => {
    gapi.client.load('sheets', 'v4')
  })

  const client_id =
    '530471835429-7ph1os862lonirh2e85mtj0q4giddobb.apps.googleusercontent.com'

  gapi.auth.authorize(
    { client_id, scope: SCOPES, immediate: true },
    (authResult) => {
      if (authResult && !authResult.error) {
        console.log('success')
      } else {
        console.log('fail')
      }
    }
  )
}
