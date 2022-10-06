import React, { lazy } from 'react'
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
const View = (props) => {



  return (
    <>
      <Container fluid >
        <Row >
          <Col sm={9} className="mt-3">
            <Card style={{ height: 450 }} className="overflow-auto">
              <Card.Header style={{ display: "flex", justifyContent: "space-between" }}>
                <p>Round Robin</p>
                {props.ramTotal < 4096 - 500 ? <Button variant="success" onClick={props.addProcess}>Add Procrss</Button> : <Button variant="danger" disabled >Out Of Memory</Button>}

              </Card.Header>
              <Card.Body>
                <Table responsive bordered striped hover style={{ textAlign: "center" }}>
                  <thead className="table table-bordered table-striped">
                    <tr>
                      <th>ID</th>
                      <th>Status</th>
                      <th>Arival Time</th>
                      <th>Burst Time</th>
                      <th>Waiting Time</th>
                      <th>I/O Time</th>
                      <th>I/O WattingTime</th>
                      <th>Ram</th>
                      <th>Turn Around Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {props.process.map((item) => {
                      return (
                        <tr key={item.id}>
                          <td>{item.id}</td>
                          <td style={props.statusStyle(item.status)}>{item.status}</td>
                          <td>{item.arivaltime}</td>
                          <td>{item.bursttime}</td>
                          <td>{item.waittingtime}</td>
                          <td>{item.iotime}</td>
                          <td>{item.iowaittingtime}</td>
                          <td>{item.ram}</td>
                          <td>{item.turnaround}</td>

                        </tr>
                      )
                    })}

                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>

          <Col sm={3} className="mt-3" >
            <Card style={{ height: "100%" }} className="overflow-auto" >
              <Card.Header style={{ display: "flex", justifyContent: "space-between" }}>
                <p>Controller</p>
                {props.checkArr > 0 ? <Button variant="danger" onClick={props.onTerminate}>Terminate</Button> : <Button variant="danger" onClick={props.onTerminate} disabled>Terminate</Button>}

              </Card.Header>
              <Card.Body>
                <Table responsive bordered striped hover>
                  <thead className="table table-bordered table-striped">
                    <tr>
                      <td>CPU Time</td>
                      <td>{props.clock}</td>
                    </tr>

                    <tr>
                      <td>Process List</td>
                      <td>{props.checkProcessNoneTerminate}</td>
                    </tr>

                    <tr>
                      <td>Time Quantum</td>
                      <td>{props.timeQuantum}</td>
                    </tr>
                    <tr>
                      <td>Program Counter</td>
                      <td>{props.fillProcessRunning?.id}</td>
                    </tr>

                    <tr>
                      <td>Total Ram</td>
                      <td>{props.ramTotal} /4096 MB</td>
                    </tr>
                    <tr>
                      <td>AVG WaitingTime</td>
                      <td>{props.avgWaitTime.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td>AVG Turn Around Time</td>
                      <td>{props.avgTurnAround.toFixed(2)}</td>
                    </tr>
                  </thead>

                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row >
          <Col sm={9} className="mt-3">
            <Card style={{ height: 450 }} className="overflow-auto">
              <Card.Header>Ready

              </Card.Header>
              <Card.Body>
                <Table responsive bordered striped hover style={{ textAlign: "center" }}>
                  <thead className="table table-bordered table-striped">
                    <tr>
                      <th>ID</th>

                      <th>Arival Time</th>
                      <th>Burst Time</th>

                    </tr>
                  </thead>
                  <tbody>
                    {props.ready.map((item) => {
                      return (
                        <tr key={item.id}>
                          <td>{item.id}</td>
                          <td>{item.arivaltime}</td>
                          <td>{item.bursttime}</td>
                        </tr>
                      )
                    })}

                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>

          <Col sm={3} className="mt-3">
            <Card style={{ height: 450 }} className="overflow-auto">
              <Card.Header style={{ display: "flex", justifyContent: "space-between" }}>
                <p>IO</p>
                <Button variant="primary"
                  disabled={props.checkArr === 0}
                  onClick={props.requestIO}>Add IO
                </Button>
              </Card.Header>
              <Card.Body>
                <Table responsive bordered striped hover style={{ textAlign: "center" }}>
                  <thead className="table table-bordered table-striped">
                    <tr>
                      <th>ID</th>
                      <th>Status</th>

                    </tr>
                  </thead>
                  <tbody>
                    {props.io.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{item.id}</td>
                          <td>{item.status}</td>
                          <td>  <Button variant="danger" disabled={props.disIO(item.status)} onClick={props.closeIO} >Close</Button></td>

                        </tr>
                      )
                    })}

                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

    </>
  )
}

export default View