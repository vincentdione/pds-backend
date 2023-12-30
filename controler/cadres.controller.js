const db = require("../models");
const Cadres = db.cadres;
const Role = db.role;
const Op = db.Sequelize.Op;
const multer = require('multer');
const moment = require('moment');
const path = require('path');
const fs = require('fs');

const config = require("../config/auth.config");



/* const removeOne = async(req, res) => {
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

 */

const removeOne = async (req, res) => {
  try {
      const cadre = await Cadres.findByPk(req.params.id);
      if (!cadre) {
          return res.status(404).json({
              message: "Cadre non trouvé",
              success: false,
          });
      }

      const deleted = await Cadres.destroy({ where: { id: req.params.id } });
      if (!deleted) {
          return res.status(404).json({
              message: "Cadre non trouvé",
              success: false,
          });
      }

      // Supprimer l'image de profil associée
      if (cadre.image) {
          const imagePath = path.join(__dirname, '../../images', cadre.image);

          // Vérifiez si le fichier existe avant de le supprimer
          if (fs.existsSync(imagePath)) {
              fs.unlinkSync(imagePath);
          }
      }

      return res.status(204).json({
          message: "Cadre supprimé avec succès",
          success: true,
      });
  } catch (err) {
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
        carteMembre: req.body.situationMilitante.carteMembre  === 'true' ? 1 : 0,
        anneeCarte: req.body.situationMilitante.anneeCarte,
        numeroCarte: req.body.situationMilitante.numeroCarte,
        fonctionsParti: req.body.situationMilitante.fonctionsParti === 'true' ? 1 : 0,
        numeroCIN: req.body.situationMilitante.numeroCIN,
        circonscription:  req.body.situationMilitante.circonscription,
        dateDelivranceCIN: req.body.situationMilitante.dateDelivranceCIN,
        dateExpirationCIN: req.body.situationMilitante.dateExpirationCIN,
        numeroCarteElecteur: req.body.situationMilitante.numeroCarteElecteur,
        centreVote: req.body.situationMilitante.centreVote,
        region: req.body.situationMilitante.region,
        commune: req.body.situationMilitante.commune,
        depart: req.body.situationMilitante.depart,
        village: req.body.situationMilitante.village,
        numeroCentreVote: req.body.situationMilitante.numeroCentreVote,
        numeroBureauVote: req.body.situationMilitante.numeroBureauVote,
  
  
        professionActuelle: req.body.situationProf.professionActuelle === 'true' ? 1 : 0,
        fonctionActuelle: req.body.situationProf.professionActuelle === 'true' && req.body.situationProf.fonctionActuelle,
        fonctionAnterieure: req.body.situationProf.fonctionAnterieures,
        diplome: req.body.situationProf.diplomes,
        niveauEtude: req.body.situationProf.niveauEtude,
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



const updateImg = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      const error = new Error("No File");
      error.status = 400;
      throw error;
    }

    const imagePath = file.filename;

    // Récupérez le cadre existant pour obtenir le nom de fichier de l'ancienne image
    const existingCadre = await Cadres.findByPk(req.params.id);

    // Supprimez l'ancienne image du répertoire
    if (existingCadre && existingCadre.image) {
      const oldImagePath = path.join(__dirname, '../../images', existingCadre.image);
    
      // Supprimez l'ancienne image du répertoire
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    // Mettez à jour le nouveau nom de fichier de l'image dans la base de données
    const result = await Cadres.update({ image: imagePath }, { where: { id: req.params.id } });

    if (result[0] === 1) {
      res.status(200).json({ success: true, imagePath });
    } else {
      res.status(404).json({ success: false, error: "Cadre not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};




/* const updateImg = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      const error = new Error("No File");
      error.status = 400;
      throw error;
    }

    const imagePath = file.filename;

    const result = await Cadres.update({ image: imagePath }, { where: { id: req.params.id } });

    if (result[0] === 1) {
      res.status(200).json({ success: true, imagePath });
    } else {
      res.status(404).json({ success: false, error: "Cadre not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}; */



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
        console.log("=============================================================");
        console.log(req.body.situationProf)
        console.log("=============================================================");

        
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
      carteMembre: req.body.situationMilitante.carteMembre  === 'true' ? 1 : 0,
      anneeCarte: req.body.situationMilitante.anneeCarte,
      numeroCarte: req.body.situationMilitante.numeroCarte,
      fonctionsParti: req.body.situationMilitante.fonctionsParti === 'true' ? 1 : 0,
      numeroCIN: req.body.situationMilitante.numeroCIN,
      circonscription:  req.body.situationMilitante.circonscription,
      dateDelivranceCIN: req.body.situationMilitante.dateDelivranceCIN,
      dateExpirationCIN: req.body.situationMilitante.dateExpirationCIN,
      numeroCarteElecteur: req.body.situationMilitante.numeroCarteElecteur,
      centreVote: req.body.situationMilitante.centreVote,
      region: req.body.situationMilitante.region,
      commune: req.body.situationMilitante.commune,
      depart: req.body.situationMilitante.depart,
      village: req.body.situationMilitante.village,
      numeroCentreVote: req.body.situationMilitante.numeroCentreVote,
      numeroBureauVote: req.body.situationMilitante.numeroBureauVote,


      professionActuelle: req.body.situationProf.professionActuelle === 'true' ? 1 : 0,
      fonctionActuelle: req.body.situationProf.professionActuelle === 'true' && req.body.situationProf.fonctionActuelle != null ? req.body.situationProf.fonctionActuelle : '',
      fonctionAnterieure: req.body.situationProf.fonctionAnterieures,
      diplome: req.body.situationProf.diplomes,
      niveauEtude: req.body.situationProf.niveauEtude,
      specialisation: req.body.situationProf.specialisation,
      autres: req.body.situationProf.autres,
      languesParlees: req.body.situationProf.langueParlees,
      languesEcrites: req.body.situationProf.langueEcrites,

       /* intituleFonction1: req.body.situationProf.intituleFonction1,
      intituleFonction2: req.body.situationProf.intituleFonction2, */
     /*  annee1: req.body.situationProf.annee1,
      annee2: req.body.situationProf.annee2, */
      /* intituleEcole1: req.body.situationProf.intituleEcole1,
      intituleEcole2: req.body.situationProf.intituleEcole2, */
  /*     anneeEcole1: req.body.situationProf.anneeEcole1,
      anneeEcole2: req.body.situationProf.anneeEcole2, */
      /*  federation: req.body.situationMilitante.federation,
      section: req.body.situationMilitante.section,
      secteur: req.body.situationMilitante.secteur,
      mouvementSoutien: req.body.situationMilitante.mouvementSoutien, */

          };

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
    const { professionActuelle, langues, niveauEtude, specialisation, fonctionActuelle, region, email, telephone } = req.body;

    

    // Construisez les conditions de recherche en fonction des données du formulaire
    const conditions = {};
      if (professionActuelle == '1'){
        conditions.professionActuelle =  true; // Convert to boolean
      }
      else {
        conditions.professionActuelle =  false; // Convert to boolean

      }
    
console.log("first condition  "+professionActuelle)


    if (langues) {
      console.log("langues: " + langues)
      console.log(langues)
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

    if (fonctionActuelle) {
      conditions.fonctionActuelle = {
        [Op.iLike]: `%${fonctionActuelle}%`,
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

    console.log(cadres)


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


const importData = async (req, res) => {
  try {
    const excelData = req.body; // Assuming the data is sent as JSON in the request body

    console.log("****************************************************************************************************************")
    console.log(excelData)
    console.log("****************************************************************************************************************")
    // Loop through excelData and save to the database using Sequelize
    for (const data of excelData) {


      if (
        data.nom &&
        data.prenom &&
        data.sexe &&
        data.telephone &&
        data.residence &&
        data.email
      ) {
      const existingRecord = await Cadres.findOne({
        where: {
          [Op.or]: [
            { telephone: `${data.telephone }`},
            { email: data.email.trim() },
          ],
        },
      });

      if (existingRecord) {
        console.log(`La ligne avec le téléphone ${data.telephone} ou l'email ${data.email} existe déjà. Ignorer cette ligne.`);
        continue; 
      }

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

        // Convertir "carteMembre" en 1 si c'est "oui", sinon 0
        const carteMembreValue = data.carteMembre && data.carteMembre.toLowerCase() === 'oui' ? 1 : 0;

        // Convertir "fonctionsParti" en 1 si c'est "oui", sinon 0
        const fonctionsPartiValue = data.fonctionsParti && data.fonctionsParti.toLowerCase() === 'oui' ? 1 : 0;

        const professionActuelleValue = data.professionActuelle && data.professionActuelle.toLowerCase() === 'oui' ? 1 : 0;

        // Traiter "professionActuelle" et "fonctionActuelle" ou "intituleFonction"
        let fonctionActuelleValue = null;
        let intituleFonctionValue = null;
        
        if (data.professionActuelle && data.professionActuelle.toLowerCase() === 'oui') {
          fonctionActuelleValue = data.fonctionActuelle;
          // Laissez intituleFonctionValue à null car vous n'en avez pas besoin dans ce cas
        } else {
          fonctionActuelleValue = null; // Ou mettez la valeur par défaut que vous préférez
          intituleFonctionValue = data.intituleFonction;
        }
        

        // Traiter "fonctionAnterieure" en un tableau avec toutes les occurrences
        const fonctionAnterieureValues = [];
        for (let i = 1; i <= 3; i++) {
          const fonctionAnterieureKey = `fonctionAnterieure${i}`;
          if (data[fonctionAnterieureKey]) {
            fonctionAnterieureValues.push(data[fonctionAnterieureKey]);
          }
        }


        // Traiter "diplome" en un tableau avec toutes les occurrences
        const diplomeValues = [];
        for (let i = 1; i <= 3; i++) {
          const diplomeKey = `diplome${i}`;
          if (data[diplomeKey]) {
            diplomeValues.push(data[diplomeKey]);
          }
        }

        const langueEcriteValues = [];
        for (let i = 1; i <= 4; i++) {
          const langueEcriteKey = `languesEcrites${i}`;
          if (data[langueEcriteKey]) {
            langueEcriteValues.push(data[langueEcriteKey]);
          }
        }

        const languesParleesValues = [];
        for (let i = 1; i <= 4; i++) {
          const langueParleeKey = `languesParlees${i}`;
          if (data[langueParleeKey]) {
            languesParleesValues.push(data[langueParleeKey]);
          }
        }



/*       const nouveauCadre = {
        matricule:matricule,
      nom: data.nom,
      prenom: data.prenom,
      sexe: data.sexe,
      telephone: data.telephone,
      residence: data.residence,
      whatsapp: data.whatsapp,
      email: data.email,
      adhesionPds: data.adhesionPds,
      carteMembre: carteMembreValue,
      anneeCarte: data.anneeCarte,
      fonctionsParti: fonctionsPartiValue,
      numeroCarte: data.cne,
      numeroCIN: data.numeroCIN,
      circonscription:  data.circonscription,
      centreVote: data.centreVote,
      federation: data.federation,
      section: data.section,
      secteur: data.secteur,
      mouvementSoutien: data.mouvementSoutien,
      region: data.region,
      commune: data.commune,
      depart: data.depart,
      village: data.village,
      numeroCentreVote: data.numeroCentreVote,
      numeroBureauVote: data.numeroBureauVote,
      professionActuelle: professionActuelleValue,
      fonctionActuelle: fonctionActuelleValue,
      intituleFonction: [intituleFonctionValue],
      fonctionAnterieure: fonctionAnterieureValues,
      niveauEtude: data.niveauEtude,
      diplome: diplomeValues,
      specialisation: data.specialisation,
      autres: data.autres,
      languesParlees: languesParleesValues,
      languesEcrites: langueEcriteValues,
      } */

      console.log('*******************************Values before creating record:******************************', {
        matricule,
        nom: data.nom,
        prenom: data.prenom,
        sexe: data.sexe,
        telephone: data.telephone,
        residence: data.residence,
        whatsapp: data.whatsapp,
        email: data.email,
      });
      console.log('*******************************Values before creating record:******************************')

      const [nouveauCadre, created] = await Cadres.findOrCreate({
        where: {
          email: data.email.trim(),
        },
        defaults: {
          matricule:matricule,
          nom: data.nom,
          prenom: data.prenom,
          sexe: data.sexe,
          telephone: data.telephone,
          residence: data.residence,
          whatsapp: data.whatsapp,
          email: data.email.trim(),
          adhesionPds: data.adhesionPds,
          carteMembre: carteMembreValue,
          anneeCarte: data.anneeCarte,
          fonctionsParti: fonctionsPartiValue,
          numeroCarte: data.cne,
          numeroCIN: data.numeroCIN,
          circonscription:  data.circonscription,
          centreVote: data.centreVote,
          federation: data.federation,
          section: data.section,
          secteur: data.secteur,
          mouvementSoutien: data.mouvementSoutien,
          region: data.region,
          commune: data.commune,
          depart: data.depart,
          village: data.village,
          numeroCentreVote: data.numeroCentreVote,
          numeroBureauVote: data.numeroBureauVote,
          professionActuelle: professionActuelleValue,
          fonctionActuelle: fonctionActuelleValue,
          intituleFonction: [intituleFonctionValue],
          fonctionAnterieure: fonctionAnterieureValues,
          niveauEtude: data.niveauEtude,
          diplome: diplomeValues,
          specialisation: data.specialisation,
          autres: data.autres,
          languesParlees: languesParleesValues,
          languesEcrites: langueEcriteValues,
        },
      });

      if (!created) {
        console.log(`La ligne avec le téléphone ${data.telephone} ou l'email ${data.email} existe déjà. Ignorer cette ligne.`);
      }

      //await Cadres.create(nouveauCadre);
    }
    else {
      console.error('Missing required values for creating a new record');
    }
  }
  

    res.status(200).json({ message: 'données importées avec succes !' });
  } catch (error) {
    console.error('Error importing data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

  

module.exports = {
    removeOne,
    updateOne,
    getOne,
    getCadres,
    addOne,
    updateImg,
    ajouterCadre,
    searchCadres,
    getByUrl,
    importData
}

