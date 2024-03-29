import React from 'react'
import { graphql } from 'gatsby'
import Typography from '@mui/material/Typography'
import CardMedia from '@mui/material/CardMedia'
import Card from '@mui/material/Card'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import { CustomProvider } from 'rsuite'
import DepartmentComponentTitle from '../components/departmentComponentTitle'
import DepartmentLayout from '../components/departmentLayout'
import LeaderCards from '../components/leaderCard'

import { MODULE_LIST } from '../static/constant'

const Department = (props) => {
  const depinfo = props.data.contentfulDepartmentMainPage
  // const depActivity = props.data.allContentfulActivity.edges
  const alldepinfo = props.data.allContentfulDepartmentMainPage
  // console.log("depActivity")
  // console.log(depinfo) 
  const { body } = depinfo

  return (
    <CustomProvider theme="dark">
      <DepartmentLayout depinfo={alldepinfo}>
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
            if (Object.keys(MODULE_LIST).includes(type)) {
              return (
                <>
                  {MODULE_LIST[type][2] ? (
                    <DepartmentComponentTitle title={MODULE_LIST[type][2]} />
                  ) : (
                    <></>
                  )}
                  <div key={type}>
                    {MODULE_LIST[type][1]({
                      data: props.data[`allContentful${MODULE_LIST[type][0]}`]
                        .edges,
                    })}
                  </div>
                </>
              )
            } else {
              return <div key={type}></div>
            }
          })}
        </Container>
      </DepartmentLayout>
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
          leaderIntroduction
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
    allContentfulDepartmentMainPage {
      nodes {
        name
        contentful_id
        slug
        body
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
            gatsbyImageData
          }
          description {
            raw
          }
          departments
        }
      }
    }
  }
`
