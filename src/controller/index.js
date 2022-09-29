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
  const [io, setIo] = useState([])
  const [ioProcess, setIoProcess] = useState(null);


  useEffect(() => {
    // loop jop q
    if (process.length !== 0) {
      let pc = process.filter((val) => val.status !== 'Terminate')
      if (io.length !== 0) {
        let io1 = [...io];
        for (let i = 0; i < io.length; i++) {
          if (i === 0) {
            let find_index = pc.findIndex((val) => val.process === io[i].process)
            console.log('pc', pc)
            io1[i].status = 'Running'
            pc[find_index].io_time++;
          } else {
            let find_index = pc.findIndex((val) => val.process === io[i].process)
            io1[i].status = 'Waiting'
            pc[find_index].io_wait++;
          }
        }
        setIo(io1)
        setIoProcess(io1[0].process)
      }

      //loop check timequantum
      for (let i = 0; i < timeQuantum; i++) {
        if (i === 0 && process[0].execu_time < process[0].burst_time && process[0].status !== "Waiting") {
          process[0].status = "Running"
          process[0].execu_time++
        } else {

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
      io_wait: 0,
      ram: random_ram,

    })
    setTimeout(() => {
      setAllProcess(process.length + 1)
      setProcess(pc)
    }, 100);


  }

  const requestIO = () => {
    let pc = [...process];
    let io_req = [...io];
    pc[0].status = "Waiting";
    io_req.push({ process: pc[0].process, status: "Running" });
    setIo(io_req);
    setProcess(pc);
  }


  const closeIO = () => {
    let pc = [...process];
    let io1 = io;
    let i = pc.findIndex((i) => i.process === io[0].process)
    pc[i].status = 'Ready';
    io1.shift()
    setIo(io1);
    setProcess(pc);
  }

  const closeProcess = (id) => {

    console.log('id', id)



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
    } else if (value === 'Waiting') {
      const color = {
        backgroundColor: '#6C757D',
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
        requestIO={requestIO}
        io={io}
        closeIO={closeIO}
        closeProcess={closeProcess}
      />
    </>
  )
}

export default Controller