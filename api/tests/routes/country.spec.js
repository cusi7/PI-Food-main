/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Recipe, conn } = require('../../src/db.js');

const agent = session(app);
const recipe = {
  title: 'Milanesa a la napolitana',
  summary: 'Las mejores'
};

describe('Recipe routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Recipe.sync({ force: true })
    .then(() => Recipe.create(recipe)));
  describe('GET /recipes', () => {
    it('should get 200', () =>
      agent.get('/recipes').expect(200)
    );
  });
});

//debe traer la receta de la API mediante su id
describe('/recipes/:idReceta', function () {
  it('GET responde con la data de la receta', function () {
      agent.get('/recipes/716426')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect(function (res) {
        expect(res.body.title).to.eql("Cauliflower, Brown Rice, and Vegetable Fried Rice")
      })
  })
})
