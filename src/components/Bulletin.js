import React from 'react'
import { Table, Tag, TagGroup, Button, Panel, Drawer, Dropdown } from 'rsuite'
import { isMobile } from 'react-device-detect'
import 'rsuite/dist/rsuite.min.css'
const { Column, HeaderCell, Cell } = Table
import { Pagination } from 'rsuite'

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
      filter_tag: ['緊急'],
      filter_department: [''],
    }
    this.tagColor = {
      重要: 'orange',
      緊急: 'red',
      公告: 'yellow',
      資訊部: 'cyan',
      系學會: 'blue',
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
    let datas = this.props.data.posts
    if (this.state.filter_tag !== '') {
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
    console.log(datas)
    const posts = this.getData(datas)
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
          <Dropdown title="種類" placement="downStart">
            <Dropdown.Item active={this.state.filter_tag.includes('公告')}>
              公告
            </Dropdown.Item>
            <Dropdown.Item active={this.state.filter_tag.includes('緊急')}>
              緊急
            </Dropdown.Item>
          </Dropdown>
          <Dropdown
            title="部門"
            placement="downStart"
            style={{ marginLeft: '5px' }}
          >
            <Dropdown.Item>資訊部</Dropdown.Item>
            <Dropdown.Item>系學會</Dropdown.Item>
          </Dropdown>
        </div>
      </div>
    )
    return (
      <div>
        <div>
          <Panel bordered header={header}>
            <Table
              width={isMobile ? 320 : undefined}
              data={posts}
              onRowClick={(rowData) => {
                this.toggleDrawer(rowData)
              }}
            >
              <Column width={120}>
                <HeaderCell>{data.description[0]}</HeaderCell>
                <Cell dataKey="tags">
                  {(rowData) => {
                    return (
                      <TagGroup>
                        {rowData.tag.map((item, idx) => {
                          return (
                            <Tag key={idx} color={this.tagColor[item]}>
                              {item}
                            </Tag>
                          )
                        })}
                        {rowData.departments.map((item, idx) => {
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
              <Column width={120}>
                <HeaderCell>{data.description[1]}</HeaderCell>
                <Cell dataKey="updatedAt">
                  {(date) => date.updatedAt.split('T')[0]}
                </Cell>
              </Column>
              <Column width={120}>
                <HeaderCell>{data.description[2]}</HeaderCell>
                <Cell dataKey="title"></Cell>
              </Column>
            </Table>
            <Pagination
              activePage={page}
              total={datas.length}
              limit={10}
              onChangePage={this.handleChangePage}
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
                  <h1>{drawerData.title}</h1>
                </Drawer.Title>
                <span className="date">
                  <i className="fas fa-calendar-alt"></i>{' '}
                </span>
                <Drawer.Actions>
                  <Button
                    size="lg"
                    appearance="primary"
                    href={`/post/${drawerData.slug}`}
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
                        __html: drawerData.body.childMarkdownRemark.html,
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
