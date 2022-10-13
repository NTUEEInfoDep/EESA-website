const Promise = require('bluebird')
const path = require('path')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const blogPosts = path.resolve('./src/templates/blog-posts.js')
    const depIntro = path.resolve('./src/templates/department.js')
    const allPosts = path.resolve('./src/templates/all-posts.js')
    resolve(
      graphql(
        `
          {
            allContentfulBlogPosts {
              edges {
                node {
                  title
                  slug
                }
              }
            }
            allContentfulDepartment {
              edges {
                node {
                  name
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
      ).then((result) => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        const posts = result.data.allContentfulBlogPosts.edges
        const departments = result.data.allContentfulDepartmentMainPage.nodes
        posts.forEach((post, index) => {
          createPage({
            path: `/post/${post.node.slug}/`,
            component: blogPosts,
            context: {
              slug: post.node.slug,
            },
          })
        })
        departments.forEach((node) => {
          createPage({
            path: `/department/${node.slug}`,
            component: depIntro,
            context: {
              slug: node.slug,
            },
          })
        })
        createPage({
          path: '/post',
          component: allPosts,
        })
      })
    )
  })
}
