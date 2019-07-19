var bcrypt = require("bcryptjs");

module.exports = function (sequelize, DataTypes) {
  var Vendor = sequelize.define("Vendor", {
    vendorid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [12],
          msg: "Phone number needs to be 10 digits"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [1],
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      }
    }
  });

  Vendor.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };

  Vendor.addHook("beforeCreate", function(user){
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  });
  return Vendor;
};
