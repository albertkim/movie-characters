require('dotenv').config()

module.exports = {

  getJSONResponse: async (prompt) => {

    const OpenAI = require('openai')

    const openai = new OpenAI(process.env.OPENAI_API_KEY)

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages:[
        {
          'role': 'user',
          'content': prompt
        }
      ],
      response_format: {
        type: 'json_object'
      },
      temperature: 0
    })

    if (!response) {
      console.error(response)
      throw new Error('No response from OpenAI')
    }

    const rawContent = response.choices[0].message.content
    console.log(rawContent)
    const content = JSON.parse(response.choices[0].message.content)

    if (content.error) {
      console.log(JSON.stringify(content, null, 2))
      return null
    }

    return content

  },

  getEmbeddings: async (text) => {

    const OpenAI = require('openai')

    const openai = new OpenAI(process.env.OPENAI_API_KEY)

    const response = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: text,
      encoding_format: 'float'
    })

    if (!response) {
      console.error(response)
      throw new Error('No response from OpenAI')
    }

    return response.data[0].embedding

  }

}
