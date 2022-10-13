import React from 'react'
import Container from './container'
import Navigation from './navigation'

export default function DepartmentLayout({ children }) {
  return (
    <Container>
      <Navigation />
      {children}
    </Container>
  )
}
