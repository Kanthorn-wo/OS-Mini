import React from 'react'
import { useState, useEffect } from "react";
import View from '../view';
let countProcessId = 0
let countIo = 0
let timeQuantum = 10
const Controller = (props) => {
  // const { clock, setClock, process, setProcess, allProcess, setAllProcess, processTerminat, setProcessTerminat } = props;

  const [clock, setClock] = useState(1)
  const [process, setProcess] = useState([])
  const [allProcess, setAllProcess] = useState(0)
  const [processTerminat, setProcessTerminat] = useState([])
  const [readyQueue, setReadyQueue] = useState([])
  const [io, setIo] = useState([])

  console.log('process', process)

  useEffect(() => {
    // loop jop q
    if (process.length !== 0) {
      //loop check timequantum
      for (let i = 0; i < timeQuantum; i++) {
        if (i === 0 && process[0].execu_time < process[0].burst_time) {
          process[0].status = "Running"
          process[0].execu_time++
        }
      }
      //loop condition checkout jop q to ready q
      for (let i = 0; i < process.length; i++) {
        if (i === 0 && process[0].execu_time === timeQuantum && process[0].status === "Running") {
          let ready_q = [...readyQueue]
          process[0].status = "Ready"
          setTimeout(() => {
            ready_q.push(process[0])
            setReadyQueue(ready_q)
            process.splice(0, 1)
          }, 500);

        }
        // set status ready besides arr[0] 
        else if (i !== 0) {
          process[i].status = "Ready"
          process[i].wait_time++
        }

        // set terminat q
        else if (process[0].execu_time === process[0].burst_time) {
          let ter_q = [...processTerminat]
          process[0].status = "Terminate"
          ter_q.push(process[0])
          setTimeout(() => {
            setProcessTerminat(ter_q)
            setAllProcess(process.length - 1)
            process.splice(0, 1)
          }, 500);

        }


      }

    }
    // revers ready q to job q
    else {
      setProcess(readyQueue)
      setReadyQueue([])
    }

  }, [clock])

  //func cpu time
  useEffect(() => {
    const id = setInterval(() => {
      setClock(prev => prev + 1)
    }, 1000)
    return () => clearInterval(id)
  }, [])

  // func random math
  const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  // func add process to job q
  const addProcess = () => {

    countProcessId++
    let pc = [...process]
    let random_bt = randomNumber(7, 20);
    let random_ram = randomNumber(100, 600)

    pc.push({
      process: countProcessId,
      status: 'New',
      atival_time: clock,
      burst_time: random_bt,
      execu_time: 0,
      wait_time: 0,
      io_time: 0,
      ram: random_ram,

    })
    setTimeout(() => {
      setAllProcess(process.length + 1)
      setProcess(pc)
    }, 100);


  }

  const addIO = () => {
    countIo++
    let addio = [...io]
    addio.push({
      id: countIo,
      status: 'New',
    })
    setIo(addio)
  }

  const onClickReset = () => {
    setProcess([])
    setAllProcess(0)
    setClock(0)
    setProcessTerminat([])
    setReadyQueue([])
    setIo([])
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
        addIO={addIO}
        io={io}
      />
    </>
  )
}

export default Controller