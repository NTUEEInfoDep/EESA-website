import React from 'react'
import { Link } from 'gatsby'
import styles from './navigation.module.css'

export default () => (
  <nav role="navigation">
    <ul className={styles.navigation}>
      <li className={styles.navigationItem}>
        <Link to="/">Home</Link>
      </li>
      <li className={styles.navigationItem}>
        <Link to="/blog/">Blog</Link>
      </li>
      <li className={styles.navigationItem}>
        <Link to="/department/資訊部">資訊部</Link>
      </li>
      <li className={styles.navigationItem}>
        <Link to="/department/學術部">學術部</Link>
      </li>
    </ul>
  </nav>
)
