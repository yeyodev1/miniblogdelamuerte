/* eslint-disable require-await */
/* eslint-disable no-console */
/* eslint-disable no-undef */
const Airtable = require('airtable')

const db = new Airtable({
  apiKey: process.env.AIRTABLE_TOKEN,
}).base(process.env.AIRTABLE_BASE_ID)

const headers = {
  /* Required for CORS support to work */
  'Access-Control-Allow-Origin': '*',
  /* Required for cookies, authorization headers with HTTPS */
  'Access-Control-Allow-Credentials': true,
}

const toJSON = (str) => {
  try {
    return JSON.parse(str)
  } catch (e) {
    return null
  }
}

exports.handler = async function (evt) {
  try {
    const { httpMethod } = evt
    const { article } = evt.queryStringParameters

    if (httpMethod !== 'POST') throw new Error('Invalid method')

    const body = toJSON(evt.body)

    await db('comments').create([
      {
        fields: {
          author: body?.name,
          'author-email': body?.email,
          content: body?.content,
          post: [article],
        },
      },
    ])

    return {
      statusCode: 200,
      headers,
    }
  } catch (e) {
    console.error(e)
    return {
      statusCode: 400,
      headers,
    }
  }
}
