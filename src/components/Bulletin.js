import React from 'react'
import { Table, Tag, TagGroup, Button, Panel, Drawer } from 'rsuite'
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
  getData() {
    const { displayLength, page } = this.state
    return this.props.data.posts.filter((v, i) => {
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
    const posts = this.getData()
    const { loading, displayLength, page, size, placement, show, drawerData } =
      this.state
    const header = (
      <div style={{ display: 'flex' }}>
        <div>{data.title}</div>
        <div style={{ marginRight: 'auto' }}>
          <Button>Default</Button>
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
              total={data.posts.length}
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
