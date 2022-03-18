import React, { Component } from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import styles from './department.module.css'
import GitHubIcon from '@mui/icons-material/GitHub'
import FacebookIcon from '@mui/icons-material/Facebook'
import EmailIcon from '@mui/icons-material/Email'
import Typography from '@mui/material/Typography'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Layout from '../layouts/department'
//  import LeaderCard from '../components/leadercard';

class department extends Component {
  render() {
    const depinfo = get(
      this.props,
      'data.allContentfulDepartment.edges'
    ).filter((deps) => {
      return deps.node.name === this.props.location.state.depName
    })[0].node //get current department node
    //but kinda ugly, should be made prettier later
    return (
      //  <Layout>
      <div style={{ background: '#fff' }}>
        <div className="wrapper">
          <Typography variant="h2" className="section-headline">
            {depinfo.name}
          </Typography>
          <Card style={{ background: '#2f2f2f', color: '#ffffff' }}>
            <div
              dangerouslySetInnerHTML={{
                __html: depinfo.intro.childMarkdownRemark.html,
              }}
            />
          </Card>
          <Card
            style={{ background: '#5e5e5e', color: '#ffffff' }}
            className="leader-container"
          >
            <Typography variant="h6">部長</Typography>
            <Grid container>
              {depinfo.leaders.map((leader) => {
                return (
                  <Grid
                    item
                    style={{ border: 'solid' }}
                    xs={12 / depinfo.leaders.length}
                    className={styles.leadershort}
                  >
                    <CardMedia
                      component="img"
                      image={leader.leaderSelfie.file.url}
                      alt={leader.leaderName}
                    ></CardMedia>
                    <Stack>
                      <Chip
                        style={{ background: '#e5e5e5' }}
                        label={leader.title}
                        variant="subtitle1"
                      />
                      <Typography variant="body2">
                        {leader.leaderName}
                      </Typography>
                    </Stack>
                    <CardContent
                      style={{ color: '#34c3ff', textAlign: 'left' }}
                    >
                      <a href={leader.leaderGithub}>
                        <GitHubIcon />
                        <Typography variant="caption">
                          {leader.leaderGithub}
                        </Typography>
                      </a>
                      <br />
                      <a href={leader.leaderFacebook}>
                        <FacebookIcon />
                        <Typography variant="caption">
                          {leader.leaderName}
                        </Typography>
                      </a>
                      <br />
                      <a href={leader.leaderEmail}>
                        <EmailIcon />
                        <Typography variant="caption">
                          {leader.leaderEmail}
                        </Typography>
                      </a>
                    </CardContent>
                  </Grid>
                )
              })}
            </Grid>
          </Card>
        </div>
        <div className="special-requirements"></div>
        <div className="references">
          {
            //TODO: add customize reference
          }
        </div>
      </div>
      //  </Layout>
    )
  }
}

export default department

export const pageQuery = graphql`
  query MyQuery {
    allContentfulDepartment {
      edges {
        node {
          name
          intro {
            childMarkdownRemark {
              html
            }
          }
          leaders {
            leaderEmail
            leaderFacebook
            leaderGithub
            leaderName
            title
            leaderSelfie {
              file {
                url
              }
            }
          }
        }
      }
    }
  }
`
