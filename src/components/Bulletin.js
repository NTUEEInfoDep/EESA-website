import React, { useState, useEffect } from 'react'
import {
  Table,
  Tag,
  TagGroup,
  Button,
  Panel,
  Drawer,
  TagPicker,
  Input,
  InputGroup,
} from 'rsuite'

import SearchIcon from '@rsuite/icons/Search'
import SiteIcon from '@rsuite/icons/Site'
import CalenderIcon from '@rsuite/icons/Calendar'
import TagIcon from '@rsuite/icons/Tag'
import AttachmentIcon from '@rsuite/icons/Attachment'
import SpeakerIcon from '@rsuite/icons/Speaker'
import { isMobile } from 'react-device-detect'
import 'rsuite/dist/rsuite.min.css'
const { Column, HeaderCell, Cell } = Table
import { Pagination, IconButton } from 'rsuite'
import tags from './type.json'
import departments from './department.json'

let keyword = ''

export default function Bulletin({ data }) {
  const [page, setPage] = useState(1)
  const [displayLength, setDisplayLength] = useState(10)
  const [show, setShow] = useState(false)
  const [drawerData, setDrawerData] = useState(null)
  const [keyword, setKeyword] = useState('')
  const [filter_tag, setFilter_tag] = useState([])
  const [filter_department, setFilter_department] = useState([])
  const loading = false
  const placement = !isMobile ? 'right' : 'bottom'
  const size = 'sm'
  const limit = 10
  const tag = []
  const tagColor = {
    重要: 'orange',
    緊急: 'red',
    公告: 'yellow',
    活動: 'purple',
    資訊部: 'blue',
    系學會: 'blue',
    學術部: 'blue',
  }

  const handleChangePage = (dataKey) => {
    setPage(dataKey)
  }

  const handleChangeLimit = (dataKey) => {
    setPage(1)
    setDisplayLength(dataKey)
  }
  const getData = (datas) => {
    return datas.filter((v, i) => {
      const start = displayLength * (page - 1)
      const end = start + displayLength
      return i >= start && i < end
    })
  }
  const close = () => {
    setShow(false)
  }
  const toggleDrawer = (dataKey) => {
    setShow(true)
    setDrawerData(dataKey)
  }

  const getDiscription = (dataObj) => {
    let temp = ''
    dataObj.content.map((para) => {
      temp += para.content[0].value;
      temp += '</br>'
    })
    return temp
  }

  if (filter_tag.length > 0) {
    data = data.filter((item) => {
      const tmp = item.node.tag.filter((value) => filter_tag.includes(value))
      if (tmp.length > 0) {
        return true
      }
      return false
    })
  }
  if (filter_department.length > 0) {
    data = data.filter((item) => {
      const tmp = item.node.departments.filter((value) =>
        filter_department.includes(value)
      )
      if (tmp.length > 0) {
        return true
      }
      return false
    })
  }
  if (keyword !== '') {
    data = data.filter((item) => {
      return item.title.search(keyword) > -1
    })
  }
  const posts = getData(data)
  const header = (
    <div style={{ display: 'flex' }}>
      <h1>消息公告</h1>
      <div
        style={{
          marginTop: 'auto',
          marginLeft: 'auto',
        }}
      >
        <InputGroup style={{ width: 300, marginLeft: 'auto' }}>
          <Input
            onChange={(value) => (keyword = value)}
            placeholder={`Search`}
          />
          <InputGroup.Button
            onClick={(value) => {
              setKeyword(keyword)
            }}
          >
            <SearchIcon />
          </InputGroup.Button>
        </InputGroup>
        <TagPicker
          onSelect={(value) => {
            setFilter_tag(value)
          }}
          data={tags}
          style={{ width: 170, margin: '5px' }}
        />
        <TagPicker
          onSelect={(value) => {
            setFilter_department(value)
          }}
          data={departments}
          style={{ width: 170 }}
        />
      </div>
    </div>
  )

  return (
    <div>
      <div>
        <Panel bordered header={header}>
          <Table
            width={isMobile ? 320 : undefined}
            // height={300}
            autoHeight
            data={posts}
            onRowClick={(rowData) => {
              toggleDrawer(rowData)
            }}
          >
            <Column width={300}>
              <HeaderCell>
                <AttachmentIcon /> Title
              </HeaderCell>
              <Cell dataKey="title">
                {(rowData) => `【${rowData.node.title}】`}
              </Cell>
            </Column>
            <Column width={400}>
              <HeaderCell>
                <CalenderIcon /> Date
              </HeaderCell>
              <Cell dataKey="updatedAt">
                {(rowData) => rowData.node.publishDate}
              </Cell>
            </Column>
            <Column flexGrow={1}>
              <HeaderCell>
                <TagIcon /> Tags
              </HeaderCell>
              <Cell dataKey="tags">
                {(rowData) => {
                  return (
                    <TagGroup>
                      {rowData.node.tag.map((item, idx) => {
                        return (
                          <Tag key={idx} color={tagColor[item]}>
                            {item}
                          </Tag>
                        )
                      })}
                      {rowData.node.departments.map((item, idx) => {
                        return (
                          <Tag key={idx} color={tagColor[item]}>
                            {item}
                          </Tag>
                        )
                      })}
                    </TagGroup>
                  )
                }}
              </Cell>
            </Column>
          </Table>
          <div style={{ paddingTop: '20px', display: 'flex' }}>
            <Pagination
              // limit={10}
              limit={displayLength}
              limitOptions={[10, 20]}
              // lengthMenu={[
              //   {
              //     value: 10,
              //     label: 10,
              //   },
              //   {
              //     value: 20,
              //     label: 20,
              //   },
              // ]}
              prev
              last
              next
              first
              activePage={page}
              total={data.length}
              onChangePage={handleChangePage}
              onChangeLimit={handleChangeLimit}
            />
            <IconButton
              style={{
                marginTop: 'auto',
                marginLeft: 'auto',
              }}
              href="/post"
              icon={<SiteIcon />}
            >
              View all posts
            </IconButton>
          </div>
        </Panel>

        {drawerData ? (
          <Drawer size="sm" placement="right" open={show} onClose={close}>
            <Drawer.Header>
              <Drawer.Title className="title">
                <h1
                  style={{
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                  }}
                >{`【${drawerData.node.title}】`}</h1>
              </Drawer.Title>
              <span className="date">
                <i className="fas fa-calendar-alt"></i>{' '}
              </span>
              <Drawer.Actions>
                <IconButton
                  size="lg"
                  appearance="primary"
                  href={`/post/${drawerData.node.slug}`}
                  icon={<SiteIcon />}
                  style={{ marginTop: '1vh' }}
                  color="blue"
                >
                  View Full Post
                </IconButton>
              </Drawer.Actions>
            </Drawer.Header>
            <Drawer.Body style={{ margin: '0px', backgroundColor: '#212429' }}>
              <div className="container blog-post">
                <div className="details">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: getDiscription(JSON.parse(drawerData.node.description.raw))
                    }}
                    style={{ fontSize: '18px' }}
                  ></div>
                </div>
              </div>
            </Drawer.Body>
          </Drawer>
        ) : (
          ''
        )}
      </div>
    </div>
  )
}