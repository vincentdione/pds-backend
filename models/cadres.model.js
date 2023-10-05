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
    allowNull: false
  },
  carteMembre: {
    type: Sequelize.STRING,
    allowNull: false
  },
  anneeCarte: {
    type: Sequelize.STRING,
    allowNull: true
  },
  numeroCarte: {
    type: Sequelize.STRING,
    allowNull: true
  },
  fonctionsParti: {
    type: Sequelize.STRING,
    allowNull: false
  },
  numeroCIN: {
    type: Sequelize.STRING,
    allowNull: false
  },
  dateDelivranceCIN: {
    type: Sequelize.STRING,
    allowNull: false
  },
  dateExpirationCIN: {
    type: Sequelize.STRING,
    allowNull: false
  },
  numeroCarteElecteur: {
    type: Sequelize.STRING,
    allowNull: false
  },
  centreVote: {
    type: Sequelize.STRING,
    allowNull: false
  },
  federation: {
    type: Sequelize.STRING,
    allowNull: false
  },
  section: {
    type: Sequelize.STRING,
    allowNull: false
  },
  secteur: {
    type: Sequelize.STRING,
    allowNull: false
  },
  mouvementSoutien: {
    type: Sequelize.STRING,
    allowNull: false
  },
  region: {
    type: Sequelize.STRING,
    allowNull: false
  },
  commune: {
    type: Sequelize.STRING,
    allowNull: false
  },
  depart: {
    type: Sequelize.STRING,
    allowNull: false
  },
  village: {
    type: Sequelize.STRING,
    allowNull: false
  },
  numeroCentreVote: {
    type: Sequelize.STRING,
    allowNull: false
  },
  numeroBureauVote: {
    type: Sequelize.STRING,
    allowNull: false
  },
  professionActuelle: {
    type: Sequelize.STRING,
    allowNull: false
  },
  intituleFonction1: {
    type: Sequelize.STRING,
    allowNull: false
  },
  intituleFonction2: {
    type: Sequelize.STRING,
    allowNull: false
  },
  annee1: {
    type: Sequelize.STRING,
    allowNull: false
  },
  annee2: {
    type: Sequelize.STRING,
    allowNull: false
  },
  niveauEtude: {
    type: Sequelize.STRING,
    allowNull: false
  },
  intituleEcole1: {
    type: Sequelize.STRING,
    allowNull: false
  },
  intituleEcole2: {
    type: Sequelize.STRING,
    allowNull: false
  },
  anneeEcole1: {
    type: Sequelize.STRING,
    allowNull: false
  },
  anneeEcole2: {
    type: Sequelize.STRING,
    allowNull: false
  },
  specialisation: {
    type: Sequelize.STRING,
    allowNull: false
  },
  autres: {
    type: Sequelize.STRING,
    allowNull: false
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
