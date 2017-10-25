/* eslint-disable */
import ChaiHttp from 'chai-http';
import Chai, { expect } from 'chai';

Chai.use(ChaiHttp);

describe('/recipes', () => {
  describe('/recipes GET endpoint', () => {
    it('Should return a list of recipes when called', (done) => {
      Chai.request('http://localhost:4044')
        .get('/api/v1/recipes')
        .end((error, response) => {
          expect(response).to.have.status(200);

          const res = response.body;
          expect(res.data.recipes).to.not.be.undefined;
          expect(Array.isArray(res.data.recipes)).to.be.true;

          expect(res.data.recipes[0].id).to.not.be.undefined;
          expect(res.data.recipes[0].name).to.not.be.undefined;
          expect(res.data.recipes[0].description).to.not.be.undefined;
          expect(res.data.recipes[0].image_url).to.not.be.undefined;
          expect(res.data.recipes[0].time_to_cook).to.not.be.undefined;
          expect(res.data.recipes[0].procedure).to.not.be.undefined;
          expect(res.data.recipes[0].ingredients).to.not.be.undefined;
          expect(res.data.recipes[0].favorites).to.not.be.undefined;
          expect(res.data.recipes[0].downvotes).to.not.be.undefined;
          expect(res.data.recipes[0].upvotes).to.not.be.undefined;
          done();
        });
    });
  });

  describe('/recipes POST endpoint', () => {
    it.only('Should return the newly created recipe', (done) => {
      Chai.request('http://localhost:4044')
        .post('/api/v1/recipes')
        .send({
          title: 'Vegetable Salad',
          description: 'this stuff is not nice, really. am just building my api.',
          image_url: 'https://i.imgur.com/av7fjeA.jpg',
          time_to_cook: 205,
          ingredients: JSON.stringify(["2 pieces Carrots","Handful Lettuces","1 sized Cucumber","1/2 medium sized Cabbage","1 tin sweet corn","1 big tin Heinz baked beans","1 tbsp mayonaise","1 tin green peas","2 cksp Salad cream","2 boiled eggs"]),
          procedure: JSON.stringify(["Wash all the vegetables with enough water and salt.","Slice nicely cabbage, lettuce and dice the cucumber and carrot and set aside.","Dice boiled eggs, sieve water off the sweet corn and green pea and set aside","Arrange all the vegetables in a plate.","Pour salad cream and mayonnaise in a small bowl and add a dash of black pepper if you wish for a nice zing then mix with the salad and serve"])
        })
        .end((error, response) => {
          expect(response).to.have.status(201);
          
          const res = response.body;

          expect(res.data.title).to.equal('Vegetable Salad');
          expect(res.data.description).to.equal('this stuff is not nice, really. am just building my api.');
          expect(res.data.time_to_cook).to.equal(205);
          expect(res.data.ingredients[0]).to.equal('2 pieces Carrots');
          expect(res.data.procedure[0]).to.equal('Wash all the vegetables with enough water and salt.');
          expect(res.data.upvotes).to.equal(0);
          expect(res.data.downvotes).to.equal(0);
          expect(res.data.favorites).to.equal(0);

          done();
        });
    });
  });
});