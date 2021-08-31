const fs = require("fs");
const crypto = require("crypto");
const util = require("util");
const Repository = require('./repository')

const scrypt = util.promisify(crypto.scrypt);

class UsersRepository extends Repository {
  async create(attrs) {
    attrs.id = this.randomId();

    const salt = crypto.randomBytes(8).toString("hex");

    const hashed = await scrypt(attrs.password, salt, 64);

    const records = await this.getAll();
    const record = {
      ...attrs,
      password: `${hashed.toString("hex")}.${salt}`,
    };
    records.push(record);
    await this.writeAll(records);

    return record;
  }

  async comparePassword(saved, supplied) {
    const [hased, salt] = saved.split('.');
    const hashedSuppliedBuff = await scrypt(supplied, salt, 64)

    return hased === hashedSuppliedBuff.toString('hex')
  }
}

module.exports = new UsersRepository("users.json");
