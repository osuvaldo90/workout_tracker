'use strict'

const { readFileSync } = require('fs')
const { join } = require('path')

const express = require('express')
const expressGraphql = require('express-graphql')
const { buildSchema } = require('graphql')

const rootValue = require('./graphql')
const schema = buildSchema(readFileSync(join(__dirname, './schema.gql')).toString())

const service = express()
const gqlConfig = { schema, rootValue, graphiql: true }

service.all('/', expressGraphql(gqlConfig))

service.listen(8080, () => {
  console.log('server listening on 8080')
})
