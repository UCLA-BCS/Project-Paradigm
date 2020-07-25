module.exports = function (sequelize, DataTypes) {
  const SiteUser = sequelize.define("SiteUser", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    password: DataTypes.TEXT,
    allergies: DataTypes.TEXT,
    dietaryRestrictions: DataTypes.TEXT,
  });
  return SiteUser;
};
