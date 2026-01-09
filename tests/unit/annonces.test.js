const request = require('supertest');
const app = require('../../src/app.js');


descride('POST /annonces', () => {
    test('cette route doit creer une annonce et renvoyer une 201', async ()=>{
        const res = await request(app)
            .post('/annonces')
            .send({  });
    });
});