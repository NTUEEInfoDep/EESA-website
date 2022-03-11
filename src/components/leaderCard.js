import * as React from 'react'
import Grid from '@mui/material/Grid'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import GitHubIcon from '@mui/icons-material/GitHub'
import Stack from '@mui/material/Stack'
import FacebookIcon from '@mui/icons-material/Facebook'
import EmailIcon from '@mui/icons-material/Email'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@mui/material/Paper'
import Modal from '@mui/material/Modal'
import { Box } from '@mui/system'
import Color from 'color'
import cx from 'clsx'
import CardActionArea from '@material-ui/core/CardActionArea'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import { useFourThreeCardMediaStyles } from '@mui-treasury/styles/cardMedia/fourThree'
import Avatar from '@material-ui/core/Avatar'
import Divider from '@material-ui/core/Divider'
import { useFadedShadowStyles } from '@mui-treasury/styles/shadow/faded'
import { useGutterBorderedGridStyles } from '@mui-treasury/styles/grid/gutterBordered'
import ReactMarkdown from 'react-markdown'

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '20px',
    padding: '10px',
  },
  item: {
    margin: '10px',
  },
  actionArea: {
    borderRadius: 16,
    transition: '0.2s',
    '&:hover': {
      transform: 'scale(0.95)',
    },
  },
  card: ({ color }) => ({
    minWidth: 256,
    borderRadius: 16,
    boxShadow: 'none',
    '&:hover': {
      boxShadow: `0 6px 12px 0 ${Color(color)
        .rotate(-12)
        .darken(0.2)
        .fade(0.5)}`,
    },
  }),
  content: ({ color }) => {
    return {
      backgroundColor: color,
      padding: '1rem 1.5rem 1.5rem',
    }
  },
  title: {
    fontFamily: 'Keania One',
    fontSize: '2rem',
    color: '#fff',
    textTransform: 'uppercase',
  },
  subtitle: {
    fontFamily: 'Montserrat',
    color: '#9f9f9f',
    opacity: 0.87,
    marginTop: '1rem',
    fontWeight: 500,
    fontSize: 18,
  },
  cardModal: {
    borderRadius: 12,
    minWidth: 256,
    textAlign: 'center',
    maxWidth: '300px',
    backgroundColor: '#4f4f4f',
  },
  avatar: {
    width: 60,
    height: 60,
    margin: 'auto',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: '0.5px',
    marginTop: 8,
    marginBottom: 0,
  },
  subheader: {
    fontSize: 14,
    color: '#aeaeae',
    marginBottom: '0.875em',
  },
  statLabel: {
    fontSize: 12,
    color: '#aeaeae',
    fontWeight: 500,
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    margin: 0,
  },
  statValue: {
    fontSize: 14,
    letterSpacing: '1px',
    wordWrap: 'break-word',
  },
}))

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function LeaderCards(props) {
  const { depinfo } = props
  const classes = useStyles({ color: '#2f2f2f' })
  const shadowStyles = useFadedShadowStyles()
  const borderedGridStyles = useGutterBorderedGridStyles({
    borderColor: 'rgba(0, 0, 0, 0.08)',
    height: '50%',
    maxHeight: '60%',
  })
  const [open, setOpen] = React.useState(
    Array(depinfo.leaders.length).fill(false)
  )

  const handleClose = (index) => {
    let open_copy = open.slice()
    open_copy[index] = false
    setOpen(open_copy)
  }

  return (
    <Grid container flex justifyContent="space-evenly" classes={classes.root}>
      {depinfo.leaders.map((leader, index) => {
        return (
          <>
            <Grid item className={classes.item}>
              <CustomCard
                classes={classes}
                open={open}
                setOpen={setOpen}
                leader={leader}
                index={index}
              />
            </Grid>
            <Modal
              open={open[index]}
              onClose={() => handleClose(index)}
              sx={{
                position: 'absolute',
                left: '50%',
                marginLeft: '-150px',
                top: '40%',
              }}
            >
              <Card className={cx(classes.cardModal, shadowStyles.root)}>
                <CardContent>
                  <Avatar
                    className={classes.avatar}
                    src={leader.leaderSelfie.file.url}
                  />
                  <h3 className={classes.heading}>{leader.leaderName}</h3>
                  <span className={classes.subheader}>{leader.title}</span>
                </CardContent>
                <Divider light sx={{ color: 'white' }} />
                <Grid container>
                  <Grid
                    p={2}
                    xs={7}
                    flexGrow="1"
                    className={borderedGridStyles.item}
                  >
                    <p className={classes.statLabel}>Introdution</p>
                    <ReactMarkdown
                      children={leader.leaderIntroduction.leaderIntroduction}
                      className={classes.statValue}
                    />
                  </Grid>
                  <Grid
                    p={2}
                    xs={5}
                    flexGrow="1"
                    className={borderedGridStyles.item}
                  >
                    <p
                      className={classes.statLabel}
                      style={{ marginBottom: '10px' }}
                    >
                      Contact
                    </p>
                    <a href={leader.leaderGithub} style={{ margin: 2 }}>
                      <GitHubIcon fontSize="large" />
                    </a>
                    <a href={leader.leaderFacebook} style={{ margin: 2 }}>
                      <FacebookIcon fontSize="large" />
                    </a>
                    <a href={leader.leaderEmail} style={{ margin: 2 }}>
                      <EmailIcon fontSize="large" />
                    </a>
                  </Grid>
                </Grid>
              </Card>
            </Modal>
          </>
        )
      })}
    </Grid>
  )
}

const CustomCard = ({ classes, leader, open, setOpen, index }) => {
  const mediaStyles = useFourThreeCardMediaStyles()
  const handleClickOpen = (index) => {
    let open_copy = open.slice()
    console.log(index)
    open_copy[index] = true
    setOpen(open_copy)
  }
  return (
    <CardActionArea
      className={classes.actionArea}
      onClick={() => handleClickOpen(index)}
    >
      <Card className={classes.card}>
        <CardMedia classes={mediaStyles} image={leader.leaderSelfie.file.url} />
        <CardContent className={classes.content}>
          <Typography className={classes.title} variant={'h2'}>
            {leader.leaderName}
          </Typography>
          <Typography className={classes.subtitle}>{leader.title}</Typography>
        </CardContent>
      </Card>
    </CardActionArea>
  )
}
