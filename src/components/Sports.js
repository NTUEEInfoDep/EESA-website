import React, { useEffect, useState } from 'react'
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
import Typography from '@mui/material/Typography'
import Popover from '@mui/material/Popover'

function Sports({ honorRoll, informationBar }) {
  return (
    <>
      <HonorRoll honorRoll={honorRoll} />
      <div className={styles.infoContainer}>
        <InformationBar informationBar={informationBar} />
      </div>
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

function InformationBar({ informationBar }) {
  const [anchorEl, setAnchorEl] = useState(null)
  const [rowInfo, setRowInfo] = useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = anchorEl ? true : false
  const id = open ? 'simple-popover' : undefined

  return (
    <>
      <Table
        height={400}
        data={informationBar}
        onRowClick={(rowData) => setRowInfo(rowData)}
      >
        <Column width={280} align="center">
          <HeaderCell>系隊名稱</HeaderCell>
          <Cell dataKey="name">{(rowData) => rowData.node.name}</Cell>
        </Column>
        <Column width={280} align="center">
          <HeaderCell>練習地點</HeaderCell>
          <Cell dataKey="practice time">
            {(rowData) => rowData.node.practiceTime}
          </Cell>
        </Column>
        <Column width={280} align="center">
          <HeaderCell>練習時間</HeaderCell>
          <Cell dataKey="practice place">
            {(rowData) => rowData.node.practicePlace}
          </Cell>
        </Column>
        <Column
          width={280}
          align="center"
          onClick={(e) => {
            handleClick(e)
          }}
        >
          <HeaderCell>聯絡人</HeaderCell>
          <Cell dataKey="contact people">
            {(rowData) =>
              `${rowData.node.contactPeople1.leaderName}　${rowData.node.contactPeople2.leaderName}`
            }
          </Cell>
        </Column>
      </Table>
      <Popover
        id="simple-popover"
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <Typography>
          {console.log('rowInfo: ', rowInfo)}
          {rowInfo && rowInfo.node.contactPeople1
            ? `${rowInfo.node.contactPeople1.leaderName}　email:${rowInfo.node.contactPeople1.leaderEmail}`
            : 'no contact people'}
          {rowInfo && rowInfo.node.contactPeople2
            ? `${rowInfo.node.contactPeople2.leaderName}　email:${rowInfo.node.contactPeople2.leaderEmail}`
            : 'no contact people'}
        </Typography>
      </Popover>
    </>
  )
}

export default Sports
