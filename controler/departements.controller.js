
const db = require("../models");
const Departements = db.departements;
const Role = db.role;
const Op = db.Sequelize.Op;

const config = require("../config/auth.config");




const removeOne = async(req, res) => {
    try {
        const deleted = await Departements.destroy({ where: { id: req.params.id } });
        if(!deleted) {
            return res.status(404).json({
                message: "Region non trouvé",
                success: false,
            });
        }
        return res.status(204).json({
            message: "Region supprimé avec success",
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

      const cadre = await Departements.findOne({ where: { [Op.or]: [{id: req.body.id}] } });
      console.log("--------------|||||||||||||||||||||||||||||||||||||||||||||||||||||||------------------");
      console.log(cadre)

        await Departements.update(req.body, {
            where: { id: id }
          });
        return res.status(201).json({
            message: "Region modifiée",
            success: true,
        });
    } catch(err) {
        return res.status(500).json({
            message: "username,email et telephone doivent etre unique",
            success: false,
        });
    }
};





const getDepartements = async(req, res) => {
    try {
        const item = await Departements.findAll(
            {
                include: [
                  { model: db.regions },
                ]
              }
        );
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






const getOne = async(req, res) => {
    try {
      console.log("=----------------=-----------")
        const item = await Departements.findByPk(req.params.id);
        if(item) {
            console.log("Departements"+JSON.stringify(item));
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
    getDepartements,
}

