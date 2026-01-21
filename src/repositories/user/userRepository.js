// const { User } = require('../../models');

class UserRepository {
//   private user 
  constructor(db) {
    this.User = db.users;
  }

  async findByEmail(email) {
    return this.User.findOne({
      where: { email }
    });
  }

  async findAllUser(clientId) {
    return this.User.findAll({
       attributes: [
        'id',
        'email',
        'name',
        'ID_user',
        'client_id',
        'access_level',
      ],
      where: { client_id: clientId }
    });
  }
  async createUser(data) {
    const user = await this.User.create(data);
    return user.id;
  }
   async userById(idUser) {
    const user = await this.User.findOne({
      attributes: [
        'id',
        'email',
        'name',
        'ID_user',
        'client_id',
        'access_level',
      ],
      where: { id: idUser }
    })
    return user;
  }
  async updateUser(idUser, fieldsUpdate) {
    const result = await this.User.update(fieldsUpdate, {
      where: { id: idUser }
    });
    return result;
  }
}



//   async findByUserId(id) {
//     return User.findByPk(id);
//   }

//   async createUser(data) {
//     const user = await User.create(data);
//     return user.id;
//   }

//   async findByEmail(email) {
//     return User.findOne({
//       where: { email }
//     });
//   }

//   async updateUser(id, data) {
//     const user = await this.findByUserId(id);
//     if (!user) {
//       const error = new Error(`Record not found for ID=${id}`);
//       error.status = 404;
//       throw error;
//     }
//     return user.update(data);
//   }

//   async deleteUser(id) {
//     const user = await this.findByUserId(id);
//     if (!user) {
//       const error = new Error(`Record not found for ID=${id}`);
//       error.status = 404;
//       throw error;
//     }
//     await user.destroy();
//   }
// }

module.exports = {
  UserRepository
};
