import React from 'react'
import GetPropsUseState from './getPropsUseState';
import { useState } from "react";
const TestPassUseState = () => {

  const [state, setstate] = useState(0);
  return (
    <>
      <GetPropsUseState state={state} onChangSetState={setstate} />
    </>
  )
}

export default TestPassUseState