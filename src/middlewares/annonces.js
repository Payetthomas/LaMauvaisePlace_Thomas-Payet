const { checkSchema } = require('express-validator');

const validateAnnoces =  async (req, res, next) => {

    const validation = await checkSchema({
        title: { notEmpty: true }
    }).run(req);

    if(!validation.isEmpty()){
        res.status(400).json({
            message: "le champ titre est manquant"
        });
    }
    console.log("annonce validated");
    console.log("validation :", validation.isEmpty())
    next();
};

module.exports = { 
    validateAnnoces 
};