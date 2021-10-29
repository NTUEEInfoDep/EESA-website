import React, { Component } from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import styles from './department.module.css'
import Layout from '../layouts/department'
//  import LeaderCard from '../components/leadercard';

class department extends Component {
  render() {
    const depinfo = get(
      this.props,
      'data.allContentfulDepartment.edges'
    ).filter((deps) => {
      return deps.node.name === this.props.location.state.depName
    })[0].node //get current department node
    //but kinda ugly, should be made prettier later
    return (
      //  <Layout>
      <div style={{ background: '#fff' }}>
        <div className="wrapper">
          <h1 className="section-headline">{depinfo.name}</h1>
          <div
            className={styles.intro}
            dangerouslySetInnerHTML={{
              __html: depinfo.intro.childMarkdownRemark.html,
            }}
          />
          <div className="leader-container">
            <p>部長</p>
            {depinfo.leaders.map((leader) => {
              return (
                <div className={styles.leadershort}>
                  <img
                    src={leader.leaderSelfie.file.url}
                    alt={leader.leaderName}
                  ></img>
                  <h3>{leader.leaderName}</h3>
                  <p>{leader.title}</p>
                  <div>
                    <a href={leader.leaderGithub}>github</a>
                    <br />
                    <a href={leader.leaderFacebook}>facebook</a>
                    <br />
                    <a href={leader.leaderEmail}>email</a>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div className="special-requirements"></div>
        <div className="references">
          {
            //TODO: add customize reference
          }
          <a href={depinfo.references.reference}>{depinfo.references.name}</a>
        </div>
      </div>
      //  </Layout>
    )
  }
}

export default department

export const pageQuery = graphql`
  query MyQuery {
    allContentfulDepartment {
      edges {
        node {
          name
          intro {
            childMarkdownRemark {
              html
            }
          }
          leaders {
            leaderEmail
            leaderFacebook
            leaderGithub
            leaderName
            title
            leaderSelfie {
              file {
                url
              }
            }
          }
          references {
            name
            reference
          }
        }
      }
    }
  }
`
