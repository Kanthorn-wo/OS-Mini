import React from 'react'
import { useState, useEffect } from "react";
import { propTypes } from 'react-bootstrap/esm/Image';
import View from '../view';
let countProcess = 0;

const Controller = () => {

  const [clock, setClock] = useState(0)
  const [process, setProcess] = useState([])
  const [allProcess, setAllProcess] = useState(0)
  const [processTerminat, setProcessTerminat] = useState([])
  useEffect(() => {
    if (process.length !== 0) {
      process.map((item) => {
        if (item.execu_time < item.burst_time && item.burst_time !== 0) {
          item.status = "Running"
          item.execu_time++
          if (item.execu_time === item.burst_time) {
            item.status = "Terminate"
            const fill_Ter = process.filter((val) => {
              return val.status === "Terminate"
            })
            setProcessTerminat(fill_Ter)
          }
        }
      })
    }

    const id = setInterval(() => {
      setClock(clock + 1)
    }, 1000)
    return () => clearInterval(id)
  }, [clock])

  const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  const addProcess = () => {
    countProcess++;
    let pc = [...process]
    let random_bt = randomNumber(3, 20);
    pc.push({ process: countProcess, status: 'New', atival_time: clock, burst_time: random_bt, execu_time: 0, wait_time: 0, io_time: 0 })
    setAllProcess(countProcess)
    setProcess(pc)

  }

  const onClickReset = () => {
    setProcess([])
    setAllProcess(countProcess = 0)
    setClock(0)
    setProcessTerminat([])
  }

  const statusStyle = (value) => {
    if (value === 'New') {
      const color = {
        backgroundColor: '#146c43',
        color: 'white'
      }
      return color
    } else if (value === 'Running') {
      const color = {
        backgroundColor: '#0D6EFD',
        color: 'white',
      }
      return color
    } else if (value === 'Terminate') {
      const color = {
        backgroundColor: '#dc3545',
        color: 'white'
      }
      return color
    }
  }

  return (
    <>
      <View
        clock={clock}
        process={process}
        addProcess={addProcess}
        onClickReset={onClickReset}
        allProcess={allProcess}
        statusStyle={statusStyle}
        processTerminat={processTerminat}
      />
    </>
  )
}

export default Controller