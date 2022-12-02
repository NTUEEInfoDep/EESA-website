import TimeLine from '../components/timeline'
import Bulletin from '../components/Bulletin'
import DepartmentLayout from '../components/departmentLayout'
import departmentTimeline from '../components/DepartmentTimeline'

// A is the value of the Body of the Department Main Page on contentful
// A: [B, C, D]    =>  <C data={get(this, `props.data.allContentful${B}.edges`)} />
// D is the title of the component. If not want to use it, keep it an empty string('')

const MODULE_LIST = {
  Activity: ['Activity', departmentTimeline, ''], // <TimeLine data={get(this, 'props.data.allContentfulActivity.edges')} />
  Bulletin: ['BlogPosts', Bulletin, 'Bulletin'], // <Bulletin data={get(this, 'props.data.allContentfulBlogPosts.edges')} />
}

export { MODULE_LIST }
