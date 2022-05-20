import * as React from 'react'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import { makeStyles } from '@material-ui/core/styles'
import Switch from '@mui/material/Switch'
import { styled } from '@mui/material/styles'
import FormControlLabel from '@mui/material/FormControlLabel'
import { useFourThreeCardMediaStyles } from '@mui-treasury/styles/cardMedia/fourThree'
import { useN04TextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/n04'
import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over'
import cx from 'clsx'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { Stack } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import useGoogleSheets from 'use-google-sheets'
import { useEffect, useState } from 'react'
// date range picker
import 'react-date-range/dist/styles.css' // main style file
import 'react-date-range/dist/theme/default.css' // theme css file
import { DateRangePicker } from 'react-date-range'
import CancelIcon from '@mui/icons-material/Cancel'
import IconButton from '@mui/material/IconButton'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '80vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#5e5e5e',
    marginBottom: '20px',
  },
  paper: {
    width: '100%',
    height: '100%',
  },
  navbar: {
    backgroundColor: '#111111',
    width: '100%',
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    border: 'solid',
    marginBottom: 16,
    // borderRadius: '4%',
  },
  cardRoot: {
    maxWidth: 343,
    margin: 'auto',
    borderRadius: 12,
    padding: 12,
  },
  media: {
    borderRadius: 6,
  },
  items: {
    width: '100%',
    height: '100%',
    overflow: 'auto',
    margin: 0,
    padding: 20,
    paddingTop: 0,
  },
}))
const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="30" width="30" viewBox="-1.5 0 20 20"><path fill="${encodeURIComponent(
          '#fff'
        )}" d="m 4 6 l 2 0 l 0 1 l -2 0 l 0 -1 l 0 2 l 5 0 l 0 1 l -5 0 l 0 2 l 0 0 l 8 0 l 0 -1 l -8 0 l 0 3 l 11 0 l 0 -1 l -11 0 l 0 1 l 0 0 l 0 -4 l 0 0 l 0 -3"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
    width: 32,
    height: 32,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="30" width="30" viewBox="-1.5 -1 20 20"><path fill="${encodeURIComponent(
        '#fff'
      )}" d="m 3.5 5.5 l 11 0 l 0 1 l -11 0 l 0 -1 l 0 2 l 8 0 l 0 1 l -8 0 l 0 2 l 0 0 l 5 0 l 0 -1 l -5 0 l 0 3 l 2 0 l 0 -1 l -2 0 l 0 1 l 0 0 l 0 -4 l 0 0 l 0 -3"/></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2,
  },
}))

export default function LostAndFound() {
  const [selectionRange, setSelectionRange] = useState({
    startDate: null,
    endDate: new Date(3000, 1, 1),
    key: 'selection',
  })
  const [checked, setChecked] = useState(false)
  const [items, setItems] = useState([])
  const [openRangePicker, setOpenRangePicker] = useState(false)

  const classes = useStyles()
  const mediaStyles = useFourThreeCardMediaStyles()
  const textCardContentStyles = useN04TextInfoContentStyles()
  const shadowStyles = useOverShadowStyles({ inactive: true })

  const { data, loading, error } = useGoogleSheets({
    apiKey: process.env.GATSBY_APIKEY,
    sheetId: process.env.GATSBY_SHEET_ID,
  })
  const handleChange = (event) => {
    setChecked(!checked)
    setItems(items.slice().reverse())
  }
  const handleSelect = (range) => {
    setSelectionRange({ ...range.selection, key: 'selection' })
  }
  const handleOpenRangePicker = () => {
    setOpenRangePicker(true)
  }
  const handleCloseRangePicker = () => {
    setOpenRangePicker(false)
  }
  useEffect(() => {
    if (!loading) {
      let temp = data[0].data
      temp.sort(function (a, b) {
        if (!checked) {
          return new Date(b['撿到的時間']) - new Date(a['撿到的時間'])
        } else {
          return new Date(a['撿到的時間']) - new Date(b['撿到的時間'])
        }
      })
      setItems(temp)
    }
  }, [loading])

  useEffect(() => {
    if (!loading) {
      const early_date = selectionRange.startDate
      const late_date = selectionRange.endDate

      let temp = data[0].data
      temp = temp.filter((a) => {
        if (
          new Date(a['撿到的時間']) <= late_date &&
          new Date(a['撿到的時間']) >= early_date
        ) {
          return true
        }
        return false
      })
      temp.sort(function (a, b) {
        if (!checked) {
          return new Date(b['撿到的時間']) - new Date(a['撿到的時間'])
        } else {
          return new Date(a['撿到的時間']) - new Date(b['撿到的時間'])
        }
      })
      setItems(temp)
    }
  }, [selectionRange])

  return (
    <Box className={classes.root}>
      <Modal
        open={openRangePicker}
        onClose={handleCloseRangePicker}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            border: '2px solid #444444',
            boxShadow: 24,
            p: 2,
            color: 'black',
          }}
        >
          <DateRangePicker ranges={[selectionRange]} onChange={handleSelect} />
        </Box>
      </Modal>
      <Box className={classes.navbar}>
        <Stack spacing={1}>
          <Typography fontWeight={'bold'}> Choose date range </Typography>
          <Box flex flexDirection="row">
            <Button
              onClick={handleOpenRangePicker}
              variant="outlined"
              sx={{
                padding: '5px 30px',
                color: 'white',
                border: '2px solid rgba(144, 202, 249, 0.5)',
              }}
            >
              {selectionRange.startDate === null
                ? 'Date Range Picker'
                : `${formatDate(selectionRange.startDate)} - ${formatDate(
                    selectionRange.endDate
                  )}`}
            </Button>
            {selectionRange.startDate === null ? (
              <></>
            ) : (
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
                onClick={() => {
                  setSelectionRange({
                    startDate: null,
                    endDate: new Date(3000, 1, 1),
                    key: 'selection',
                  })
                }}
              >
                <CancelIcon />
              </IconButton>
            )}
          </Box>
        </Stack>
        <Stack spacing={1} alignItems="flex-end">
          <Typography fontWeight={'bold'}> Choose order </Typography>
          <FormControlLabel
            control={
              <MaterialUISwitch
                sx={{ m: 1 }}
                checked={checked}
                onChange={handleChange}
              />
            }
            label={checked ? '舊到新' : '新到舊'}
            labelPlacement="start"
          />
        </Stack>
      </Box>
      <Grid
        container
        spacing={2}
        className={classes.items}
        onChange={handleSelect}
      >
        {loading ? (
          <Grid item xs={4}>
            <CircularProgress sx={{}} />
          </Grid>
        ) : (
          items.map((item, index) => (
            <Grid item xs={4} key={index} sx={{ padding: 0 }}>
              <Card className={cx(classes.cardRoot, shadowStyles.root)}>
                {item['照片'] ? (
                  <CardMedia
                    className={cx(classes.media, mediaStyles.root)}
                    image={`https://drive.google.com/uc?export=view&id=${
                      item['照片'].split('=')[1]
                    }`}
                  />
                ) : (
                  <></>
                )}
                <CardContent>
                  <Typography variant="h5" component="div">
                    {item['撿到什麼']}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {item['在哪撿到的？']}
                  </Typography>
                </CardContent>
                <CardActions style={{ justifyContent: 'right' }}>
                  <Typography variant="caption" color="text.secondary">
                    {item['撿到的時間']}
                  </Typography>
                </CardActions>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  )
}

function formatDate(d) {
  var month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear()

  if (month.length < 2) month = '0' + month
  if (day.length < 2) day = '0' + day

  return [year, month, day].join('-')
}
