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

exports.handler = async function (evt) {
  try {
    const { slug } = evt.queryStringParameters

    let article = (
      await db('articles')
        .select({
          maxRecords: 1,
          fields: [
            'slug',
            'cover',
            'title',
            'description',
            'content',
            'author-name',
            'updated',
            'total-comments',
            'comments',
          ],
          filterByFormula: `AND({slug} = '${slug}',{publish} = TRUE())`,
        })
        .all()
    ).map((a) => ({
      _id: a.id,
      ...a.fields,
    }))

    let comments = []

    if (article.length) {
      article = article[0]

      if (Array.isArray(article?.comments)) {
        comments = article.comments.map((c) => `RECORD_ID()='${c}'`)
        comments = (
          await db('comments')
            .select({
              fields: ['author', 'author-email', 'content', 'created'],
              filterByFormula: `OR(${comments})`,
              sort: [{ field: 'created' }],
            })
            .all()
        ).map((a) => ({
          _id: a.id,
          ...a.fields,
        }))
      }
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        article,
        comments,
      }),
    }
  } catch (e) {
    console.error(e)
    return {
      statusCode: 400,
      headers,
    }
  }
}
