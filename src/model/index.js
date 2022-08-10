import React from 'react'

const Model = (props) => {
  console.log('props', props)
  return (
    <div>Model Page
      {props.text}

    </div>
  )
}

export default Model