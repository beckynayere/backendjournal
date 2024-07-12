import { DataTypes, Model } from 'sequelize';
import sequelize from './index';

class Journal extends Model {
    public id!: number;
    public title!: string;
    public content!: string;
    public userId!: number;
}

Journal.init({
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Journal'
});

export default Journal;
