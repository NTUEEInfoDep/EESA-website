import TimeLine3 from '../components/timeline3'
import Bulletin from '../components/Bulletin'

// A is the value of the Body of the Department Main Page on contentful
// A: [B, C]    =>  <C data={get(this, `props.data.allContentful${B}.edges`)} />

const FUNC_CONST = {
  Activity: ['Activity', TimeLine3], // <TimeLine data={get(this, 'props.data.allContentfulActivity.edges')} />
}

const CLASS_CONST = {
  Bulletin: ['BlogPosts', Bulletin], // <Bulletin data={get(this, 'props.data.allContentfulBlogPosts.edges')} />
}

export { FUNC_CONST, CLASS_CONST }
