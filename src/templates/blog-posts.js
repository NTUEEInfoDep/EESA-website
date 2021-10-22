import React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import get from 'lodash/get'
import Img from 'gatsby-image'
import Layout from '../components/layout'

import heroStyles from '../components/hero.module.css'

class BlogPostTemplate extends React.Component {
  render() {
    const post = get(this.props, 'data.contentfulBlogPosts')
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')

    return (
      <Layout location={this.props.location}>
        <div style={{ background: '#fff' }}>
          <Helmet title={`${post.title} | ${siteTitle}`} />
          <div>
            <div>
              <Img alt={post.title} fluid={post.titleImage.fluid} />
            </div>
            <div>
              <h1>{post.title}</h1>
              <div
                style={{
                  display: 'block',
                }}
              >
                {post.publishDate}
              </div>
              <div>
                {post.tag.map((item) => {
                  return <p>{item}</p>
                })}
              </div>
              <div>
                {post.departments.map((item) => {
                  return <p>{item}</p>
                })}
              </div>
            </div>
          </div>
          <div className="wrapper">
            <div
              dangerouslySetInnerHTML={{
                __html: post.body.childMarkdownRemark.html,
              }}
            />
          </div>
        </div>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostsBySlug($slug: String!) {
    contentfulBlogPosts(slug: { eq: $slug }) {
      title
      publishDate(formatString: "MMMM Do, YYYY")
      titleImage {
        fluid(maxWidth: 1180, background: "rgb:000000") {
          ...GatsbyContentfulFluid_tracedSVG
        }
      }
      body {
        childMarkdownRemark {
          html
        }
      }
      departments
      tag
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`