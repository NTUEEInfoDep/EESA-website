import React from 'react'
import { Table, Tag, TagGroup, Button, Panel, Drawer } from 'rsuite'
import { isMobile } from 'react-device-detect'
import { pageQuery } from '../pages/index.js'

const { Column, HeaderCell, Cell, Pagination } = Table

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
    }
    this.tagColor = {
      公告: 'blue',
      活動: 'green',
      部課: 'violet',
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

    return this.props.data.edges.filter((v, i) => {
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
    })
  }

  render() {
    const data = this.props.data
    return (
      <div>
        <div>
          <Panel bordered header={data.title}>
            <Table width={isMobile ? 320 : undefined} data={data.title}>
              <Column width={120}>
                <HeaderCell>{data.description[0]}</HeaderCell>
                <Cell dataKey="tags"></Cell>
              </Column>
              <Column width={120}>
                <HeaderCell>{data.description[1]}</HeaderCell>
                <Cell dataKey="tags"></Cell>
              </Column>
            </Table>
          </Panel>

          <Drawer size="lg" placement="right" show={true} onHide={this.close}>
            <Drawer.Body style={{ margin: '20px' }}>
              <div className="container blog-post">
                <div className="details">
                  <h1 className="title"></h1>
                  <span className="date">
                    <i className="fas fa-calendar-alt"></i>{' '}
                  </span>

                  <div dangerouslySetInnerHTML={{}}></div>
                </div>
              </div>
            </Drawer.Body>
            <Drawer.Footer>
              <Button size="lg" appearance="primary">
                View Full Post
              </Button>
            </Drawer.Footer>
          </Drawer>
        </div>
      </div>
    )
  }
}
