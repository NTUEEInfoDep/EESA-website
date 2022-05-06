import React from 'react'
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css'
import styles from './timeline3.module.css'
import StarIcon from '@mui/icons-material/Star'
import WorkIcon from '@mui/icons-material/Work'
import Img from 'gatsby-image'
// import { borderTop } from '@mui/system'

const TimeLineItem = ({ date, title, content, short, image }) => {
  return (
    <VerticalTimelineElement
      className="vertical-timeline-element--work"
      contentStyle={{
        borderTop: '3px solid rgb(33, 150, 243)',
        background: 'rgb(250, 250, 250)',
        color: 'gray',
        display: 'grid', 
        gridTemplateColumns: "75% 25%",
      }}
      contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
      date={date}
      dateClassName={styles.timelineDate}
      iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
      icon={<WorkIcon />}
    >
      <div>
        <h3 className="vertical-timeline-element-title">{title}</h3>
        <h4 className="vertical-timeline-element-subtitle">{short}</h4>
        <p>{content}</p>
      </div>
    
      <div>
        <Img fluid={image}></Img>
      </div>
    </VerticalTimelineElement>
  )
}

export default function TimeLine3({ data }) {
  return (
    <VerticalTimeline lineColor={'grey'} layout="1-column-left">
      {data.map((element) => (
        <TimeLineItem
          date={element.node.publishDate}
          title={element.node.title}
          content={element.node.description.content[0].content[0].value}
          short={element.node.slug}
          image={element.node.titleImage.fluid}
          key={element.node.title}
        />
      ))}
      <VerticalTimelineElement
        iconStyle={{ background: 'rgb(16, 204, 82)', color: '#fff' }}
        icon={<StarIcon />}
      />
    </VerticalTimeline>
  )
}
