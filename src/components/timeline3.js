import React from 'react'
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css'
import * as styles from './timeline3.module.css'
import StarIcon from '@mui/icons-material/Star'
import WorkIcon from '@mui/icons-material/Work'

import Box from '@mui/material/Box';

const MonthName = [ "Month0", "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                    "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]

const TimeLineItem = ({ date, name, content }) => {
  return (
    <>
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
        <h4 className="vertical-timeline-element-subtitle">{content}</h4>
        <p>{content}</p>
      </VerticalTimelineElement>
    </>
  )
}

const MonthTag = ({ date, prevDate }) => {
  console.log("prevDateTime at monthtag");
  console.log(prevDate);
  const DateData = date.split('/');
  const prevDateData = prevDate.split('/');

  return (
    ((DateData[0] === prevDateData[0]) && (DateData[1] === prevDateData[1])) ? <></> :
    <>
      <Box
        sx={{
          width: 225,
          height: 60,
          borderRadius: 15,
          marginLeft: 5,
          backgroundColor: 'info.main',
          boxShadow: 2,
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
          fontSize: '20pt',
          fontWeight: 'bold',
          '&:hover': {
            backgroundColor: 'primary.main',
            opacity: [0.9, 0.9, 0.9],
          },
        }}
      > {MonthName[DateData[1]] + ', ' + DateData[0] } </Box>
    </>
  )
}

export default function TimeLine3({ data }) {
  console.log("DataTime at Timeline3 function");
  data.map((element) => {
    console.log(element.node.dateTime)
  })

  return (
    <VerticalTimeline lineColor={'grey'} layout="1-column-left">
      {data.map((element, index, array) => (
        <>
          <MonthTag date={element.node.dateTime} 
          prevDate={(index === 0)? "NULL" : array[index - 1].node.dateTime} key={index}/>
          <TimeLineItem
            date={element.node.dateTime}
            name={element.node.name}
            content={element.node.shortIntro}
            key={element.node.name}
          />
        </>
      ))}
      <VerticalTimelineElement
        iconStyle={{ background: 'rgb(16, 204, 82)', color: '#fff' }}
        icon={<StarIcon />}
      />
    </VerticalTimeline>
  )
}

// const TimeLineItem = ({ date, name, content }) => {
//   return (
//     <VerticalTimelineElement
//       className="vertical-timeline-element--work"
//       contentStyle={{
//         borderTop: '3px solid rgb(33, 150, 243)',
//         background: 'rgb(250, 250, 250)',
//         color: 'gray',
//       }}
//       contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
//       date={date}
//       dateClassName={styles.timelineDate}
//       iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
//       icon={<WorkIcon />}
//     >
//       <h3 className="vertical-timeline-element-title">{name}</h3>
//       <h4 className="vertical-timeline-element-subtitle">Subtitle</h4>
//       <p>{content}</p>
//     </VerticalTimelineElement>
//   )
// }

// export default function TimeLine3({ data }) {
//   return (
//     <VerticalTimeline lineColor={'grey'} layout="1-column-left">
//       {data.map((element) => (
//         <TimeLineItem
//           date={element.node.dateTime}
//           name={element.node.name}
//           content={element.node.shortIntro}
//           key={element.node.name}
//         />
//       ))}
//       <VerticalTimelineElement
//         iconStyle={{ background: 'rgb(16, 204, 82)', color: '#fff' }}
//         icon={<StarIcon />}
//       />
//     </VerticalTimeline>
//   )
// }
