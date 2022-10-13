import React from 'react'
import { StaticQuery, graphql, Link } from 'gatsby'
import * as styles from './navigation.module.css'

export default function navigation() {
  return (
    <StaticQuery
      query={graphql`
        query {
          allContentfulDepartmentMainPage {
            nodes {
              name
              slug
            }
          }
        }
      `}
      render={(data) => (
        <nav role="navigation">
          <ul className={styles.navigation}>
            <li className={styles.navigationItem}>
              <Link to="/">Home</Link>
            </li>
            {data.allContentfulDepartmentMainPage.nodes.map((node) => {
              const { name, slug } = node
              return (
                <li className={styles.navigationItem} key={name}>
                  <Link to={`/department/${slug}`}>{name}</Link>
                </li>
              )
            })}
          </ul>
        </nav>
      )}
    />
  )

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
