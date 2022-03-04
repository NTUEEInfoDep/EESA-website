import React, { Component } from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import Typography from '@mui/material/Typography'
import CardMedia from '@mui/material/CardMedia'
import Card from '@mui/material/Card'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import LeaderCards from '../components/leaderCard'
import Box from '@mui/material/Box'

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
        <Typography variant="h2" className="section-headline">
          {depinfo.name}
        </Typography>
        <Box style={{ backgroundColor: 'dimgrey' }}>
          <Grid container>
            <Grid item xs={12}>
              <LeaderCards depinfo={depinfo} />
            </Grid>
            <Grid item xs={12}>
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
          </Grid>
        </Box>
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
