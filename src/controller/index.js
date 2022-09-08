import React from 'react'
import { useState, useEffect } from "react";
import View from '../view';
let countProcessId = 0
let timeQuantum = 10
const Controller = (props) => {
  // const { clock, setClock, process, setProcess, allProcess, setAllProcess, processTerminat, setProcessTerminat } = props;

  const [clock, setClock] = useState(1)
  const [process, setProcess] = useState([])
  const [allProcess, setAllProcess] = useState(0)
  const [processTerminat, setProcessTerminat] = useState([])
  const [readyQueue, setReadyQueue] = useState([])
  console.log('readyQueue', readyQueue)
  console.log('processTerminat', processTerminat)
  useEffect(() => {

    if (process.length !== 0) {
      for (let i = 0; i < process.length; i++) {
        if (i === 0 && process[0].execu_time < timeQuantum && process[0].execu_time < process[0].burst_time) {
          process[0].status = "Running"
          process[0].execu_time++
          // console.log('process', process)
        }
        else if (i === 0 && process[0].execu_time === timeQuantum) {
          let ready_q = [...readyQueue]
          process[0].status = "Ready"
          ready_q.push(process[0])
          setReadyQueue(ready_q)
          // console.log('readyQueue', readyQueue, readyQueue.length)
          process.splice(0, 1)


        }
        else if (process[0].execu_time === process[0].burst_time) {
          let ter_q = [...processTerminat]
          process[0].status = "Terminate"
          ter_q.push(process[0])
          setProcessTerminat(ter_q)
          setAllProcess(process.length - 1)
          process.splice(0, 1)
          // console.log('processTerminat', processTerminat)
        }

        else if (i !== 0) {
          process[i].status = "Ready"
          process[i].wait_time++
        }
        else if (process.length === 0) {
          let pc = [...process]
          pc.push(...readyQueue)
          console.log('pc', pc)
        }
        // if (process[0].execu_time === process[0].burst_time) {
        //   let ter_q = [...processTerminat]
        //   process[0].status = "Terminate"
        //   ter_q.push(process[0])
        //   setProcessTerminat(ter_q)
        //   setAllProcess(process.length - 1)
        //   process.splice(0, 1)
        //   console.log('processTerminat', processTerminat)

        // }


      }

    }

  }, [clock])

  useEffect(() => {
    const id = setInterval(() => {
      setClock(prev => prev + 1)
    }, 1000)
    return () => clearInterval(id)
  }, [])

  const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }


  const addProcess = () => {
    countProcessId++
    let pc = [...process]
    let random_bt = randomNumber(7, 14);
    let random_ram = randomNumber(100, 600)

    pc.push({
      process: countProcessId,
      status: 'New',
      atival_time: clock,
      burst_time: random_bt,
      execu_time: 5,
      wait_time: 0,
      io_time: 0,
      ram: random_ram,

    })
    setAllProcess(process.length + 1)
    setProcess(pc)



  }

  const onClickReset = () => {
    setProcess([])
    setAllProcess(0)
    setClock(0)
    setProcessTerminat([])
    setReadyQueue([])
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
    } else if (value === 'Ready') {
      const color = {
        backgroundColor: '#FFC107',
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
        readyQueue={readyQueue}

      />
    </>
  )
}

export default Controller