import React, { Fragment } from 'react'
import { Timeline, Event } from 'react-timeline-scribble'

const TimeLineItem = ({ date, name, content }) => {
  return (
      <Event interval={date} subtitle={name}>
        {content}
      </Event>
  )
}

export default function TimeLine2({ data }) {
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
