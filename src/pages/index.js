import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import { Helmet } from 'react-helmet'
import Hero from '../components/hero'
import Layout from '../components/layout'
import TimeLine from '../components/timeline'
import TimeLine3 from '../components/timeline3'
import EventLine from '../components/EventLine/EventLine'
import Bulletin from '../components/Bulletin'

class RootIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const [author] = get(this, 'props.data.allContentfulPerson.edges')
    const activities = get(this, 'props.data.allContentfulActivity.edges')
    const bulletin = get(this, 'props.data.allContentfulBlogPosts.edges')
    const depinfo = get(this.props, 'data.allContentfulDepartmentMainPage')

    return (
      <Layout location={this.props.location} depinfo={depinfo}>
        <div style={{ background: '#fff' }}>
          <Helmet title={siteTitle} />
          <Hero data={author.node} />
          <Bulletin data={bulletin} />
          <div className="wrapper">
            <h2 className="section-headline">Recent articles</h2>
          </div>
          <TimeLine data={activities} />
          <TimeLine3 data={activities} />
          <EventLine data={activities} />
        </div>
      </Layout>
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
      }
    }
  }
`
