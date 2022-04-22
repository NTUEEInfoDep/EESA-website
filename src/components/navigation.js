import React, { Component } from 'react'
import get from 'lodash/get'
import { graphql, Link } from 'gatsby'
import styles from './navigation.module.css'

export default class navigation extends Component {
  render() {
    const { nodes } = this.props.depinfo
    return (
      <nav role="navigation">
        <ul className={styles.navigation}>
          <li className={styles.navigationItem}>
            <Link to="/">Home</Link>
          </li>
          <li className={styles.navigationItem}>
            <Link to="/blog/">Blog</Link>
          </li>
          {nodes.map((node) => {
            const { name, contentful_id } = node
            return (
              <li className={styles.navigationItem}>
                <Link to={`/department/${name}`} state={{ contentful_id }}>
                  {name}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    )
  }
}
