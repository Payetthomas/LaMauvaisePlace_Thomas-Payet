const annoncesRoutes = require('./annonces');

const initRoutes = (app) => {
    app.use('/home', (req,res,next)=> {
        res.status(200).json({
            message: "Home page"
        })
    });
    app.use('/annonces', annoncesRoutes)
};

module.exports = initRoutes;