
const db = require("../models");
const Patient = db.patient
const Op = db.Sequelize.Op;



const createPatient = async (data, res) => {
    try {
        console.log("============================================================")
        console.log(data)

        console.log("============================================================")
        const patientName = await validatepatientName(data.pat_nom);
        if (patientName) {
            return res.status(400).json({
                message: "Erreur patient name existe deja",
                status: false,
            });
        }
        await Patient.create(data);
        return res.status(200).json({
            message: "Patient ajouté avec succès",
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
        const deleted = await Patient.destroy({ where: { id: req.params.id } });
        if (!deleted) {
            return res.status(404).json({
                message: "Patient non trouvé",
                status: false,
            });
        }
        return res.status(200).json({
            message: "Patient supprimé avec succès",
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
        await Patient.update(req.body, { where: { id: req.body.id } });
        return res.status(200).json({
            message: "Patient modifié",
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
        const item = await Patient.findByPk(req.params.id);
        if (item) {
            return res.status(200).json(item);
        }
        return res.status(404).json({
            message: "Patient non trouvé",
            status: false,
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            status: false,
        });
    }
};

const getPatients = async (req, res) => {
    try {
        const patient = await Patient.findAll()
        if (patient) {
            return res.status(200).json(patient);
        }
        return res.status(404).json({
            message: "Patient  non trouvé",
            status: false,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            status: false,
        });
    }
}



const validatepatientName = async (patientName) => {
    let patient = await Patient.findOne({ where: { pat_nom: patientName } });
    if (patient) {
        return true;
    } else {
        return false;
    }
};



module.exports = {
    removeOne,
    updateOne,
    getOne,
    getPatients,
    createPatient
}

