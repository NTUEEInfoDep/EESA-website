import React from 'react'
import { useState } from 'react'
import { Timeline, Event } from './timeline'

export default function EventLine({ data }) {
  const [active, setActive] = useState(data[0].node.name)

  const handleClick = (name) => {
    setActive(name)
  }

  const TimeLineItem = ({ date, name, content }) => {
    return (
      <Event
        interval={date}
        subtitle={name}
        onClick={handleClick}
        active={name === active ? true : false}
      >
        {content}
      </Event>
    )
  }
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
