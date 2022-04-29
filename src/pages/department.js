import React from 'react'
import { graphql } from 'gatsby'
import Typography from '@mui/material/Typography'
import CardMedia from '@mui/material/CardMedia'
import Card from '@mui/material/Card'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import LeaderCards from '../components/leaderCard'
import Box from '@mui/material/Box'
import { CustomProvider } from 'rsuite'

import { FUNC_CONST, CLASS_CONST } from '../static/constant'

const Department = (props) => {
  const depinfo = props.data.contentfulDepartmentMainPage
  const { body } = depinfo

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
                <div
                  dangerouslySetInnerHTML={{
                    __html: depinfo.department.intro.childMarkdownRemark.html,
                  }}
                />
              </Card>
            </Grid>
          </Grid>
        </Box>
        {body.map((type) => {
          if (Object.keys(CLASS_CONST).includes(type)) {
            const cls = new CLASS_CONST[type][1]()
            cls.props = {
              data: props.data[`allContentful${CLASS_CONST[type][0]}`].edges,
            }
            return <div key={type}>{cls.render()}</div>
          } else if (Object.keys(FUNC_CONST).includes(type)) {
            return (
              <div key={type}>
                {FUNC_CONST[type][1]({
                  data: props.data[`allContentful${FUNC_CONST[type][0]}`].edges,
                })}
              </div>
            )
          } else {
            return <div key={type}></div>
          }
        })}
      </Container>
    </CustomProvider>
  )
}

export default Department

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
