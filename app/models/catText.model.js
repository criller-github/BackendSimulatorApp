module.exports = (sequelize, Sequelize) => {
    const CatText = sequelize.define("cat_text", {
      id: {
        type: Sequelize.STRING,
        Autoincrement: true,
        primaryKey: true
      },
      image_id: { //et id til at identificere hvilken kattekategori teksten hører til
        type: Sequelize.STRING
      },
      text: { //teskten der skal vises i appen til brugeren
        type: Sequelize.STRING //ændre til string for at gemme mere komplekse data end 'boolean' som er primært til simple sandt/falsk værdier
      }
    });
  
    return CatText;
  };