import React, { useState, useEffect } from 'react'
import { graphql, Link } from 'gatsby'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import { Input, InputGroup } from 'rsuite'
import SearchIcon from '@rsuite/icons/Search'
import { CustomProvider } from 'rsuite'
import Navigation from '../components/navigation'

const allPosts = (props) => {
  const posts = props.data.allContentfulBlogPosts.edges
  const depinfo = props.data.allContentfulDepartmentMainPage
  const [keyword, setKeyword] = useState('')
  const [content, setContent] = useState([])

  useEffect(() => {
    console.log(window.__FLEXSEARCH__)
  }, [content])

  return (
    <CustomProvider theme="dark">
      <Navigation depinfo={depinfo} />
      <Typography variant="h2" className="section-headline">
        All Posts
      </Typography>
      <Container>
        <InputGroup style={{ marginTop: '20px' }}>
          <Input
            placeholder="search"
            type="search"
            onChange={(value) => setKeyword(value)}
          />
          <InputGroup.Button
            onClick={() => {
              // TODO: search for keyword
            }}
          >
            <SearchIcon />
          </InputGroup.Button>
        </InputGroup>
        <List>
          {posts.map(({ node: post }) => {
            return (
              <ListItem
                key={post.title}
                style={{ border: '2px solid', margin: '20px' }}
              >
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
    allContentfulDepartmentMainPage {
      nodes {
        name
        slug
      }
    }
    allContentfulBlogPosts(sort: { fields: [publishDate], order: DESC }) {
      edges {
        node {
          title
          slug
          publishDate(formatString: "MMM Do, YYYY")
          description {
            content {
              content {
                value
              }
            }
          }
          childContentfulBlogPostsBodyTextNode {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
  }
`
