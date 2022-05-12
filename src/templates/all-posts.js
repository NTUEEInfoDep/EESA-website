import React from 'react'
import { graphql, Link } from 'gatsby'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import { CustomProvider } from 'rsuite'

const allPosts = (props) => {
  const posts = props.data.allContentfulBlogPosts.edges
  console.log(posts)
  return (
    <CustomProvider theme="dark">
      <Typography variant="h2" className="section-headline">
        All Posts
      </Typography>
      <Container>
        <List>
          {posts.map(({ node: post }) => {
            return (
              <ListItem key={post.title}>
                <Link to={`/post/${post.slug}`}>
                  <ListItemText
                    primary={
                      <h3>
                        {post.title}{' '}
                        <span
                          className="font-medium"
                          style={{ color: 'gray', fontSize: 18 }}
                        >
                          — {post.publishDate}
                        </span>
                      </h3>
                    }
                    secondary={
                      <p>{post.description.content[0].content[0].value}</p>
                    }
                  />
                </Link>
              </ListItem>
            )
          })}
        </List>
      </Container>
    </CustomProvider>
  )
}

export default allPosts

export const pageQuery = graphql`
  query AllPosts {
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
