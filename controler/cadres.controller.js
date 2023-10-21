const db = require("../models");
const Cadres = db.cadres;
const Role = db.role;
const Op = db.Sequelize.Op;
const multer = require('multer');
const moment = require('moment');

const admin = require('firebase-admin');
const serviceAccount = require('../config/serviceFirebase.json');  // Replace with the path to your service account key file
const firebaseConfig = require('../config/firebase-config');  // Replace with the path to your Firebase config file

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: firebaseConfig.storageBucket,
});


const config = require("../config/auth.config");



const removeOne = async(req, res) => {
    try {
        const deleted = await Cadres.destroy({ where: { id: req.params.id } });
        if(!deleted) {
            return res.status(404).json({
                message: "Cadre non trouvé",
                success: false,
            });
        }
        return res.status(204).json({
            message: "Cadre supprimé avec success",
            success: true,
        });
    } catch(err) {
        return res.status(500).json({
            message: err.message,
            success: false,
        });
    }
};



const updateOne = async(req, res) => {
    try {
      const id = req.params.id;

     

      const updateCadre = {
        url: req.body.identification.url,
        nom: req.body.identification.nom,
        prenom: req.body.identification.prenom,
        sexe: req.body.identification.sexe,
        telephone: req.body.identification.telephone,
        residence: req.body.identification.residence,
        telephoneFixe: req.body.identification.telephoneFixe,
        whatsapp: req.body.identification.whatsapp,
        email: req.body.identification.email,
        image: req.body.identification.image,
        adhesionPds: req.body.situationMilitante.adhesionPds,
        carteMembre: req.body.situationMilitante.carteMembre,
        anneeCarte: req.body.situationMilitante.anneeCarte,
        numeroCarte: req.body.situationMilitante.numeroCarte,
        fonctionsParti: req.body.situationMilitante.fonctionsParti,
        numeroCIN: req.body.situationMilitante.numeroCIN,
        dateDelivranceCIN: req.body.situationMilitante.dateDelivranceCIN,
        dateExpirationCIN: req.body.situationMilitante.dateExpirationCIN,
        numeroCarteElecteur: req.body.situationMilitante.numeroCarteElecteur,
        centreVote: req.body.situationMilitante.centreVote,
        federation: req.body.situationMilitante.federation,
        section: req.body.situationMilitante.section,
        secteur: req.body.situationMilitante.secteur,
        mouvementSoutien: req.body.situationMilitante.mouvementSoutien,
        region: req.body.situationMilitante.region,
        commune: req.body.situationMilitante.commune,
        depart: req.body.situationMilitante.depart,
        village: req.body.situationMilitante.village,
        numeroCentreVote: req.body.situationMilitante.numeroCentreVote,
        numeroBureauVote: req.body.situationMilitante.numeroBureauVote,
        professionActuelle: req.body.situationProf.professionActuelle,
        intituleFonction1: req.body.situationProf.intituleFonction1,
        intituleFonction2: req.body.situationProf.intituleFonction2,
        annee1: req.body.situationProf.annee1,
        annee2: req.body.situationProf.annee2,
        niveauEtude: req.body.situationProf.niveauEtude,
        intituleEcole1: req.body.situationProf.intituleEcole1,
        intituleEcole2: req.body.situationProf.intituleEcole2,
        anneeEcole1: req.body.situationProf.anneeEcole1,
        anneeEcole2: req.body.situationProf.anneeEcole2,
        specialisation: req.body.situationProf.specialisation,
        autres: req.body.situationProf.autres,
        languesParlees: req.body.situationProf.langueParlees,
        languesEcrites: req.body.situationProf.langueEcrites,
            };



      const cadre = await Cadres.findOne({ where: { [Op.or]: [{id: req.params.id}] } });

        await Cadres.update(updateCadre, {
            where: { id: id }
          });
        return res.status(201).json({
            message: "Cadre modifié",
            success: true,
        });
    } catch(err) {
      console.log(err)
        return res.status(500).json({
            message: "username,email et telephone doivent etre unique",
            success: false,
        });
    }
};


