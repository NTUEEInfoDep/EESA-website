import React from 'react'
import { Table, Tag, TagGroup, Button, Panel, Drawer } from 'rsuite'
import { isMobile } from 'react-device-detect'
import { pageQuery } from '../pages/index.js'

const { Column, HeaderCell, Cell, Pagination } = Table

export default class Bulletin extends React.Component {
  render() {
    return (
      <div>
        <div>
          <div>
            <h2>消息公告</h2>
          </div>
          <Panel bordered>
            <Table width={isMobile ? 320 : undefined}>
              <Column width={120}>
                <HeaderCell>Tags</HeaderCell>
                <Cell dataKey="tags"></Cell>
              </Column>
              {!isMobile ? (
                <Column width={150}>
                  <HeaderCell>Date</HeaderCell>
                  <Cell dataKey="updatedAt" />
                </Column>
              ) : (
                ''
              )}

              <Column width={!isMobile ? 400 : 180}>
                <HeaderCell>Title</HeaderCell>
                <Cell dataKey="title" />
              </Column>
            </Table>
          </Panel>
        </div>
      </div>
    )
  }
}
