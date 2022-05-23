import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import { Matches } from '../database/models';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const mockMatches = [
  {
		"id": 1,
		"homeTeam": 16,
		"homeTeamGoals": 1,
		"awayTeam": 8,
		"awayTeamGoals": 1,
		"inProgress": false,
		"teamHome": {
			"teamName": "São Paulo"
		},
		"teamAway": {
			"teamName": "Grêmio"
		}
	},
	{
		"id": 2,
		"homeTeam": 9,
		"homeTeamGoals": 1,
		"awayTeam": 14,
		"awayTeamGoals": 1,
		"inProgress": true,
		"teamHome": {
			"teamName": "Internacional"
		},
		"teamAway": {
			"teamName": "Santos"
		}
	}
];

const mockCreateMatch = [
  {
		"id": 3,
		"homeTeam": 16,
		"homeTeamGoals": 2,
		"awayTeam": 14,
		"awayTeamGoals": 1,
		"inProgress": true,
		"teamHome": {
			"teamName": "São Paulo"
		},
		"teamAway": {
			"teamName": "Santos"
		}
	}
]

describe('Teste para buscar todos os jogos', () => {
  let chaiHttpResponse: Response;

  before(() => {
    sinon
        .stub(Matches, "findAll")
        .resolves(mockMatches as unknown as Matches[]);
  });

  after(()=>{
    (Matches.findAll as sinon.SinonStub).restore();
  });

  it('Retorna todos os jogos corretamente', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/matches');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(mockMatches);
  });
});

describe('Teste para buscar todos os jogos em andamento', () => {
  let chaiHttpResponse: Response;
  const filterMockMatches = mockMatches.filter((match) => match.inProgress)

  before(() => {
    sinon
        .stub(Matches, "findAll")
        .resolves(filterMockMatches as unknown as Matches[]);
  });

  after(()=>{
    (Matches.findAll as sinon.SinonStub).restore();
  });

  it('Retorna todos os jogos em andamento', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/matches?inProgress=true');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(filterMockMatches);
  });
});

describe('Teste para buscar todos os jogos finalizados', () => {
  let chaiHttpResponse: Response;
  const filterMockMatches = mockMatches.filter((match) => !match.inProgress)

  before(() => {
    sinon
        .stub(Matches, "findAll")
        .resolves(filterMockMatches as unknown as Matches[]);
  });

  after(()=>{
    (Matches.findAll as sinon.SinonStub).restore();
  });

  it('Retorna todos os jogos finalizados', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/matches?inProgress=false');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(filterMockMatches);
  });
});
