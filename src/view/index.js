import React from 'react'
import { BsPlusLg, BsArrowClockwise, } from "react-icons/bs";
import GetPropsUseState from '../components/GetPropsUseState';

const View = (props) => {

  const { clock, process, addProcess, allProcess, onClickReset, statusStyle, processTerminat, readyQueue, addIO, io } = props;
  const total_ram = process.reduce((val, e) => val + e.ram, 0)

  return (
    <>

      <div className="container-fluid mt-4" >
        <div className="row">
          <div className="col-10">
            <div className="card overflow-auto" style={{ width: "100%", height: "450px" }}>
              <div className="card-header" style={{ display: 'flex', justifyContent: "space-between" }}>
                <h5><b>Round Robin</b></h5>
                {total_ram < 3800
                  ? <button type="button" className="btn btn-success " style={{ display: "flex", alignItems: "center", }} onClick={addProcess}><BsPlusLg style={{ marginRight: "2px", }} />Add Process</button>
                  : <button type="button" className="btn btn-danger " style={{ display: "flex", alignItems: "center", }} disabled>Out of memory</button>}
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <table className="table table-bordered text-center">
                    <thead>
                      <tr>
                        <th scope="col">Process:ID</th>
                        <th scope="col">Status</th>
                        <th scope="col">Arival Time</th>
                        <th scope="col">Burst Time</th>
                        <th scope="col">Execution Time</th>
                        <th scope="col">Waiting Time</th>
                        <th scope="col">I/O Time</th>
                        <th scope="col">RAM</th>

                      </tr>
                    </thead>
                    <tbody>
                      {process.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>Process:{item.process}</td>
                            <td style={statusStyle(item.status)}>{item.status}</td>

                            <td>{item.atival_time}</td>
                            <td>{item.burst_time}</td>
                            <td>{item.execu_time}</td>
                            <td>{item.wait_time}</td>
                            <td>{item.io_time}</td>
                            <td>{item.ram} / MB</td>


                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-2" >
            <div className="card card overflow-auto" style={{ height: "450px" }}>
              <div className="card-header" style={{ display: 'flex', justifyContent: "space-between" }}>
                <h5><b>Controller</b></h5>

                {/* <button type="button" className="btn btn-primary " disabled={startButton == true} style={{ display: "flex", alignItems: "center", marginRight: "8px" }} onClick={onClickStart}><BsPlayFill style={{ marginRight: "2px", }} />Start</button> */}
                <button type="button" className="btn btn-danger " onClick={onClickReset}>Reset</button>

              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <table className="table table-bordered ">
                    <thead>
                      <tr>
                        <th scope="col">CPU Time/sec</th>
                        <td scope="col">{clock} </td>
                      </tr>

                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">Time Quantum</th>
                        <td scope="col">10</td>
                      </tr>
                      <tr>
                        <th scope="row">Process</th>
                        <td>{allProcess}</td>
                      </tr>
                      <tr>
                        <th scope="row">Total RAM

                        </th>
                        {total_ram > 3800 ? <td style={{ color: "red" }}>{total_ram} / 4096 MB </td> : <td>{total_ram} / 4096 MB </td>}

                      </tr>


                    </tbody>
                  </table>
                </li>
              </ul>
            </div>
          </div>

        </div>
        <div className="row mt-4">
          <div className="col-5">
            <div className='card overflow-auto' style={{ width: "100%", height: "420px" }}>
              <div className='card-header'>
                <h5><b>Ready Queue</b></h5>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <table className="table table-bordered text-center">
                    <thead>
                      <tr>
                        <th scope="col">Process</th>
                        <th scope="col">Status</th>
                        <th scope="col">Arival Time</th>
                        <th scope="col">Burst Time</th>
                        <th scope="col">Execution Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {readyQueue.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>Process:{item.process}</td>
                            <td style={statusStyle(item.status)}>{item.status}</td>
                            <td>{item.atival_time}</td>
                            <td>{item.burst_time}</td>
                            <td>{item.execu_time}</td>

                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-5">
            <div className='card overflow-auto' style={{ width: "100%", height: "420px" }}>
              <div className='card-header'>
                <h5><b>Terminate</b></h5>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <table className="table table-bordered text-center">
                    <thead>
                      <tr>
                        <th scope="col">Process</th>
                        <th scope="col">Status</th>
                        <th scope="col">Arival Time</th>
                        <th scope="col">Burst Time</th>
                        <th scope="col">Execution Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {processTerminat.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>Process:{item.process}</td>
                            <td style={statusStyle(item.status)}>{item.status}</td>
                            <td>{item.atival_time}</td>
                            <td>{item.burst_time}</td>
                            <td>{item.execu_time}</td>
                          </tr>
                        )

                      })}
                    </tbody>
                  </table>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-2">
            <div className='card overflow-auto' style={{ width: "100%", height: "420px" }}>
              <div className='card-header'>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <h5><b>I/O Queue</b></h5>
                  <button type="button" className="btn btn-primary" onClick={addIO}>Add/IO</button>
                </div>

              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <table className="table table-bordered text-center">
                    <thead>
                      <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Status</th>

                      </tr>
                    </thead>
                    <tbody>
                      {io.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>{item.id}</td>
                            <td style={statusStyle(item.status)}><button type="button" className="btn btn-danger" >Close</button></td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12">


          </div>
        </div>
      </div>

    </>
  )
}

export default View