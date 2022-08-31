import React from 'react'
import { useState, useEffect } from "react";
import View from '../view';
let countProcessId = 0

const Controller = (props) => {
  // const { clock, setClock, process, setProcess, allProcess, setAllProcess, processTerminat, setProcessTerminat } = props;

  const [clock, setClock] = useState(1)
  const [process, setProcess] = useState([])
  const [allProcess, setAllProcess] = useState(0)
  const [processTerminat, setProcessTerminat] = useState([])




  useEffect(() => {

    if (process.length !== 0) {
      for (let i = 0; i < process.length; i++) {

        if (i === 0 && process[0].execu_time < process[0].burst_time) {

          process[0].status = "Running"
          process[0].execu_time++


        }
        else if (i !== 0) {

          process[i].status = "Ready"
          process[i].wait_time++
        } else if (process[0].execu_time === process[0].burst_time) {
          let ter_q = [...processTerminat]
          process[0].status = "Terminate"
          // const pt_tm = process.filter((item) => {
          //   return item.status === "Terminate"
          // })
          ter_q.push(process[0])

          setProcessTerminat(ter_q)
          setAllProcess(process.length - 1)
          process.splice(0, 1)


        }


      }


      // process.map((item) => {

      //   // if (item.execu_time === item.burst_time) {
      //   //   item.status = "Terminate"
      //   //   const fill_termi = process.filter((val) => {
      //   //     return (val.status === "Terminate")
      //   //   })
      //   //   setProcessTerminat(fill_termi)
      //   // }

      // })
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
    let random_bt = randomNumber(3, 10);
    let random_ram = randomNumber(100, 400)
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
    setAllProcess(process.length + 1)
    setProcess(pc)

  }

  const onClickReset = () => {
    setProcess([])
    setAllProcess(0)
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

      />
    </>
  )
}

export default Controller