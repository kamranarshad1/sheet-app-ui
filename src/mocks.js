import { createSheetResponse } from 'fixtures'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { baseUrl } from 'apis/request'

export const server = setupServer(
  rest.post(`${baseUrl}/sheets`, (req, res, ctx) => {
    console.log('mocking sheets post');
    return res(ctx.json(createSheetResponse))
  }),
)

beforeAll(() => {
  // Establish requests interception layer before all tests.
  server.listen()
})

afterAll(() => {
  // Clean up after all tests are done, preventing this
  // interception layer from affecting irrelevant tests.
  server.close()
})
