import * as React from 'react'
import TextField from '@mui/material/TextField'
import DateRangePicker from '@mui/lab/DateRangePicker'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import Box from '@mui/material/Box'
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
import Grid from '@mui/material/Grid'
import Stach from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { Stack } from '@mui/material'
import Paper from '@mui/material/Paper'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '80%',
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
    padding: 4,
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
  const [value, setValue] = React.useState([null, null])
  const [checked, setChecked] = React.useState(true)

  const classes = useStyles()
  const mediaStyles = useFourThreeCardMediaStyles()
  const textCardContentStyles = useN04TextInfoContentStyles()
  const shadowStyles = useOverShadowStyles({ inactive: true })

  const handleChange = (event) => {
    setChecked(event.target.checked)
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box className={classes.root}>
        <Box className={classes.navbar}>
          <Stack spacing={1}>
            <Typography fontWeight={'bold'}> Choose date range </Typography>
            <DateRangePicker
              startText="From"
              endText="To"
              value={value}
              onChange={(newValue) => {
                setValue(newValue)
              }}
              renderInput={(startProps, endProps) => (
                <React.Fragment>
                  <TextField {...startProps} />
                  <Box sx={{ mx: 2 }}> to </Box>
                  <TextField {...endProps} />
                </React.Fragment>
              )}
            />
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
        <Grid container spacing={2} className={classes.items}>
          {[0, 1, 2, 3].map(() => (
            <Grid item xs={4}>
              <Card className={cx(classes.cardRoot, shadowStyles.root)}>
                <CardMedia
                  className={cx(classes.media, mediaStyles.root)}
                  image={
                    'https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80'
                  }
                />
                <CardContent>
                  <Stack>
                    <Typography>Date</Typography>
                    <Typography>Title</Typography>
                    <Typography>Location</Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </LocalizationProvider>
  )
}
