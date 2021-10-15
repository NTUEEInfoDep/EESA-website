import React from 'react'
import Img from 'gatsby-image'

export default ({ data }) => (
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
          <tr>
            <td>{data.title}</td>
            <td>{data.departmentTag}</td>
            <td>{data.announcementTypeTag}</td>
            <td>{data.createdAt.split('T')[0]}</td>
            <td>{data.post.post}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
)
