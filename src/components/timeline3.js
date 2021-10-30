import React from 'react'
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css'
import styles from './timeline3.module.css'
import StarIcon from '@mui/icons-material/Star'
import WorkIcon from '@mui/icons-material/Work'
// import { borderTop } from '@mui/system'

const TimeLineItem = ({ date, name, content }) => {
  return (
    <VerticalTimelineElement
      className="vertical-timeline-element--work"
      contentStyle={{
        borderTop: '3px solid rgb(33, 150, 243)',
        background: 'rgb(250, 250, 250)',
        color: 'gray',
      }}
      contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
      date={date}
      dateClassName={styles.timelineDate}
      iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
      icon={<WorkIcon />}
    >
      <h3 className="vertical-timeline-element-title">{name}</h3>
      <h4 className="vertical-timeline-element-subtitle">Subtitle</h4>
      <p>{content}</p>
    </VerticalTimelineElement>
  )
}

export default function TimeLine3({ data }) {
  return (
    <VerticalTimeline lineColor={'grey'} layout="1-column-left">
      {data.map((element) => (
        <TimeLineItem
          date={element.node.dateTime}
          name={element.node.name}
          content={element.node.shortIntro}
          key={element.node.name}
        />
      ))}
      <VerticalTimelineElement
        iconStyle={{ background: 'rgb(16, 204, 82)', color: '#fff' }}
        icon={<StarIcon />}
      />
    </VerticalTimeline>
  )
}
