import React from 'react'
import s from './style'

export const Timeline = ({ children }) => (
  <div className={s.container}>
    <ul className={s.timeline}>{children}</ul>
  </div>
)

export const Event = (props) => {
  const click = () => {
    props.onClick(props.subtitle)
  }

  return (
    <li className={s.event}>
      <button
        onClick={click}
        style={{ backgroundColor: 'transparent', width: '25%' }}
      >
        <label
          className={s.icon}
          style={{
            backgroundColor: props.active ? 'red' : 'black',
            borderColor: props.active ? 'white' : 'black',
            outline: props.active ? '3px solid red' : '3px solid black',
          }}
        />
        <div className={s.body}>
          <p className={s.date}>{props.interval}</p>
          <h3>{props.title}</h3>
          {props.subtitle && <h4>{props.subtitle}</h4>}
          <div className={s.description}>{props.children}</div>
        </div>
      </button>
    </li>
  )
}
