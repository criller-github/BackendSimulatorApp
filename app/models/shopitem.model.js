// shopitem.model.js
module.exports = (sequelize, Sequelize) => {
    const ShopItem = sequelize.define("shopitem", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      category: {
        type: Sequelize.STRING,
        allowNull: false
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      uses: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 10
      },
      hungerGain: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 20
      },
      weightGain: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 5
      }
    });
    return ShopItem;
  };
  