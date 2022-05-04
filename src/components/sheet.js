import * as fs from 'fs'
import * as readline from 'readline'
import { google } from 'googleapis'

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly']
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json'

// Load client secrets from a local file.
fs.readFile('credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err)
  // Authorize a client with credentials, then call the Google Sheets API.
  authorize(JSON.parse(content), listMajors)
})

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const { client_secret, client_id, redirect_uris } = credentials.installed
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  )
  let data
  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, async (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback)
    oAuth2Client.setCredentials(JSON.parse(token))
    data = await callback(oAuth2Client)
  })
  return data
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  })
  let data
  console.log('Authorize this app by visiting this url:', authUrl)
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close()
    oAuth2Client.getToken(code, (err, token) => {
      if (err)
        return console.error('Error while trying to retrieve access token', err)
      oAuth2Client.setCredentials(token)
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err)
        console.log('Token stored to', TOKEN_PATH)
      })
      data = callback(oAuth2Client)
    })
  })
  return data
}

/**
 * Prints the names and majors of students in a sample spreadsheet:
 * @see https://docs.google.com/spreadsheets/d/1ENqU7MRcBv6cXczgRQ-FJyRyVmRSUWYl19CHdlTRsHk/edit
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
function listMajors(auth) {
  const sheets = google.sheets({ version: 'v4', auth })
  sheets.spreadsheets.values.get(
    {
      spreadsheetId: '1ENqU7MRcBv6cXczgRQ-FJyRyVmRSUWYl19CHdlTRsHk',
      range: 'reply!A2:G',
    },
    (err, res) => {
      if (err) return console.log('The API returned an error: ' + err)
      const rows = res.data.values
      if (rows.length) {
        console.log('物品名稱, 時間:')
        // Print columns A and E, which correspond to indices 0 and 4.
        rows.map((row) => {
          console.log(`${row[3]}, ${row[4]}, ${row[5]}, ${row[6]}`)
        })
      } else {
        console.log('No data found.')
      }
    }
  )
}

async function parseLostandFound(auth) {
  const sheets = google.sheets({ version: 'v4', auth })
  let data = []
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: '1ENqU7MRcBv6cXczgRQ-FJyRyVmRSUWYl19CHdlTRsHk',
    range: 'reply!A2:G',
  })
  const rows = response.data.values
  if (rows.length) {
    console.log('物品名稱, 時間:')
    // Print columns A and E, which correspond to indices 0 and 4.
    rows.map((row) => {
      console.log(`${row[3]}, ${row[4]}, ${row[5]}, ${row[6]}`)
      data.push({
        itemName: row[3],
        time: row[4],
        imageUrl: row[5],
        display: row[6],
      })
    })
  } else {
    console.log('No data found.')
  }
  return data
}

export function getLostandFound() {
  // Load client secrets from a local file.
  fs.readFile('credentials.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err)
    // Authorize a client with credentials, then call the Google Sheets API.
    return authorize(JSON.parse(content), parseLostandFound)
  })
}
