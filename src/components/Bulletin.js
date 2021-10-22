import React from 'react'
import { Table, Tag, TagGroup, Button, Panel, Drawer } from 'rsuite';
import { isMobile } from "react-device-detect";

const { Column, HeaderCell, Cell, Pagination } = Table;

export default () => (
  <div>
    <div>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>departmentTag</th>
            <th>announcement type tag</th>
            <th>create time</th>
            <th>post</th>
          </tr>
        </thead>
        <tbody>
          
        </tbody>
      </table>
    </div>
  </div>
)
