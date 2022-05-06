import { Sequelize } from 'sequelize';
import * as config from '../config/database';

export default new Sequelize(config);

export { default as Teams } from './Teams';
export { default as Matches } from './Matches';
export { default as Users } from './Users';