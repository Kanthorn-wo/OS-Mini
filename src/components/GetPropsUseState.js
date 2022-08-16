import React from 'react'

const GetPropsUseState = ({ state, onChangSetState }) => {

  const increment = () => {
    onChangSetState(state + 1)
  }

  const decrement = () => {
    onChangSetState(state - 1)
  }
  return (
    <>
      <button onClick={increment}>บวก</button>
      <button onClick={decrement}>ลบ</button>
      <div><h1>{state}</h1></div>
    </>

  )
}

export default GetPropsUseState