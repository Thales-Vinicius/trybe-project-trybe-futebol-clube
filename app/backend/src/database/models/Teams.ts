import { DataTypes, Model } from 'sequelize';
import db from '.';

export default class Team extends Model {
  public id: number;

  public teamName: string;
}

Team.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  teamName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
    underscored: true,
    sequelize: db,
    modelName: 'teams',
    timestamps: false,
});