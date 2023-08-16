const request = require("supertest")
const app = require("../app")

const URL_BASE = '/api/v1/users'
let TOKEN
let userId

beforeAll(async () => {
  const user = {
    email: "sergio@gmail.com",
    password: "sergio1234"
  }

  const res = await request(app)
    .post(`${URL_BASE}/login`)
    .send(user)

  TOKEN = res.body.token
})

test("Get -> 'URL_BASE', should return status code 200 and res.body.length === 1", async () => {
  const res = await request(app)
    .get(URL_BASE)
    .set('Authorization', `Bearer ${TOKEN}`)

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(1)

})

test("POST -> 'URL_BASE', should return status code 201 and res.body.firstName === user.firstName", async () => {
  const user = {
    firstName: "Erik",
    lastName: "Salazar",
    email: "erik@gmail.com",
    password: "erik1234",
    phone: "+4312"
  }
  const res = await request(app)
    .post(URL_BASE)
    .send(user)

  userId = res.body.id

  expect(res.status).toBe(201)
  expect(res.body).toBeDefined()
  expect(res.body.firstName).toBe(user.firstName)
})

test("PUT -> 'URL_BASE/:id', should return status code 200 and res.body.firstName === user.firstName", async () => {
  const user = {
    firstName: "Angel",
  }

  const res = await request(app)
    .put(`${URL_BASE}/${userId}`)
    .send(user)
    .set('Authorization', `Bearer ${TOKEN}`)

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.firstName).toBe(user.firstName)


})
