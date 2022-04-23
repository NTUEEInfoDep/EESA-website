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
import { CustomProvider } from 'rsuite'

import TimeLine3 from '../components/timeline3'
// import Bulletin from '../components/Bulletin'
import Navigation from '../components/navigation'
import { FUNC_CONST, CLASS_CONST } from '../static/constant'

// TODO: render all department bodies
class department extends Component {
  render() {
    const depinfo = get(this.props, 'data.contentfulDepartmentMainPage')
    // console.log(CONST['Activity'][1] instanceof Component)
    // console.log(CONST['Bulletin'][1] instanceof Component)

    const { slug, body } = depinfo
    return (
      <CustomProvider theme="dark">
        <Container style={{ background: '#fff' }}>
          {/* <Navigation depinfo={depinfo} /> */}
          <CardMedia
            component="img"
            height="540"
            image={depinfo.department.backgroundImage.file.url}
            alt="dep-image"
          />
          <Typography variant="h2" className="section-headline" color={'black'}>
            {depinfo.name}
          </Typography>
          <Box style={{ backgroundColor: 'dimgrey' }}>
            <Grid container>
              <Grid item xs={12}>
                <LeaderCards depinfo={depinfo.department} />
              </Grid>
              <Grid item xs={12}>
                <Card sx={{ margin: '5px', padding: '15px' }}>
                  <Typography variant="body2">
                    <div
                      dangerouslySetInnerHTML={{
                        __html:
                          depinfo.department.intro.childMarkdownRemark.html,
                      }}
                    />
                  </Typography>
                </Card>
              </Grid>
            </Grid>
          </Box>
          {body.map((type) => {
            if (Object.keys(CLASS_CONST).includes(type)) {
              const cls = new CLASS_CONST[type][1]()
              cls.props = {
                data: get(
                  this,
                  `props.data.allContentful${CLASS_CONST[type][0]}.edges`
                ),
              }
              return cls.render()
            } else if (Object.keys(FUNC_CONST).includes(type)) {
              return FUNC_CONST[type][1]({
                data: get(
                  this,
                  `props.data.allContentful${FUNC_CONST[type][0]}.edges`
                ),
              })
            } else {
              return <></>
            }
          })}
        </Container>
      </CustomProvider>
    )
  }
}

export default department

export const pageQuery = graphql`
  query MyQuery($slug: String!) {
    contentfulDepartmentMainPage(slug: { eq: $slug }) {
      name
      slug
      body
      department {
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
        backgroundImage {
          file {
            url
          }
        }
      }
    }
    allContentfulActivity(
      filter: { reference: { slug: { eq: $slug } } }
      sort: { fields: dateTime, order: ASC }
    ) {
      edges {
        node {
          name
          dateTime(formatString: "YYYY/MM/D h:mma")
          shortIntro
        }
      }
    }
    allContentfulBlogPosts(sort: { fields: [publishDate], order: DESC }) {
      edges {
        node {
          title
          slug
          publishDate(formatString: "MMM Do, YYYY")
          tag
          titleImage {
            fluid(maxWidth: 100, maxHeight: 196, resizingBehavior: SCALE) {
              ...GatsbyContentfulFluid_tracedSVG
            }
          }
          description {
            content {
              content {
                value
              }
            }
          }
          departments
        }
      }
    }
  }
`
