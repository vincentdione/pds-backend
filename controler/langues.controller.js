
const db = require("../models");
const langues = db.langues;
const Role = db.role;
const Op = db.Sequelize.Op;

const config = require("../config/auth.config");




const removeOne = async(req, res) => {
    try {
        const deleted = await langues.destroy({ where: { id: req.params.id } });
        console.log(deleted)
        if(!deleted) {
            return res.status(404).json({
                message: "Langue non trouvée",
                success: false,
            });
        }
        return res.status(204).json({
            message: "Langue supprimée avec success",
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

      const langue = await langues.findOne({ where: { [Op.or]: [{id: req.body.id}] } });
        if(!langue){
            return res.status(404).json({
                message: "Cette langue n'existe pas!",
                success: false,
            })
        }
        await langues.update(req.body, {
            where: { id: id }
          });
        return res.status(201).json({
            message: "Langue modifiée",
            success: true,
        });
    } catch(err) {
        return res.status(500).json({
            message: "revoyer vos informations",
            success: false,
        });
    }
};





const getlangues = async(req, res) => {
    try {
        const item = await langues.findAll();
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
                message: "Le champ code de langue est obligatoire",
                success: false,
            })
        }
        await langues.create(req.body);
        return res.status(201).json({
            message: "Langue ajoutée",
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
        const item = await langues.findByPk(req.params.id);
        if(item) {
            console.log("Langue"+JSON.stringify(item));
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
    getlangues,
    addOne
}

