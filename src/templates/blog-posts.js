import React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import get from 'lodash/get'
import { GatsbyImage } from 'gatsby-plugin-image'
import Layout from '../components/layout'
import Chip from '@mui/material/Chip'
import FaceIcon from '@mui/icons-material/Face'
import {
  container,
  title,
  box_2,
  box_3,
  img,
  tag_div,
} from './blog-posts.module.css'

function BlogPostTemplate({ data, location }) {
  const post = get(data, 'contentfulBlogPosts')
  const siteTitle = get(data, 'site.siteMetadata.title')
  const depinfo = get(data, 'allContentfulDepartmentMainPage')

  return (
    <Layout location={this.props.location} depinfo={depinfo}>
      <div
        style={{
          height: '100vh',
          opacity: '.8',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Helmet title={`${post.title} | ${siteTitle}`} />
        <div className={container}>
          <GatsbyImage
            className={img}
            alt={post.title}
            image={post.titleImage.gatsbyImageData}
          />
          <div className={box_2}>
            <h1 className={title}>{post.title}</h1>

            <div className={tag_div}>
              {post.tag.map((item) => {
                return (
                  <Chip
                    label={item}
                    icon={<FaceIcon />}
                    style={{ listStyleType: 'none' }}
                  />
                )
              })}
            </div>
            <div>
              {post.departments.map((item) => {
                return (
                  <p
                    style={{
                      display: 'inline-block',
                      padding: '0rem 0.5rem',
                    }}
                  >
                    {item}
                  </p>
                )
              })}
            </div>
            <div>{post.publishDate}</div>
          </div>
          <section className={box_3} style={{ paddingTop: '2vh' }}>
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

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostsBySlug($slug: String!) {
    allContentfulDepartmentMainPage {
      nodes {
        name
        contentful_id
        slug
        body
      }
    }
    contentfulBlogPosts(slug: { eq: $slug }) {
      title
      publishDate(formatString: "MMM Do, YYYY")
      titleImage {
        gatsbyImageData
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
