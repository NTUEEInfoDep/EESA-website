import * as React from 'react'
import Grid from '@mui/material/Grid'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import GitHubIcon from '@mui/icons-material/GitHub'
import Stack from '@mui/material/Stack'
import FacebookIcon from '@mui/icons-material/Facebook'
import EmailIcon from '@mui/icons-material/Email'
import { makeStyles } from '@mui/styles'
import Paper from '@mui/material/Paper'
import Modal from '@mui/material/Modal'
import Color from 'color'
import cx from 'clsx'
import CardActionArea from '@mui/material/CardActionArea'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import { useFourThreeCardMediaStyles } from '@mui-treasury/styles/cardMedia/fourThree'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import { useFadedShadowStyles } from '@mui-treasury/styles/shadow/faded'
import { useGutterBorderedGridStyles } from '@mui-treasury/styles/grid/gutterBordered'
import { useSpring, a } from '@react-spring/web'
import style from './leaderCard.module.css'

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '20px',
    padding: '10px',
  },
  item: {
    margin: '10px',
    position: 'relative',
  },
  actionArea: {
    borderRadius: 16,
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
    textAlign: 'start',
  },
  cardModal: {
    borderRadius: 12,
    minWidth: 256,
    height: '100%',
    textAlign: 'center',
    maxWidth: '300px',
    backgroundColor: '#4f4f4f',
    transition: '0.2s',
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

export default function LeaderCards(props) {
  const { depinfo } = props
  const classes = useStyles({ color: '#2f2f2f' })

  return (
    <Grid container flex justifyContent="space-evenly" classes={classes.root}>
      {depinfo.leaders.map((leader, index) => {
        return (
          <>
            <Grid item className={classes.item}>
              <CustomCard leader={leader} />
            </Grid>
          </>
        )
      })}
    </Grid>
  )
}

const CustomCard = ({ leader }) => {
  const mediaStyles = useFourThreeCardMediaStyles()
  const shadowStyles = useFadedShadowStyles()
  const borderedGridStyles = useGutterBorderedGridStyles({
    borderColor: 'rgba(0, 0, 0, 0.08)',
    height: '50%',
    maxHeight: '60%',
  })
  const classes = useStyles({ color: '#2f2f2f' })

  const [flipped, set] = React.useState(false)
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  })

  return (
    <>
      <a.div
        className={classes.card}
        style={{
          position: 'absolute',
          top: 0,
          opacity,
          transform,
          rotateX: '180deg',
          height: '100%',
        }}
        onClick={() => set((state) => !state)}
      >
        <Card className={cx(classes.cardModal, shadowStyles.root)}>
          <CardContent sx={{ height: '50%', padding: 0 }}>
            <Avatar
              className={classes.avatar}
              src={leader.leaderSelfie.file.url}
            />
            <h3 className={classes.heading}>{leader.leaderName}</h3>
            <span className={classes.subheader}>{leader.title}</span>
          </CardContent>
          <Divider light sx={{ color: 'white' }} />
          <Grid container sx={{ height: '50%' }}>
            <Grid
              p={2}
              xs={7}
              flexGrow={1}
              className={borderedGridStyles.item}
              sx={{ padding: 1 }}
            >
              <p className={classes.statLabel}>Introdution</p>
              <div
                dangerouslySetInnerHTML={{
                  __html: leader.leaderIntroduction.childMarkdownRemark.html,
                }}
                className={classes.statValue}
              />
            </Grid>
            <Grid
              p={2}
              xs={5}
              flexGrow={1}
              className={borderedGridStyles.item}
              sx={{ padding: 1 }}
            >
              <p className={classes.statLabel} style={{ marginBottom: '10px' }}>
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
      </a.div>
      <a.div
        className={classes.card}
        style={{
          opacity: opacity.to((o) => 1 - o),
          transform,
          zIndex: 2,
        }}
        onClick={() => set((state) => !state)}
      >
        <CardActionArea className={cx(classes.cardModal, shadowStyles.root)}>
          <Card className={classes.card}>
            <CardMedia
              classes={mediaStyles}
              image={leader.leaderSelfie.file.url}
            />
            <CardContent className={classes.content}>
              <Typography className={classes.title} variant={'h2'}>
                {leader.leaderName}
              </Typography>
              <Typography className={classes.subtitle}>
                {leader.title}
              </Typography>
            </CardContent>
          </Card>
        </CardActionArea>
      </a.div>
    </>
  )
}
