import React from 'react'
import Typography from '@mui/material/Typography'

export default function DepartmentComponentTitle({ title }) {
  return (
    <div className="wrapper">
      <Typography variant="h3" className="section-headline" color={'black'}>
        {title}
      </Typography>
    </div>
  )
}
