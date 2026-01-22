// const { User } = require('../../models');

class UserRepository {
//   private user 
  constructor(db) {
    this.User = db.User;
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
  async delete(idUser) {

    return  await this.User.destroy({
      where: { id: idUser }
    });
  }
  async findByEmailAndIdUser(email, ID_user) {
    return this.User.findOne({
      where: {
        email,
        ID_user      }
    });
  }
}


module.exports = {
  UserRepository
};
