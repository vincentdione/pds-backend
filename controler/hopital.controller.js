
const db = require("../models");
const Hopital = db.hopital
const Op = db.Sequelize.Op;



const createHopital = async (data, res) => {
    try {
        console.log("============================================================")
        console.log(data)
        console.log("hopital")

        console.log("============================================================")
        const hopitalName = await validateHopitalName(data.hop_name);
        if (hopitalName) {
            return res.status(400).json({
                message: "Error hopital name existe deja",
                status: false,
            });
        }
        await Hopital.create(data);
        return res.status(200).json({
            message: "Hopital ajouté avec succès",
            status: true
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            status: false,
            body: data
        });
    }
};

const removeOne = async (req, res) => {
    try {
        console.log(req.params.id)
        const deleted = await Hopital.destroy({ where: { id: req.params.id } });
        if (!deleted) {
            return res.status(404).json({
                message: "Hopital non trouvé",
                status: false,
            });
        }
        return res.status(200).json({
            message: "Menu supprimé avec succès",
            status: true,
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            status: false,
        });
    }
};

const updateOne = async (req, res) => {
    try {
        console.log("============================================================")
        console.log(req.body)
        console.log(req.params)
        console.log("============================================================")
        await Hopital.update(req.body, { where: { id: req.body.id } });
        return res.status(200).json({
            message: "Hopital modifié",
            status: true,
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            status: false,
        });
    }
};


const getOne = async (req, res) => {
    try {
        const item = await Hopital.findByPk(req.params.id);
        if (item) {
            return res.status(200).json(item);
        }
        return res.status(404).json({
            message: "Hopital not found",
            status: false,
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            status: false,
        });
    }
};

const getHopitaux = async (req, res) => {
    try {
        const hopital = await Hopital.findAll()
        if (hopital) {
            return res.status(200).json(hopital);
        }
        return res.status(404).json({
            message: "Hopital menu not found",
            status: false,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            status: false,
        });
    }
}



const validateHopitalName = async (hopitalName) => {
    let hopital = await Hopital.findOne({ where: { hop_name: hopitalName } });
    if (hopital) {
        return true;
    } else {
        return false;
    }
};



module.exports = {
    removeOne,
    updateOne,
    getOne,
    getHopitaux,
    createHopital
}

