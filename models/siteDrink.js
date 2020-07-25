module.exports = function (sequelize, DataTypes) {
  const SiteDrink = sequelize.define("SiteDrink", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    owner: DataTypes.INTEGER,
    coffeeShop: DataTypes.STRING,
    isHot: DataTypes.BOOLEAN, // True - Hot Drink; False - Cold Drink
    drinkName: DataTypes.STRING,
    specialInstructions: DataTypes.TEXT,
  });
  return SiteDrink;
};
