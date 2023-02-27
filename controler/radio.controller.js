
const db = require("../models");
const Radio = db.radio
const Op = db.Sequelize.Op;
var fs = require("fs");



const createRadio = async (data, res) => {
    try {
        console.log("============================================================")
        console.log(data)

        console.log("============================================================")
       /*  const radioName = await validateradioName(data.rad_titre);
        if (patientName) {
            return res.status(400).json({
                message: "Erreur patient name existe deja",
                status: false,
            });
        } */
        await Radio.create(data);
        return res.status(200).json({
            message: "Radio ajoutée avec succès",
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

const clearImage = (filePath) => {
    filePath = path.join(__dirname, "..", filePath);
    fs.unlink(filePath, (err) => console.log(err));
  };

const removeOne = async (req, res) => {
    try {
        const getRadio = await Radio.findByPk(req.params.id)
       
    console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^")
    console.log(getRadio)
    console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^")
        const deleteFile = "../../uploads/"+getRadio?.rad_img
        if (fs.existsSync(deleteFile)) {
            fs.unlink(deleteFile, (err) => {
                if (err) {
                    console.log(err);
                }
                console.log('deleted');
            })
        }
         const deleted = await Radio.destroy({ where: { id: req.params.id } });
        if (!deleted) {
            return res.status(404).json({
                message: "Radio non trouvée",
                status: false,
            });
        }
        //clearImage("../../uploads/"+deleted?.rad_img);
        return res.status(200).json({
            message: "Radio supprimée avec succès",
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
        await Radio.update(req.body, { where: { id: req.body.id } });
        return res.status(200).json({
            message: "Radio modifiée avec success",
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
        const item = await Radio.findByPk(req.params.id, { include:[
                { model: db.patient},
                { model: db.hopital},
                { model: db.user,as: 'secretaire'},
                { model: db.user,as: 'docteur'},
         ],
         attributes: {
             exclude: ['password','passwordResetCode','isEmailVerified','verificationCode','createdAt','updatedAt']
          }});
        if (item) {
            return res.status(200).json(item);
        }
        return res.status(404).json({
            message: "Radio non trouvée",
            status: false,
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            status: false,
        });
    }
};

const getRadios = async (req, res) => {
    try {
        const radio = await Radio.findAll(
            { include:[
                { model: db.patient},
                { model: db.hopital},
                { model: db.user,as: 'secretaire'},
                { model: db.user,as: 'docteur'},
             ],
             attributes: {
                 exclude: ['password']
              }}
        )
        if (radio) {
            console.log(radio)
            return res.status(200).json(radio);
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error.message,
            status: false,
        });
    }
}




const validatepatientName = async (patientName) => {
    let patient = await Radio.findOne({ where: { pat_nom: patientName } });
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
    getRadios,
    createRadio
}

