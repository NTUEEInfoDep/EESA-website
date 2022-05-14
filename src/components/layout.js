import React from 'react'
import { Link } from 'gatsby'
import base from './base.css'
import Container from './container'
import Navigation from './navigation'

export default function Layout({ location, children, depinfo }) {
  let header

  let rootPath = `/`
  if (typeof __PREFIX_PATHS__ !== `undefined` && __PREFIX_PATHS__) {
    rootPath = __PATH_PREFIX__ + `/`
  }

  return (
    <Container>
      <Navigation depinfo={depinfo} />
      {children}
    </Container>
  )
}

// class Template extends React.Component {
//   render() {
//     const { location, children, depinfo } = this.props
//     let header

//     let rootPath = `/`
//     if (typeof __PREFIX_PATHS__ !== `undefined` && __PREFIX_PATHS__) {
//       rootPath = __PATH_PREFIX__ + `/`
//     }

//     return (
//       <Container>
//         <Navigation depinfo={depinfo} />
//         {children}
//       </Container>
//     )
//   }
// }

// export default Template
