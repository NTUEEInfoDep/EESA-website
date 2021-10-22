const Promise = require('bluebird')
const path = require('path')

exports.createPages = ({ graphql, actions }) => {
    const { createPage } = actions

    return new Promise((resolve, reject) => {
        const blogPosts = path.resolve('./src/templates/blog-posts.js')
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
          }
        `
            ).then((result) => {
                if (result.errors) {
                    console.log(result.errors)
                    reject(result.errors)
                }

                const posts = result.data.allContentfulBlogPosts.edges
                posts.forEach((post, index) => {
                    createPage({
                        path: `/blog/${post.node.slug}/`,
                        component: blogPosts,
                        context: {
                            slug: post.node.slug,
                        },
                    })
                })
            })
        )
    })
}