import React from 'react'
import ReactDOM from 'react-dom'

import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container';

import { BrowserRouter as Router, Route } from "react-router-dom";

import { NewDay } from './new-day'
import { Routine } from './routine'
import './index.css'

function App () {
  return (
    <main>
      <Container className="mainContainer">
        <Col md="6">
          <Router>
            <Route exact path="/" component={Routine} />
            <Route path="/new-day" component={NewDay}/>
          </Router>
        </Col>
      </Container>
    </main>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
