import * as React from 'react'
import Timeline from '@mui/lab/Timeline'
import TimelineItem from '@mui/lab/TimelineItem'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent'
import TimelineDot from '@mui/lab/TimelineDot'
// import FastfoodIcon from '@mui/icons-material/Fastfood'
import LaptopMacIcon from '@mui/icons-material/LaptopMac'
// import HotelIcon from '@mui/icons-material/Hotel'
// import RepeatIcon from '@mui/icons-material/Repeat'
import Typography from '@mui/material/Typography'
// import { render } from 'react-dom'

const TimeLineItem = ({ date, name, content }) => {
  return (
    <TimelineItem>
      <TimelineOppositeContent
        sx={{ m: 'auto 0' }}
        align="right"
        variant="body2"
        color="text.secondary"
      >
        {date}
      </TimelineOppositeContent>
      <TimelineSeparator>
        <TimelineConnector />
        <TimelineDot color="primary">
          <LaptopMacIcon />
        </TimelineDot>
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent sx={{ py: '12px', px: 2 }}>
        <Typography variant="h6" component="span" color="gray">
          {name}
        </Typography>
        <Typography>{content}</Typography>
      </TimelineContent>
    </TimelineItem>
  )
}

export default function TimeLine({ data }) {
  return (
    <Timeline position="alternate">
      {data.map((element) => (
        <TimeLineItem
          date={element.node.dateTime}
          name={element.node.name}
          content={element.node.shortIntro}
          key={element.node.name}
        />
      ))}
    </Timeline>
  )
}
