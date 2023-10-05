
const db = require("../models");
const Communes = db.communes;
const Role = db.role;
const Op = db.Sequelize.Op;

const config = require("../config/auth.config");




const removeOne = async(req, res) => {
    try {
        const deleted = await Communes.destroy({ where: { id: req.params.id } });
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

      const cadre = await Communes.findOne({ where: { [Op.or]: [{id: req.body.id}] } });
      console.log("--------------|||||||||||||||||||||||||||||||||||||||||||||||||||||||------------------");
      console.log(cadre)

        await Communes.update(req.body, {
            where: { id: id }
          });
        return res.status(201).json({
            message: "Region modifié",
            success: true,
        });
    } catch(err) {
        return res.status(500).json({
            message: "username,email et telephone doivent etre unique",
            success: false,
        });
    }
};





const getCommunes = async(req, res) => {
    try {
        const item = await Communes.findAll(
            {
                include: [
                    { model: db.departements },
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
        const item = await Communes.findByPk(req.params.id);
        if(item) {
            console.log("Region"+JSON.stringify(item));
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
    getCommunes,
}

