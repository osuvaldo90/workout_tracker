import React, { createRef, useEffect, useState } from 'react';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import { Link, Redirect } from 'react-router-dom';

import { generate as shortid } from 'shortid';

import { getDay, saveNewDay } from './data';
import { Exercise } from './exercise';

export function EditDay ({ match }) {
  const [day, updateDay] = useState({ name: null, exercises: [] })
  const [saved, updateSaved] = useState(false)

  if (match.params.id) {
    useEffect(() => { getDay(match.params.id).then(updateDay) }, [])
  }

  function updateExercises (exercises) {
    const newDay = { ...day, exercises }
    updateDay(newDay)
  }

  function updateName (name) {
    const newDay = { ...day, name }
    updateDay(newDay)
  }

  function addExercise () {
    const newExercises = day.exercises.slice()
    newExercises.push({
      id: shortid(),
      name: null,
      sets: []
    })
    updateExercises(newExercises)
  }

  async function save (event) {
    event.preventDefault()

    const saved = await saveNewDay(day)

    updateSaved(saved)
  }

  function updateExercise (index, exercise) {
    const newExercises = day.exercises.slice()
    newExercises[index] = exercise
    updateExercises(newExercises)
  }

  function deleteExercise (index) {
    const newExercises = day.exercises.slice()
    newExercises.splice(index, 1)
    updateExercises(newExercises)
  }

  return (
    <React.Fragment>
      <Form onSubmit={save}>
        <Row>
          <Form.Group as={Col}>
            <Form.Control
              size="lg"
              name="name"
              type="text"
              placeholder="New Day"
              value={day.name}
              onChange={event => updateName(event.target.value)}
              required
            />
          </Form.Group>
        </Row>

        {day.exercises.map((e, index) => {
          return (
            <Exercise
              key={e.id}
              id={e.id}
              name={e.name}
              sets={e.sets}
              updateExercise={updateExercise.bind(null, index)}
              deleteExercise={deleteExercise.bind(null, index)}
              />
          )
        })}

        <Row>
          <Form.Group as={Col}>
            <Button block variant="outline-primary" onClick={addExercise}>Add Exercise</Button>
          </Form.Group>
        </Row>

        <Row>
          <Form.Group as={Col}>
            <Button block type="submit">Save</Button>
          </Form.Group>
          <Col>
            <Link to="/">
              <Button block variant="outline-danger">Cancel</Button>
            </Link>
          </Col>
        </Row>
      </Form>

      {saved && <Redirect to='/' />}
    </React.Fragment>
  )
}
