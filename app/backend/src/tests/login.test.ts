import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import { Users } from '../database/models';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const mockUserLogin = {
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
};

const mockResult = {
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
};

describe('Testes da rota de login', () => {
  let chaiHttpResponse: Response;

  before(() => {
    sinon
        .stub(Users, "findOne")
        .resolves(mockUserLogin as Users);
  });

  after(()=>{
    (Users.findOne as sinon.SinonStub).restore();
  });

  it('Login realizado com os dados corretos', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        email: 'admin@admin.com',
        password: 'secret_admin',
      });

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body.user).to.be.deep.equal(mockResult);
  });

  it('Não é possivel fazer login com o campo email ou password errado', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        email: 'eu@gmail.com',
        password: 'unknown_admin'
    });

    expect(chaiHttpResponse.status).to.be.equal(401);
  });

  it('Não é possivel fazer login com o campo password vazio', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        email: 'admin@admin.com',
    });

    expect(chaiHttpResponse.status).to.be.equal(400);
  });

  it('Não é possivel fazer login com o campo email vazio', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        password: 'secret_admin',
    });

    expect(chaiHttpResponse.status).to.be.equal(400);
  });
});
