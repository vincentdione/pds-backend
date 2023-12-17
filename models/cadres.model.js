module.exports = (sequelize, Sequelize) => {

const Cadre = sequelize.define('Cadre', {
  
  nom: {
    type: Sequelize.STRING,
    allowNull: false
  },
  matricule: {
    type: Sequelize.STRING,
    allowNull: true
  },
  prenom: {
    type: Sequelize.STRING,
    allowNull: false
  },
  sexe: {
    type: Sequelize.STRING,
    allowNull: false
  },
  telephone: {
    type: Sequelize.STRING,
    allowNull: false
  },
  residence: {
    type: Sequelize.STRING,
    allowNull: false
  },
  telephoneFixe: {
    type: Sequelize.STRING,
    allowNull: true
  },
  whatsapp: {
    type: Sequelize.STRING,
    allowNull: true
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  image: {
    type: Sequelize.STRING,
    allowNull: true
  },
  adhesionPds: {
    type: Sequelize.STRING,
    allowNull: true
  },
  carteMembre: {
    type: Sequelize.BOOLEAN,
    allowNull: true
  },
  anneeCarte: {
    type: Sequelize.STRING,
    allowNull: true
  },
  fonctionsParti: {
    type: Sequelize.BOOLEAN,
    allowNull: true
  },
  numeroCarte: {
    type: Sequelize.STRING,
    allowNull: true
  },
  
  numeroCIN: {
    type: Sequelize.STRING,
    allowNull: true
  },
  dateDelivranceCIN: {
    type: Sequelize.STRING,
    allowNull: true
  },
  dateExpirationCIN: {
    type: Sequelize.STRING,
    allowNull: true
  },
  numeroCarteElecteur: {
    type: Sequelize.STRING,
    allowNull: true
  },
  centreVote: {
    type: Sequelize.STRING,
    allowNull: true
  },
  region: {
    type: Sequelize.STRING,
    allowNull: true
  },
  commune: {
    type: Sequelize.STRING,
    allowNull: true
  },
  depart: {
    type: Sequelize.STRING,
    allowNull: true
  },
  village: {
    type: Sequelize.STRING,
    allowNull: true
  },
  numeroCentreVote: {
    type: Sequelize.STRING,
    allowNull: true
  },
  numeroBureauVote: {
    type: Sequelize.STRING,
    allowNull: true
  },
  professionActuelle: {
    type: Sequelize.BOOLEAN,
    allowNull: true
  },
  fonctionActuelle: {
    type: Sequelize.STRING,
    allowNull: true
  },
  fonctionAnterieure: {
    type: Sequelize.ARRAY(Sequelize.STRING), // Tableau de chaînes de caractères
    allowNull: true
  },
  intituleFonction: {
    type: Sequelize.ARRAY(Sequelize.STRING), // Tableau de chaînes de caractères
    allowNull: true
  },
  annee: {
    type: Sequelize.ARRAY(Sequelize.STRING), // Tableau de chaînes de caractères
    allowNull: true
  },
  niveauEtude: {
    type: Sequelize.STRING,
    allowNull: true
  },
  diplome: {
    type: Sequelize.ARRAY(Sequelize.STRING), // Tableau de chaînes de caractères
    allowNull: true
  },
  intituleEcole: {
    type: Sequelize.ARRAY(Sequelize.STRING), // Tableau de chaînes de caractères
    allowNull: true
  },
  anneeEcole: {
    type: Sequelize.ARRAY(Sequelize.STRING), // Tableau de chaînes de caractères
    allowNull: true,
  },
  specialisation: {
    type: Sequelize.STRING,
    allowNull: true
  },
  circonscription: {
    type: Sequelize.STRING,
    allowNull: true
  },
  autres: {
    type: Sequelize.STRING,
    allowNull: true
  }, 
  url: {
    type: Sequelize.STRING,
    allowNull: true,
    unique: true,
  },
  languesEcrites: {
    type: Sequelize.ARRAY(Sequelize.STRING), // Tableau de chaînes de caractères
    allowNull: true, // Vous pouvez ajuster ceci en fonction de vos besoins
  },
  languesParlees: {
    type: Sequelize.ARRAY(Sequelize.STRING), // Tableau de chaînes de caractères
    allowNull: true, // Vous pouvez ajuster ceci en fonction de vos besoins
  },
});

  return Cadre;

};
