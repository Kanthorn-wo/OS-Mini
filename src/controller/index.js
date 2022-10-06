import React from 'react'
import { useState, useEffect } from "react";
import { SplitButton } from 'react-bootstrap';
import View from '../view';
let timeQuantum = 5
let index = 0, count = 1

const Controller = () => {

  const [processList, setProcessList] = useState([]);
  const [io, setIo] = useState([])
  const [clock, setClock] = useState(1);
  const [ready, setReady] = useState([])
  const [terminate, setTerminate] = useState([])
  useEffect(() => {
    const id = setInterval(() => {
      setClock(prev => prev + 1)

    }, 1000)
    return () => clearInterval(id)

  }, [])

  let checkarr = processList.length

  useEffect(() => {
    setProcessList(prev => {
      let oldValue = [...prev]
      for (let i = 0; i < oldValue.length; i++) {
        if (oldValue[i]?.status == 'New') {
          oldValue[i].status = 'Ready'
        }
      }
      return oldValue

    })
    if (processList.length !== 0) {
      let p = [...processList]
      // let next = 0
      if (p.length !== 0) {
        if (index == p.length) {
          index = 0
        }
        if (p[index].checkter === true) {
          p[index].status = "Terminate"
          p[index].turnaround = p[index].bursttime - p[index].arivaltime
          if (index < processList.length) {
            index += 1
            count = 1
          }
        } else if (p[index].status === "Waiting") {
          // p[index].iotime++
          count = 1
          index += 1
        } else {
          if (count <= timeQuantum) {
            p[index].status = "Running"
            p[index].bursttime++
            count++
          } else {
            p[index].status = "Ready"
            count = 1
            index += 1
            // next++
          }
        }
        for (let i = 0; i < p.length; i++) {
          if (p[i].status === "Ready") {
            p[i].waittingtime++
          }
        }
        console.log('index', index)
      }

      if (io.length !== 0) {
        let io1 = [...io];
        for (let i = 0; i < io.length; i++) {
          if (i === 0) {
            let find_index = processList.findIndex((val) => val.id === io[i].id)
            io1[i].status = 'Running'
            processList[find_index].iotime++;
          } else {
            let find_index = processList.findIndex((val) => val.id === io[i].id)
            io1[i].status = 'Waiting'
            processList[find_index].iowaittingtime++;
          }
        }
        setIo(io1)

      }


      let ready = processList.filter((i) => i.status === 'Ready')
      setReady(ready)
    }
  }, [clock])

  let waitTime = processList.reduce((i, val) => i + val.waittingtime, 0)
  let avgWaitTime = waitTime / checkarr
  let turnAround = processList.reduce((i, val) => i + val.turnaround, 0)
  let avgTurnAround = turnAround / checkarr
  let ramTotal = processList.reduce((i, val) => i + val.ram, 0)
  const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  const addProcess = () => {

    setProcessList((prve) => {
      let oldValue = [...prve]
      oldValue.push({
        id: oldValue.length + 1,
        status: "New",
        arivaltime: clock,
        bursttime: 0,
        excutiontime: 0,
        waittingtime: 0,
        iotime: 0,
        iowaittingtime: 0,
        ram: randomNumber(100, 500),
        turnaround: 0,
        checkter: null
      })

      return oldValue
    })


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
        backgroundColor: '#FFB7B7',
        color: 'white',
      }
      return color
    }
  }

  const requestIO = () => {
    let pc = [...processList]
    let ioreq = [...io];
    pc[index].status = "Waiting";
    ioreq.push({ id: processList[index].id, status: "Running" });
    setIo(ioreq);
    setProcessList(pc);
  }

  const closeIO = () => {
    let p = [...processList];
    let io1 = io;
    let i = p.findIndex((i) => i.id === io[0].id)
    p[i].status = 'Ready';
    io1.shift()
    setIo(io1);
    setProcessList(p);
  }
  const disIO = (status) => {
    if (status === 'Running')
      return false;
    else
      return true;
  }
  const onTerminate = () => {
    let p = [...processList]
    let findTerminate = p.find((i) => i.status === "Running")
    findTerminate.checkter = true


  }

  return (
    <>
      <View
        process={processList}
        addProcess={addProcess}
        clock={clock}
        statusStyle={statusStyle}
        ready={ready}
        terminate={terminate}
        timeQuantum={timeQuantum}
        io={io}
        requestIO={requestIO}
        checkarr={checkarr}
        closeIO={closeIO}
        disIO={disIO}
        avgWaitTime={avgWaitTime}
        avgTurnAround={avgTurnAround}
        ramTotal={ramTotal}
        onTerminate={onTerminate}
      />
    </>
  )
}

export default Controller