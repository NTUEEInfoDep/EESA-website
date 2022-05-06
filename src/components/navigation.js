import React, { Component } from 'react'
import get from 'lodash/get'
import { graphql, Link } from 'gatsby'
import * as styles from './navigation.module.css'

export default class navigation extends Component {
  render() {
    const { nodes } = this.props.depinfo
    return (
      <nav role="navigation">
        <ul className={styles.navigation}>
          <li className={styles.navigationItem}>
            <Link to="/">Home</Link>
          </li>
          {nodes.map((node) => {
            const { name, slug } = node
            return (
              <li className={styles.navigationItem}>
                <Link to={`/department/${slug}`}>{name}</Link>
              </li>
            )
          })}
        </ul>
      </nav>
    )
  }
}
