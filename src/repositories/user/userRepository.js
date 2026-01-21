// const { User } = require('../../models');

class UserRepository {
//   private user 
  constructor(db) {
    this.User = db.users;
    console.log('DB keys:', Object.keys(db))
  }

  async findByEmail(email) {
    return this.User.findOne({
      where: { email }
    });
  }
}

// class UserRepository {

//   async findAllUser(clientId) {
//     return User.findAll({
//       where: { client_id: clientId }
//     });
//   }

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
