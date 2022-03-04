import React, { Component } from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import Typography from '@mui/material/Typography'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Card from '@mui/material/Card'
import Container from '@mui/material/Container'
import Chip from '@mui/material/Chip'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Layout from '../layouts/department'
import LeaderCards from '../components/leaderCard'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
//
import SpeedDial from '@mui/material/SpeedDial'
import SpeedDialAction from '@mui/material/SpeedDialAction'
//  import Layout from '../layouts/department'
//  import LeaderCard from '../components/leadercard';

const actions = ['資訊部', '學術部', '衛生部', '行銷部', 'EE+']

class department extends Component {
  render() {
    const depinfo = get(this.props, 'data.contentfulDepartment')
    return (
      //  <Layout>
      <Container style={{ background: '#fff' }}>
        <CardMedia
          component="img"
          height="540"
          image={depinfo.backgroundImage.file.url}
          alt="dep-image"
        />
        <CardContent>
          <div>
            <SpeedDial
              ariaLabel="SpeedDial basic trial"
              direction="right"
              FabProps={{
                variant: 'extended',
                size: 'large',
              }}
              icon={
                <Typography
                  variant="h5"
                  className="section-headline"
                  sx={{ padding: '0' }}
                >
                  {depinfo.name}
                </Typography>
              }
            >
              {actions
                .filter((action) => {
                  return action !== depinfo.name
                })
                .map((action) => {
                  return (
                    <SpeedDialAction
                      key={action}
                      FabProps={{
                        variant: 'extended',
                        size: 'large',
                        sx: {
                          bgcolor: '#34aaff',
                          '&:hover': {
                            bgcolor: 'primary.main',
                            color: 'white',
                          },
                        },
                      }}
                      tooltipPlacement="bottom"
                      icon={
                        <Typography
                          variant="h5"
                          className="section-headline"
                          sx={{ padding: '0' }}
                        >
                          {action}
                        </Typography>
                      }
                    />
                  )
                })}
            </SpeedDial>
            <Typography variant="h2" className="section-headline">
              {depinfo.name}
            </Typography>
            <Box style={{ backgroundColor: 'dimgrey' }}>
              <Grid container>
                <Grid xs={9}>
                  <Card sx={{ margin: '5px', padding: '15px' }}>
                    <Typography variant="body2">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: depinfo.intro.childMarkdownRemark.html,
                        }}
                      />
                    </Typography>
                  </Card>
                </Grid>
                <Grid xs={3}>
                  {depinfo.leaders.map((leader) => {
                    return (
                      <Card sx={{ margin: '5px' }}>
                        <CardHeader
                          avatar={
                            <Avatar
                              src={leader.leaderSelfie.file.url}
                              alt={leader.leaderName}
                              sx={{ width: 80, height: 80 }}
                            />
                          }
                          title={
                            <CardContent>
                              <Chip
                                color="primary"
                                label={leader.title}
                                variant="subtitle1"
                              />
                              <Typography variant="h6" color={'#34aaff'}>
                                {leader.leaderName}
                              </Typography>
                            </CardContent>
                          }
                        />
                      </Card>
                    )
                  })}
                </Grid>
              </Grid>
            </Box>
          </div>
        </CardContent>
      </Container>
      //  </Layout>
    )
  }
}

export default department

export const pageQuery = graphql`
  query MyQuery($slug: String!) {
    contentfulDepartment(name: { eq: $slug }) {
      name
      leaders {
        leaderEmail
        leaderFacebook
        leaderGithub
        leaderName
        leaderIntroduction {
          childMarkdownRemark {
            html
          }
        }
        leaderSelfie {
          file {
            url
          }
        }
        title
      }
      intro {
        childMarkdownRemark {
          html
        }
      }
      references {
        images {
          id
        }
      }
      backgroundImage {
        file {
          url
        }
      }
    }
  }
`
