import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import { CustomProvider } from 'rsuite'
import { Helmet } from 'react-helmet'
import Layout from '../components/layout'
import Bulletin from '../components/Bulletin'
import LostAndFound from '../components/lostandfound'
import Sports from '../components/Sports'

class RootIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const [author] = get(this, 'props.data.allContentfulPerson.edges')
    const activities = get(this, 'props.data.allContentfulActivity.edges')
    const bulletin = get(this, 'props.data.allContentfulBlogPosts.edges')
    const depinfo = get(this.props, 'data.allContentfulDepartmentMainPage')

    const sportsHonorRoll = get(
      this,
      'props.data.allContentfulSportsHonorRoll.edges'
    )
    const sportsInformationBar = get(
      this,
      'props.data.allContentfulSportsInformationBar.edges'
    )
    return (
      <CustomProvider theme="dark">
        <Layout location={this.props.location} depinfo={depinfo}>
          <Sports
            honorRoll={sportsHonorRoll}
            informationBar={sportsInformationBar}
          />
          <Helmet title={siteTitle} />
          <Bulletin data={bulletin} />
          <div className="wrapper">
            <h2 className="section-headline">Lost and Found</h2>
            <div>
              <LostAndFound />
            </div>
          </div>
        </Layout>
      </CustomProvider>
    )
  }
}

export default RootIndex

export const pageQuery = graphql`
  query HomeQuery {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulActivity(sort: { fields: dateTime, order: ASC }) {
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
    allContentfulPerson(
      filter: { contentful_id: { eq: "15jwOBqpxqSAOy2eOO4S0m" } }
    ) {
      edges {
        node {
          name
          shortBio {
            shortBio
          }
          title
          heroImage: image {
            fluid(
              maxWidth: 1180
              maxHeight: 480
              resizingBehavior: PAD
              background: "rgb:000000"
            ) {
              ...GatsbyContentfulFluid_tracedSVG
            }
          }
        }
      }
    }
    allContentfulBulletinBoard {
      edges {
        node {
          title
          description
          posts {
            title
            slug
            description {
              content {
                content {
                  value
                }
              }
            }
            body {
              childMarkdownRemark {
                html
              }
            }
            tag
            departments
            updatedAt
          }
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
    allContentfulSportsHonorRoll {
      edges {
        node {
          honorRoll {
            fluid(maxWidth: 1920, maxHeight: 1080, quality: 100) {
              ...GatsbyContentfulFluid_tracedSVG
            }
          }
        }
      }
    }
    allContentfulSportsInformationBar {
      edges {
        node {
          contactPeople1 {
            leaderEmail
            leaderFacebook
            leaderName
          }
          contactPeople2 {
            leaderName
            leaderEmail
            leaderFacebook
          }
          name
          practicePlace
          practiceTime
        }
      }
    }
  }
`
