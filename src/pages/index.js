import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import { CustomProvider } from 'rsuite'
import { Helmet } from 'react-helmet'
import Bulletin from '../components/Bulletin'
import Layout from '../components/layout'
import LostAndFound from '../components/lostandfound'
import Sports from '../components/Sports'
import TimeLine from '../components/timeline'
import Clothes from '../components/clothes'

class RootIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const [author] = get(this, 'props.data.allContentfulPerson.edges')
    const activities = get(this, 'props.data.allContentfulBlogPosts.edges')
    const bulletin = get(this, 'props.data.allContentfulBlogPosts.edges')
    const depinfo = get(this.props, 'data.allContentfulDepartmentMainPage')
    const clothes = get(this, 'props.data.allContentfulClothes.edges')

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
          <div className="wrapper">
            <h2 className="section-headline">Clothes Selling</h2>
            <div>
              <Clothes data={clothes} />
            </div>
          </div>
          <TimeLine name={"行銷部"} />
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
            gatsbyImageData(width: 100, height: 196)
          }
          description {
            raw
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
            gatsbyImageData(width: 1180, height: 480)
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
              raw
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
            gatsbyImageData(width: 1920, height: 1080)
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
    allContentfulClothes {
      edges {
        node {
          name          
          left
          clothesPicture {
            gatsbyImageData
          }
          price
        }
      }
    }
  }
`