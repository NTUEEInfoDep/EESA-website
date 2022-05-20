import React from 'react'
import { graphql, Link } from 'gatsby'
import * as styles from './navigation.module.css'

export default function navigation({ depinfo }) {
  const { nodes } = depinfo
  return (
    <nav role="navigation">
      <ul className={styles.navigation}>
        <li className={styles.navigationItem}>
          <Link to="/">Home</Link>
        </li>
        {nodes.map((node) => {
          const { name, slug } = node
          return (
            <li className={styles.navigationItem} key={name}>
              <Link to={`/department/${slug}`}>{name}</Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
