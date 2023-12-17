
const db = require("../models");
const Regions = db.regions;
const Role = db.role;
const Op = db.Sequelize.Op;

const config = require("../config/auth.config");




const removeOne = async(req, res) => {
    try {
        const deleted = await Regions.destroy({ where: { id: req.params.id } });

        console.log(req.body.id)
        console.log(deleted)

        if(!deleted) {
            return res.status(404).json({
                message: "Region non trouvée",
                success: false,
            });
        }
        return res.status(204).json({
            message: "Region supprimée avec success",
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

      const region = await Regions.findOne({ where: { [Op.or]: [{id: req.body.id}] } });
      console.log(region)

        await Regions.update(req.body, {
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





const getRegions = async(req, res) => {
    try {
        const item = await Regions.findAll();
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
        const item = await Regions.findByPk(req.params.id);
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




  

  
const addOne = async (req, res) => {
    try {
        const existingRegion = await Regions.findOne({ reg_name: req.body.reg_name  });

        console.log("============================================================")
        console.log(existingRegion)
        console.log(req.body)
        console.log("============================================================")

        if (existingRegion) {
            return res.status(400).json({
                message: "La région existe déjà",
                success: false,
            });
        }

        const newRegion = await Regions.create({ ...req.body });

        return res.status(201).json({
            message: "Région ajoutée avec succès",
            success: true,
            region: newRegion,
        });
    } catch (err) {
        console.error(err);

        return res.status(500).json({
            message: "Erreur lors de l'ajout de la région",
            success: false,
            error: err.message,
        });
    }
};




 


  

module.exports = {
    removeOne,
    updateOne,
    getOne,
    getRegions,
    addOne
}

