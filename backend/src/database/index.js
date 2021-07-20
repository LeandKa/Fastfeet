import Sequelize from 'sequelize';

import DatabaseConfig from '../config/database';
import User from '../app/models/User';
import Recipient from '../app/models/Recipient';
import Files from '../app/models/Files';
import DeliveryMan from '../app/models/DeliveryMan';
import Order from '../app/models/Order';
import DeliveryProblems from '../app/models/DeliveryProblems';

const models = [User,Recipient,Files,DeliveryMan,Order,DeliveryProblems];

class Database {
    constructor(){
        this.init();
    }

    init(){
        this.connection = new Sequelize(DatabaseConfig);
        models.map(model => model.init(this.connection))
              .map(model => model.associate && model.associate(this.connection.models));
    }
}

export default new Database();