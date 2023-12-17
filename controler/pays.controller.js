
const db = require("../models");
const Pays = db.pays;
const Op = db.Sequelize.Op;

const config = require("../config/auth.config");




const removeOne = async(req, res) => {
    try {
        const deleted = await Pays.destroy({ where: { id: req.params.id } });
        if(!deleted) {
            return res.status(404).json({
                message: "Pays non trouvé",
                success: false,
            });
        }
        return res.status(204).json({
            message: "Pays supprimé avec success",
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
      const id = req.body.id;

      const Pays = await Pays.findOne({ where: { [Op.or]: [{id: req.body.id}] } });
        if(!Pays){
            return res.status(404).json({
                message: "Ce Pays n'existe pas!",
                success: false,
            })
        }
        await Pays.update(req.body, {
            where: { id: id }
          });
        return res.status(201).json({
            message: "Pays modifié",
            success: true,
        });
    } catch(err) {
        return res.status(500).json({
            message: "revoyer vos informations",
            success: false,
        });
    }
};





const getPays = async(req, res) => {
    try {
        const item = await Pays.findAll();
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

const addOne = async(req, res) => {
    try {

        if(req.body.code == null){
            return res.status(404).json({
                message: "Le champ code de Pays est obligatoire",
                success: false,
            })
        }
        await Pays.create(req.body);
        return res.status(201).json({
            message: "Pays ajouté",
            success: true,
        });
    } catch(err) {
        return res.status(500).json({
            message: "username,email et telephone doivent etre unique",
            success: false,
        });
    }
};





const getOne = async(req, res) => {
    try {
      console.log("=----------------=-----------")
        const item = await Pays.findByPk(req.params.id);
        if(item) {
            console.log("Pays"+JSON.stringify(item));
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


  

module.exports = {
    removeOne,
    updateOne,
    getOne,
    getPays,
    addOne
}

