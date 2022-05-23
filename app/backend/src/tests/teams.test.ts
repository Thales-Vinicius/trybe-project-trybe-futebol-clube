import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import { Teams } from '../database/models';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const mockTeams = [
  {
      "id": 1,
      "teamName": "Avaí/Kindermann"
  },
  {
      "id": 2,
      "teamName": "Bahia"
  },
  {
      "id": 3,
      "teamName": "Botafogo"
  },
  {
		"id": 4,
		"teamName": "Corinthians"
	},
	{
		"id": 5,
		"teamName": "Cruzeiro"
	},
	{
		"id": 6,
		"teamName": "Ferroviária"
	},
];

describe('Teste para buscar todos os times', () => {
  let chaiHttpResponse: Response;

  before(() => {
    sinon
        .stub(Teams, "findAll")
        .resolves(mockTeams as Teams[]);
  });

  after(()=>{
    (Teams.findAll as sinon.SinonStub).restore();
  });

  it('Retorna todos os times corretamente', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/teams');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(mockTeams);
  });
});

describe('Não é possivel encontrar os times', () => {
  let chaiHttpResponse: Response;

  before(() => {
    sinon
        .stub(Teams, "findAll")
        .resolves(undefined);
  });

  after(()=>{
    (Teams.findAll as sinon.SinonStub).restore();
  });

  it('Retorna o erro e a mensagem corretamente', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/teams');

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body.message).to.be.equal('Not Found');
  });
})

describe('Testes para buscar um time pela ID', () => {
  let chaiHttpResponse: Response;

  before(() => {
    sinon
        .stub(Teams, "findByPk")
        .resolves(mockTeams[0] as Teams);
  });

  after(()=>{
    (Teams.findByPk as sinon.SinonStub).restore();
  });

  it('Retorna todos os times corretamente', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/teams/1');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(mockTeams[0]);
  });
});

describe('Não é possivel encontrar um time pela ID', () => {
  let chaiHttpResponse: Response;

  before(() => {
    sinon
        .stub(Teams, "findByPk")
        .resolves(undefined);
  });

  after(()=>{
    (Teams.findByPk as sinon.SinonStub).restore();
  });

  it('Retorna o erro e a mensagem corretamente', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/teams/111');

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body.message).to.be.equal('Team not found');
  });
})
