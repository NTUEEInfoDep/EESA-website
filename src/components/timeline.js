import React from 'react'
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css'
import * as styles from './timeline.module.css'
import StarIcon from '@mui/icons-material/Star'
import WorkIcon from '@mui/icons-material/Work'
import Img from 'gatsby-image'
import { Button } from 'rsuite'

const TimeLineItem = ({ date, title, content, slug, image }) => {
  return (
    <VerticalTimelineElement
      className="vertical-timeline-element--work"
      contentStyle={{
        borderTop: '3px solid rgb(33, 150, 243)',
        background: 'rgb(250, 250, 250)',
        color: 'gray',
        display: 'grid',
        gridTemplateColumns: '75% 25%',
      }}
      contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
      date={date}
      dateClassName={styles.timelineDate}
      iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
      icon={<WorkIcon />}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateRows: '90% 10%',
          marginBottom: '10px',
        }}
      >
        <div>
          <h3 className="vertical-timeline-element-title">{title}</h3>
          {/* <h4 className="vertical-timeline-element-subtitle">{slug}</h4> */}
          <p style={{ paddingRight: '7%' }}>{content}</p>
        </div>
        <div>
          <Button
            size="sm"
            appearance="ghost"
            color="green"
            href={`/post/${slug}`}
          >
            View Details
          </Button>
        </div>
      </div>

      <div>
        <Img fluid={image} style={{ top: '10%' }}></Img>
      </div>
    </VerticalTimelineElement>
  )
}

export default function TimeLine3({ data }) {
  return (
    <VerticalTimeline lineColor={'grey'} layout="1-column-left">
      {data.map((element) => {
        const e = element.node
        const match = element.node.tag.indexOf('重要') > -1
        if (!e || !match) return
        return (
          <TimeLineItem
            date={e.publishDate}
            title={e.title}
            content={
              e.description.content
                ? e.description.content[0].content[0].value
                : ''
            }
            slug={e.slug}
            image={e.titleImage.fluid}
            key={e.title}
          />
        )
      })}
      <VerticalTimelineElement
        iconStyle={{ background: 'rgb(16, 204, 82)', color: '#fff' }}
        icon={<StarIcon />}
      />
    </VerticalTimeline>
  )
}
