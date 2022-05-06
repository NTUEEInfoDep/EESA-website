import React from 'react'
import Typography from '@mui/material/Typography'

class DepartmentComponentTitle extends React.Component {
  render() {
    const { title } = this.props
    console.log(this.props)

    return (
      <div className="wrapper">
        {/* <Typography component="div">
          <Box
            sx={{
              fontFamily: 'Monospace',
              fontSize: 'h6.fontSize',
              m: 1,
              color: 'black',
            }}
          >
            {title}
          </Box>
        </Typography> */}
        <Typography variant="h3" className="section-headline" color={'black'}>
          {title}
        </Typography>
      </div>
    )
  }
}

export default DepartmentComponentTitle
