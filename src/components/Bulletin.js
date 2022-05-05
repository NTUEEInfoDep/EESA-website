import React from 'react'
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
import { isMobile } from 'react-device-detect'
import 'rsuite/dist/rsuite.min.css'
const { Column, HeaderCell, Cell } = Table
import { Pagination } from 'rsuite'
import tags from './type.json'
import departments from './department.json'

let keyword = ''

export default class Bulletin extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // pagination
      displayLength: 10,
      loading: false,
      page: 1,
      // drawer
      placement: !isMobile ? 'right' : 'bottom',
      size: 'sm',
      show: false,
      limit: 10,
      filter_tag: [],
      filter_department: [],
      tag: [],
      keyword: '',
    }
    this.tagColor = {
      重要: 'orange',
      緊急: 'red',
      公告: 'yellow',
      活動: 'purple',
      資訊部: 'blue',
      系學會: 'blue',
      學術部: 'blue',
    }

    this.handleChangePage = this.handleChangePage.bind(this)
    this.handleChangeLength = this.handleChangeLength.bind(this)
    this.close = this.close.bind(this)
    this.toggleDrawer = this.toggleDrawer.bind(this)
  }
  handleChangePage(dataKey) {
    this.setState({
      page: dataKey,
    })
  }
  handleChangeLength(dataKey) {
    this.setState({
      page: 1,
      displayLength: dataKey,
    })
  }
  getData(datas) {
    const { displayLength, page } = this.state
    return datas.filter((v, i) => {
      const start = displayLength * (page - 1)
      const end = start + displayLength
      return i >= start && i < end
    })
  }
  close() {
    this.setState({
      show: false,
    })
  }
  toggleDrawer(dataKey) {
    this.setState({
      show: true,
      drawerData: dataKey,
    })
  }

  render() {
    const data = this.props.data
    if (this.state.filter_tag.length > 0) {
      datas = datas.filter((item) => {
        const tmp = item.tag.filter((value) =>
          this.state.filter_tag.includes(value)
        )
        if (tmp.length > 0) {
          return true
        }
        return false
      })
    }
    if (this.state.filter_department.length > 0) {
      data = data.filter((item) => {
        const tmp = item.departments.filter((value) =>
          this.state.filter_department.includes(value)
        )
        if (tmp.length > 0) {
          return true
        }
        return false
      })
    }
    if (this.state.keyword !== '') {
      data = data.filter((item) => {
        return item.title.search(this.state.keyword) > -1
      })
    }
    const posts = this.getData(data)
    const { loading, displayLength, page, size, placement, show, drawerData } =
      this.state
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
            <Input onChange={(value) => (keyword = value)} />
            <InputGroup.Button
              onClick={(value) => {
                this.setState({ keyword: keyword })
              }}
            >
              <SearchIcon />
            </InputGroup.Button>
          </InputGroup>
          <TagPicker
            onSelect={(value) => {
              this.setState({ filter_tag: value })
            }}
            data={tags}
            style={{ width: 170 }}
          />
          <TagPicker
            onSelect={(value) => {
              this.setState({ filter_department: value })
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
              height={300}
              data={posts}
              onRowClick={(rowData) => {
                this.toggleDrawer(rowData)
              }}
            >
              <Column width={400}>
                <HeaderCell>Tags</HeaderCell>
                <Cell dataKey="tags">
                  {(rowData) => {
                    return (
                      <TagGroup>
                        {rowData.node.tag.map((item, idx) => {
                          return (
                            <Tag key={idx} color={this.tagColor[item]}>
                              {item}
                            </Tag>
                          )
                        })}
                        {rowData.node.departments.map((item, idx) => {
                          return (
                            <Tag key={idx} color={this.tagColor[item]}>
                              {item}
                            </Tag>
                          )
                        })}
                      </TagGroup>
                    )
                  }}
                </Cell>
              </Column>
              <Column width={400}>
                <HeaderCell>Date</HeaderCell>
                <Cell dataKey="updatedAt">
                  {(rowData) => rowData.node.publishDate}
                </Cell>
              </Column>
              <Column width={400}>
                <HeaderCell>Title</HeaderCell>
                <Cell dataKey="title">{(rowData) => rowData.node.title}</Cell>
              </Column>
            </Table>
            <Pagination
              lengthMenu={[
                {
                  value: 10,
                  label: 10,
                },
                {
                  value: 20,
                  label: 20,
                },
              ]}
              prev
              last
              next
              first
              activePage={page}
              showInfo={!isMobile}
              showLengthMenu={!isMobile}
              displayLength={displayLength}
              total={data.length}
              limit={displayLength}
              onChangePage={this.handleChangePage}
              onChangeLength={this.handleChangeLength}
            />
          </Panel>
          {drawerData ? (
            <Drawer
              size="lg"
              placement="right"
              open={show}
              onClose={this.close}
            >
              <Drawer.Header>
                <Drawer.Title className="title">
                  <h1>{drawerData.node.title}</h1>
                </Drawer.Title>
                <span className="date">
                  <i className="fas fa-calendar-alt"></i>{' '}
                </span>
                <Drawer.Actions>
                  <Button
                    size="lg"
                    appearance="primary"
                    href={`/post/${drawerData.node.slug}`}
                  >
                    View Full Post
                  </Button>
                </Drawer.Actions>
              </Drawer.Header>
              <Drawer.Body style={{ margin: '20px' }}>
                <div className="container blog-post">
                  <div className="details">
                    <div
                      dangerouslySetInnerHTML={{
                        __html:
                          drawerData.node.description.content[0].content[0]
                            .value,
                      }}
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
}