const updateImg = async(req, res) => {
  try {
    const id = req.params.id;
    console.log("-----------OKKKKKKKK---------------------");
    console.log(JSON.stringify(req.body.img[0]));
    console.log(req.body.img[0]);
    console.log("-------------OKKKKKK-------------------");


      await Cadres.update({
        image:  req.body.img[0],
      }, {
        where: { id:id },
        returning: true,
        plain: true
      });
      return res.status(201).json({
          message: "Image modifiée",
          success: true,
      });
  } catch(err) {
      return res.status(500).json({
          message: err.message,
          success: false,
      });
  }
};


const addOne = async(data, res) => {
  try {
      const userEmail = await validateEmail(data.email)
      if(userEmail) {
          return res.status(400).json({
              username: "Email existe deja",
              message: "Erreur lors de l'Inscription",
              success: false,
          });
      }

      const userTelephone = await validateTelephone(data.telephone)
      if(userTelephone) {
          return res.status(400).json({
              username: "Numero de téléphone existe deja",
              message: "Changer de numéro ",
              success: false,
          });
      }
      await Cadres.create(data);
        return res.status(200).json({
            message: "Cadre ajouté avec succès",
            status: true
        })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  } catch(err) {
      return res.status(500).json({
          message: err.message,
          success: false,
      });
  }
};


const getCadres = async(req, res) => {
    try {
        const item = await Cadres.findAll();
        if(item) {
            return res.status(200).json(item);
        }
        return res.status(404).json({
            message: "Item not found",
            success: false,
        });
    } catch(err) {
        return res.status(500).json({
            message: err.message,
            success: false,
        });
    }
};



