module.exports = (sequelize, Sequelize) => {
    const CatText = sequelize.define("catText", {
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      published: {
        type: Sequelize.BOOLEAN
      }
    });
  
    return CatText;
  };