import React from 'react'
import { BsPlusLg, BsArrowClockwise, } from "react-icons/bs";

const View = (props) => {

  const { clock, process, addProcess, allProcess, onClickReset, statusStyle, processTerminat } = props;

  return (
    <>

      <div className="container-fluid mt-4" >
        <div className="row">
          <div className="col-9">
            <div className="card overflow-auto" style={{ width: "100%", height: "450px" }}>
              <div className="card-header" style={{ display: 'flex', justifyContent: "space-between" }}>
                <h5><b>Round Robin</b></h5>
                <button type="button" className="btn btn-success " style={{ display: "flex", alignItems: "center", }} onClick={addProcess}><BsPlusLg style={{ marginRight: "2px", }} />Add Process</button>
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
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-3" >
            <div className="card" style={{ width: "100%", height: "450px" }}>
              <div className="card-header" style={{ display: 'flex', justifyContent: "space-between" }}>
                <h5><b>Controller</b></h5>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  {/* <button type="button" className="btn btn-primary " disabled={startButton == true} style={{ display: "flex", alignItems: "center", marginRight: "8px" }} onClick={onClickStart}><BsPlayFill style={{ marginRight: "2px", }} />Start</button> */}
                  <button type="button" className="btn btn-danger " disabled={allProcess == 0} style={{ display: "flex", alignItems: "center", }} onClick={onClickReset}><BsArrowClockwise style={{ marginRight: "2px", }} />Reset ชั่วคราวใช้ชั่วโครต</button>
                </div>
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


                    </tbody>
                  </table>
                </li>
              </ul>
            </div>
          </div>

        </div>
        <div className="row mt-4">
          <div className="col-3">
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
                        <th scope="col">Arival Time</th>
                        <th scope="col">Burst Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {process.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>Process:{item.process}</td>
                            <td>{item.atival_time}</td>
                            <td>{item.burst_time}</td>

                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-6">
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
                          </tr>
                        )

                      })}
                    </tbody>
                  </table>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-3">
            <div className='card overflow-auto' style={{ width: "100%", height: "420px" }}>
              <div className='card-header'>
                <h5><b>I/O Queue</b></h5>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <table className="table table-bordered text-center">
                    <thead>
                      <tr>
                        <th scope="col">Process</th>
                        <th scope="col">Status</th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>

                    </tbody>
                  </table>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>

    </>
  )
}

export default View