const { describe, expect, test } = require('@jest/globals');
const request = require('supertest');
const app = require('../app');
const connection = require('../db/pool');

afterAll(async () => {
  const deleteQuery = `DELETE FROM listings WHERE name LIKE 'Test item' AND country LIKE 'Test name';`;
  connection.query(deleteQuery, (err, result) => {
    if (err) {
      console.log(err);
    }
  });
});

describe('POST listing endpoint', ()=> {

  const loggedInUser = {
    id: '',
    email: '',
    token: ''
  }

  beforeAll(async () => {
    connection.query('DELETE FROM users WHERE email=?', ['john.wayne@domain.com'])
    const data = {
      name: 'John Wayne',
      email: 'john.wayne@domain.com',
      password: 'password123'
    }

    const response = await request(app)
      .post('/api/users/signup')
      .set('Accept', 'application/json')
      .set('Content', 'application/json')
      .send(data)
    loggedInUser.id = response.body.id
    loggedInUser.email = response.body.email
    loggedInUser.token = response.body.token
  });

  test('should create a new listing', async () => {
    const listing = {
      name: 'Test item',
      price: 1,
      description: 'Test description'
    };

    const response = await request(app)
      .post('/api/listings')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + loggedInUser.token)
      .set('Content', 'application/json')
      .send(listing);

      expect(response.status).toEqual(200);
      expect(response.headers['content-type']).toMatch(/json/);
      expect(response.body.id).toBeTruthy();
      expect(response.body.name).toEqual('Test item');
      expect(response.body.price).toEqual(1);
  });

  test('should not allow no name property', async () => {
    const listing = {
      price: 1,
      description: 'Test description'
    };
    const response = await request(app)
      .post('/api/listings')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + loggedInUser.token)
      .set('Content', 'application/json')
      .send(listing);
    expect(response.status).toEqual(400);
    expect(response.text).toContain('"name" is required');
  });

  test('should not allow no price property', async () => {
    const listing = {
      name: 'Test name',
      description: 'Test description'
    };
    const response = await request(app)
      .post('/api/listings')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + loggedInUser.token)
      .set('Content', 'application/json')
      .send(listing);
    expect(response.status).toEqual(400);
    expect(response.text).toContain('"price" is required');
  });

  test('should not allow empty name', async () => {
    const listing = {
      name: '',
      price: 20,
    };
    const response = await request(app)
      .post('/api/listings')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + loggedInUser.token)
      .set('Content', 'application/json')
      .send(listing);
    expect(response.status).toEqual(400);
    expect(response.text).toContain('"name" is not allowed to be empty');
  });

  test('should not allow empty price', async () => {
    const listing = {
      name: 'Test item',
      price: 0,
    };
    const response = await request(app)
      .post('/api/listings')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + loggedInUser.token)
      .set('Content', 'application/json')
      .send(listing);
    expect(response.status).toEqual(400);
    expect(response.text).toContain('"price" must be greater than 0');
  });

  test('should not allow too short name', async () => {
      const listing = {
        name: 'C',
        price: 1,
      };
      const response = await request(app)
        .post('/api/listings')
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + loggedInUser.token)
        .set('Content', 'application/json')
        .send(listing);
      expect(response.status).toEqual(400);
      expect(response.text).toContain('"name" length must be at least 2 characters long');
  });

// Describe the test set
describe('GET listings endoint', () => {
  // The test that is being done
  test('should return 200 and valid JSON', async () => {
    const response = await request(app)
      .get('/api/listings')
      .set('Accept', 'application/json');

    expect(response.status).toEqual(200);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'Test item',
          price: 1,
          description: 'Test description'
        })
      ]),
    );
  });

  test('should return 1 listing', async () => {
    const response = await request(app)
      .get('/api/listings/2')
      .set('Accept', 'application/json');

    expect(response.status).toEqual(200);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: 2,
        name: 'Shirt',
        price: 5,
      }),
    );
  });

  test('should return 404 and Not Found', async () => {
    const response = await request(app)
      .get('/api/listings/101');

    expect(response.status).toEqual(404);
    expect(response.text).toContain('Not Found');
  });

});

describe('DELETE listings endpoint', () => {
    test('should delete the listing by id', async () => {
      const listing = {
        name: 'Plate',
        price: 1,
        description: 'Test'
      };
      const postResponse = await request(app)
        .post('/api/listings')
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + loggedInUser.token)
        .set('Content', 'application/json')
        .send(listing);
      const postId = postResponse.body.id;
      const response = await request(app)
        .delete(`/api/listings/${postId}`)
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + loggedInUser.token)
        .set('Content', 'application/json')
      expect(response.status).toEqual(200);
      expect(response.text).toEqual('Listing deleted');
    });
});

});
