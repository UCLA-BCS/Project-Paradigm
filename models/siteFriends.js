module.exports = function (sequelize, DataTypes) {
  const SiteFriends = sequelize.define("SiteFriends", {
    friendInitiator: DataTypes.INTEGER,
    friendReceiver: DataTypes.INTEGER,
  });
  return SiteFriends;
};
