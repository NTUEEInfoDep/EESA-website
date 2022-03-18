import React from 'react'
import Carousel from 'react-elastic-carousel'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import styles from './Slide.module.css'
import get from 'lodash/get'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'

const SportsItem = ({ description, photo }) => {
  return (
    <Box
      sx={{ width: 1000, height: 300, bgcolor: '#00ADB5' }}
      className={styles.sportsBox}
    >
      {photo ? (
        photo.fluid ? (
          <div>
            <Paper variant="outlined">
              <Img
                alt={photo.fluid.src}
                fluid={photo.fluid}
                style={{
                  width: '30%',
                  height: '40%',
                  float: 'right',
                }}
              />
            </Paper>
          </div>
        ) : (
          <div />
        )
      ) : (
        <div />
      )}
      <div
        dangerouslySetInnerHTML={{
          __html: description,
        }}
        className={styles.description}
      ></div>
      <div></div>
    </Box>
  )
}

class Slide extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const data = get(this, 'props.data')
    console.log('sports: ', data[0].node.photo)
    return (
      <Carousel itemsToShow={1}>
        {data.map((item) => (
          <SportsItem
            description={item.node.description.childMarkdownRemark.html}
            photo={item.node.photo}
          />
        ))}
      </Carousel>
    )
  }
}

export default Slide

export const pagequery = graphql`
  query SportsQuery {
    allContentfulSports {
      edges {
        node {
          description {
            childMarkdownRemark {
              html
            }
          }
          photo {
            fluid(maxWidth: 350, maxHeight: 196, resizingBehavior: SCALE) {
              ...GatsbyContentfulFluid_tracedSVG
              src
            }
          }
        }
      }
    }
  }
`
