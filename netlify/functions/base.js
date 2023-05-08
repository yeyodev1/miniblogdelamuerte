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

exports.handler = async function (evt) {
  const articles = await db('articles').select().all()

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({
      articles,
    }),
  }
}
