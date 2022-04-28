import { graphql } from 'gatsby'
import React from 'react'
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
import { style } from '@mui/system'

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
      effect={'cube'}
      cssMode={true}
      navigation={true}
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000 }}
      modules={[Navigation, Pagination, Autoplay]}
      slidesPerView={1}
      className={style.swiper}
    >
      {honorRollArray.map((i) => (
        <SwiperSlide className={styles.slide}>
          <Img
            alt={i}
            fluid={i}
            style={{
              width: '30%',
              height: '40%',
              float: 'center',
            }}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

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
