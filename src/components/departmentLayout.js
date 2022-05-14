import React from 'react'
import Container from './container'
import Navigation from './navigation'

export default function DepartmentLayout({ children, depinfo }) {
  return (
    <Container>
      <Navigation depinfo={depinfo} />
      {children}
    </Container>
  )
}

// class DepartmentLayout extends React.Component {
//   render() {
//     const { children, depinfo } = this.props

//     return (
//       <Container>
//         <Navigation depinfo={depinfo} />
//         {children}
//       </Container>
//     )
//   }
// }

// export default DepartmentLayout
