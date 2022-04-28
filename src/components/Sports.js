import React, { useState, useEffect, useRef } from 'react'
import styles from './Sports.module.css'
import Img from 'gatsby-image'
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react'
import { Navigation, Pagination, Autoplay } from 'swiper'
import 'swiper/swiper.min.css'
import 'swiper/modules/navigation/navigation.min.css'
import 'swiper/modules/pagination/pagination.min.css'
import 'swiper/modules/scrollbar/scrollbar.min.css'
import 'swiper/modules/autoplay/autoplay.min.css'
import 'swiper/modules/effect-cube/effect-cube.min.css'
import { Table, Column, HeaderCell, Cell } from 'rsuite-table'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActionArea from '@mui/material/CardActionArea'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { useFourThreeCardMediaStyles } from '@mui-treasury/styles/cardMedia/fourThree'
// react-spring
import clamp from 'lodash-es/clamp'
import { useSprings, animated } from '@react-spring/web'
import useMeasure from 'react-use-measure'
import { useDrag } from 'react-use-gesture'

function Sports({ honorRoll, informationBar }) {
  return (
    <>
      <HonorRoll honorRoll={honorRoll} />
      <InformationBar informationBar={informationBar} />
    </>
  )
}

function HonorRoll({ honorRoll }) {
  let honorRollArray = []
  for (let i = 0; i < honorRoll.length; i++) {
    honorRollArray.push(honorRoll[i].node.honorRoll.fluid)
  }
  return (
    <Swiper
      cssMode={true}
      navigation={true}
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000 }}
      modules={[Navigation, Pagination, Autoplay]}
      slidesPerView={1}
      className={styles.swiper}
    >
      {honorRollArray.map((i) => (
        <SwiperSlide className={styles.slide}>
          <Img
            alt={i}
            fluid={i}
            style={{
              width: '100%',
              height: '100%',
              float: 'center',
            }}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

// react-spring
/*  
function HonorRoll({ honorRoll }) {
  let honorRollArray = []
  for (let i = 0; i < honorRoll.length; i++) {
    honorRollArray.push(honorRoll[i].node.honorRoll.fluid)
  }

  const index = useRef(0)
  const [ref, { width }] = useMeasure()
  const [props, api] = useSprings(
    honorRollArray.length,
    (i) => ({
      x: i * width,
      scale: width === 0 ? 0 : 1,
      display: 'block',
    }),
    [width]
  )
  const bind = useDrag(
    ({ active, movement: [mx], direction: [xDir], distance, cancel }) => {
      if (active && distance > width / 2) {
        index.current = clamp(
          index.current + (xDir > 0 ? -1 : 1),
          0,
          honorRollArray.length - 1
        )
        cancel()
      }
      api.start((i) => {
        if (i < index.current - 1 || i > index.current + 1)
          return { display: 'none' }
        const x = (i - index.current) * width + (active ? mx : 0)
        const scale = active ? 1 - distance / width / 2 : 1
        return { x, scale, display: 'block' }
      })
    }
  )
  return (
    <div className={styles.container}>
      <div ref={ref} className={styles.wrapper}>
        {props.map(({ x, display, scale }, i) => (
          <animated.div
            className={styles.page}
            {...bind()}
            key={i}
            style={{ display, x }}
          >
            <animated.div style={{ scale }}>
              <Img
                alt="image"
                fluid={honorRollArray[i]}
                style={{
                  width: '100%',
                  height: '100%',
                  float: 'center',
                }}
              />
            </animated.div>
          </animated.div>
        ))}
      </div>
    </div>
  )
}
*/
function InformationBar({ informationBar }) {
  return (
    <Table height={400} data={informationBar}>
      <Column width={250} align="center">
        <HeaderCell>系隊名稱</HeaderCell>
        <Cell dataKey="name">{(rowData) => rowData.name}</Cell>
      </Column>
      <Column width={250} align="center">
        <HeaderCell>練習地點</HeaderCell>
        <Cell dataKey="practice time">{(rowData) => rowData.practiceTime}</Cell>
      </Column>
      <Column width={250} align="center">
        <HeaderCell>練習時間</HeaderCell>
        <Cell dataKey="practice place">
          {(rowData) => rowData.practicePlace}
        </Cell>
      </Column>
      <Column width={200} align="center" fixed>
        <HeaderCell>聯絡人</HeaderCell>
        <Cell dataKey="contact people">
          {(rowData) => rowData.contactPeople.map((i) => i.name)}
        </Cell>
      </Column>
    </Table>
  )
}

export default Sports
