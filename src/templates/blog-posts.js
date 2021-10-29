import React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import get from 'lodash/get'
import Img from 'gatsby-image'
import Layout from '../components/layout'
import Chip from '@material-ui/core/Chip'
import FaceIcon from '@material-ui/icons/Face'
import { container, title, box_2, box_3, img } from './blog-post.module.css'
import heroStyles from '../components/hero.module.css'

class BlogPostTemplate extends React.Component {
  render() {
    const post = get(this.props, 'data.contentfulBlogPosts')
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')

    return (
      <Layout location={this.props.location}>
        <div
          style={{
            // background: '#fff',
            height: '100vh',
            opacity: '.8',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Helmet title={`${post.title} | ${siteTitle}`} />
          <div className={container}>
            <div className={img}>
              <Img alt={post.title} fluid={post.titleImage.fluid} />
            </div>
            <div
              className={box_2}
              // style={{
              //   backgroundImage: `url(${post.titleImage.fluid})`,
              //   backgroundSize: 'cover',
              //   backgroundColor: 'rgba(0,0,0,0.5)',
              // }}
            >
              <h1 className={title}>{post.title}</h1>
              <ul>
                {post.tag.map((item) => {
                  return (
                    <Chip
                      label={item}
                      icon={<FaceIcon />}
                      // variant="outlined"
                      // color="primary"
                      style={{ listStyleType: 'none' }}
                    />
                  )
                })}
              </ul>
              <div>
                {post.departments.map((item) => {
                  return <p style={{ display: 'block' }}>{item}</p>
                })}
              </div>
              <div>{post.publishDate}</div>
            </div>
            <section className={box_3}>
              <div
                dangerouslySetInnerHTML={{
                  __html: post.body.childMarkdownRemark.html,
                }}
              />
            </section>
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