const getByUrl = async (req, res) => {
  try {
    const item = await Cadres.findOne({ where: { url: req.params.url } });
    if (item) {
      console.log("cadre" + JSON.stringify(item));
      return res.status(200).json(item);
    }
    return res.status(404).json({
      message: "Item not found",
      success: false,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
}









const getOne = async(req, res) => {
    try {
      console.log("=----------------=-----------")
        const item = await Cadres.findByPk(req.params.id);
        if(item) {
            console.log("cadre"+JSON.stringify(item));
            return res.status(200).json(item);
        }
        return res.status(404).json({
            message: "Item not found",
            success: false,
        });
    } catch(err) {
        return res.status(500).json({
            message: err.message,
            success: false,
        });
    }
};


/* 
const ajouterCadre = async (req, res) => {
    try {
        console.log(" ==========================================================")
        console.log(req.body)
  
        console.log(" ==========================================================")
      // Vérifier si le téléphone ou l'email existe déjà
      const existingCadre = await Cadres.findOne({
        where: {
          [Op.or]: [
            { telephone: req.body.identification.telephone },
            { email: req.body.identification.email }
          ]
        }
      });
  
      if (existingCadre) {
        return res.status(409).json({ message: 'Le téléphone ou l\'email existe déjà' });
      }
  
      console.log(" ==========================================================")
      console.log(req.body)

      console.log(" ==========================================================")
      // Créer un nouvel objet Cadre avec les données du formulaire
      const nouveauCadre = {
        nom: req.body.identification.nom,
  prenom: req.body.identification.prenom,
  sexe: req.body.identification.sexe,
  telephone: req.body.identification.telephone,
  residence: req.body.identification.residence,
  telephoneFixe: req.body.identification.telephoneFixe,
  whatsapp: req.body.identification.whatsapp,
  email: req.body.identification.email,
  image: req.file.filename,
  adhesionPds: req.body.situationMilitante.adhesionPds,
  carteMembre: req.body.situationMilitante.carteMembre,
  anneeCarte: req.body.situationMilitante.anneeCarte,
  numeroCarte: req.body.situationMilitante.numeroCarte,
  fonctionsParti: req.body.situationMilitante.fonctionsParti,
  numeroCIN: req.body.situationMilitante.numeroCIN,
  dateDelivranceCIN: req.body.situationMilitante.dateDelivranceCIN,
  dateExpirationCIN: req.body.situationMilitante.dateExpirationCIN,
  numeroCarteElecteur: req.body.situationMilitante.numeroCarteElecteur,
  centreVote: req.body.situationMilitante.centreVote,
  federation: req.body.situationMilitante.federation,
  section: req.body.situationMilitante.section,
  secteur: req.body.situationMilitante.secteur,
  mouvementSoutien: req.body.situationMilitante.mouvementSoutien,
  region: req.body.situationMilitante.region,
  commune: req.body.situationMilitante.commune,
  depart: req.body.situationMilitante.depart,
  village: req.body.situationMilitante.village,
  numeroCentreVote: req.body.situationMilitante.numeroCentreVote,
  numeroBureauVote: req.body.situationMilitante.numeroBureauVote,
  professionActuelle: req.body.situationProf.professionActuelle,
  intituleFonction1: req.body.situationProf.intituleFonction1,
  intituleFonction2: req.body.situationProf.intituleFonction2,
  annee1: req.body.situationProf.annee1,
  annee2: req.body.situationProf.annee2,
  niveauEtude: req.body.situationProf.niveauEtude,
  intituleEcole1: req.body.situationProf.intituleEcole1,
  intituleEcole2: req.body.situationProf.intituleEcole2,
  anneeEcole1: req.body.situationProf.anneeEcole1,
  anneeEcole2: req.body.situationProf.anneeEcole2,
  specialisation: req.body.situationProf.specialisation,
  autres: req.body.situationProf.autres
      };
  
      const cadre = await Cadres.create(nouveauCadre);
  
      res.status(201).json({ message: 'Cadre ajouté avec succès', cadre });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Une erreur s\'est produite lors de l\'ajout du cadre' });
    }
  }; */
  

  

  
  

  



 

const validateEmail = async (email) => {
    let user = await Cadres.findOne({ where: { email: email } });
    if(user) {
        return true;
    } else {
        return false;
    }
};

const validateUsername = async (username) => {
  let user = await Cadres.findOne({ where: { username: username } });
  if(user) {
      return true;
  } else {
      return false;
  }
};

const validateTelephone = async (telephone) => {
  let user = await Cadres.findOne({ where: { telephone: telephone } });
  if(user) {
      return true;
  } else {
      return false;
  }
};

const ajouterCadre = async (req, res) => {
    try {
       

      const anneeEnCours = moment().format('YY');
        const dernierCadre = await Cadres.findOne({
            order: [['createdAt', 'DESC']],
        });

        let dernierNumero = 0;
        if (dernierCadre && dernierCadre.matricule) {
            // Extraire les 5 derniers chiffres du matricule existant
            dernierNumero = parseInt(dernierCadre.matricule.slice(-5), 10);
        }

        const nouveauNumero = dernierNumero + 1;
        const numeroFormatte = (nouveauNumero.toString().padStart(5, '0')).slice(-5);

        const matricule = `FNCL${anneeEnCours}${numeroFormatte}`;
        
      // Vérifier si le téléphone ou l'email existe déjà
      const existingCadre = await Cadres.findOne({
        where: {
          [Op.or]: [
            { telephone: req.body.identification.telephone },
            { email: req.body.identification.email },
            { url: req.body.identification.url },
          ]
        }
      });
  
      if (existingCadre) {
        return res.status(409).json({ message: 'Le téléphone ou l\'email  ou url existe déjà' });
      }
        
        // Récupérez le fichier téléchargé à partir de req.file
        let image = null;
        if (req.file) {
          image = req.file;
          console.log(" file ==== "+image)
        }

        

        
        // Utilisez le fichier image dans votre logique de traitement
        const nouveauCadre = {
      matricule:matricule,
      url: req.body.identification.url,
      nom: req.body.identification.nom,
      prenom: req.body.identification.prenom,
      sexe: req.body.identification.sexe,
      telephone: req.body.identification.telephone,
      residence: req.body.identification.residence,
      telephoneFixe: req.body.identification.telephoneFixe,
      whatsapp: req.body.identification.whatsapp,
      email: req.body.identification.email,
      image: req.body.identification.image,
      adhesionPds: req.body.situationMilitante.adhesionPds,
      carteMembre: req.body.situationMilitante.carteMembre,
      anneeCarte: req.body.situationMilitante.anneeCarte,
      numeroCarte: req.body.situationMilitante.numeroCarte,
      fonctionsParti: req.body.situationMilitante.fonctionsParti,
      numeroCIN: req.body.situationMilitante.numeroCIN,
      dateDelivranceCIN: req.body.situationMilitante.dateDelivranceCIN,
      dateExpirationCIN: req.body.situationMilitante.dateExpirationCIN,
      numeroCarteElecteur: req.body.situationMilitante.numeroCarteElecteur,
      centreVote: req.body.situationMilitante.centreVote,
      federation: req.body.situationMilitante.federation,
      section: req.body.situationMilitante.section,
      secteur: req.body.situationMilitante.secteur,
      mouvementSoutien: req.body.situationMilitante.mouvementSoutien,
      region: req.body.situationMilitante.region,
      commune: req.body.situationMilitante.commune,
      depart: req.body.situationMilitante.depart,
      village: req.body.situationMilitante.village,
      numeroCentreVote: req.body.situationMilitante.numeroCentreVote,
      numeroBureauVote: req.body.situationMilitante.numeroBureauVote,
      professionActuelle: req.body.situationProf.professionActuelle,
      intituleFonction1: req.body.situationProf.intituleFonction1,
      intituleFonction2: req.body.situationProf.intituleFonction2,
      annee1: req.body.situationProf.annee1,
      annee2: req.body.situationProf.annee2,
      niveauEtude: req.body.situationProf.niveauEtude,
      intituleEcole1: req.body.situationProf.intituleEcole1,
      intituleEcole2: req.body.situationProf.intituleEcole2,
      anneeEcole1: req.body.situationProf.anneeEcole1,
      anneeEcole2: req.body.situationProf.anneeEcole2,
      specialisation: req.body.situationProf.specialisation,
      autres: req.body.situationProf.autres,
      languesParlees: req.body.situationProf.langueParlees,
      languesEcrites: req.body.situationProf.langueEcrites,
          };
          console.log(" ==========================================================")

          console.log(nouveauCadre)
          console.log(" ==========================================================")

        // Créez le cadre avec les données du formulaire et le nom du fichier image
        const cadre = await Cadres.create(nouveauCadre);
        
        res.status(201).json({ message: 'Cadre ajouté avec succès', cadre });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Une erreur s\'est produite lors de l\'ajout du cadre' });
    }
  };
  


const searchCadres = async (req, res) => {
  try {
    const { professionActuelle, langues, niveauEtude, specialisation, fonctionsParti, region, email, telephone } = req.body;

    

    // Construisez les conditions de recherche en fonction des données du formulaire
    const conditions = {};
    if (professionActuelle) {
      conditions.professionActuelle = {
        [Op.iLike]: `%${professionActuelle}%`,
      };
    }



    if (langues) {
      conditions[Op.or] = [
        { languesParlees: { [Op.contains]: [langues] } },
        { languesEcrites: { [Op.contains]: [langues] } }
      ];
    }

    if (niveauEtude) {
      conditions.niveauEtude = {
        [Op.iLike]: `%${niveauEtude}%`,
      };
    }

    if (specialisation) {
      conditions.specialisation = {
        [Op.iLike]: `%${specialisation}%`,
      };
    }

    if (fonctionsParti) {
      conditions.fonctionsParti = {
        [Op.iLike]: `%${fonctionsParti}%`,
      };
    }

    if (region) {
      conditions.region = {
        [Op.iLike]: `%${region.reg_name}%`,
      };
    }

    if (email) {
      conditions.email = {
        [Op.iLike]: `%${email}%`,
      };
    }

    if (telephone) {
      conditions.telephone = {
        [Op.iLike]: `%${telephone}%`,
      };
    }


    const cadres = await Cadres.findAll({ where: conditions });
    console.log("============================")

    console.log(cadres)
    console.log("============================")


    if (!cadres || cadres.length === 0) {
      return res.status(404).json({
        message: "Aucun cadre trouvé",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Résultats de la recherche",
      success: true,
      data: cadres,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

  

module.exports = {
    removeOne,
    updateOne,
    getOne,
    getCadres,
    addOne,
    updateImg,
    ajouterCadre,
    searchCadres,
    getByUrl
}

