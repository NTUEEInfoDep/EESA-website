import React, { Component } from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import styles from './department.module.css'
import Layout from '../layouts/department'
//  import LeaderCard from '../components/leadercard';

class department extends Component {
  render() {
    const depinfo = get(this.props, 'data.contentfulDepartment') //get current department name
    return (
      //  <Layout>
      <div style={{ background: '#fff' }}>
        <div className="wrapper">
          <h1 className="section-headline">{depinfo.name}</h1>
          <div
            dangerouslySetInnerHTML={{
              __html: depinfo.intro.childrenMarkdownRemark[0].html,
            }}
          />
          <div className="leader-container"></div>
        </div>
        <div className="special-requirements"></div>
        <div className="references">
          <a href={depinfo.references.reference}></a>
          <p>{depinfo.references.name}</p>
        </div>
      </div>
      //  </Layout>
    )
  }
}

export default department

export const pageQuery = graphql`
  query DepQuery {
    contentfulDepartment(name: { eq: "資訊部" }) {
      name
      intro {
        childrenMarkdownRemark {
          html
        }
      }
      references {
        name
        reference
      }
    }
  }
`
