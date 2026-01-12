const annoncesRoutes = require('./annonces');
const authRoutes = require('./auth');
const adminRoutes = require('./admin');

const initRoutes = (app) => {
    app.use('/home', (req,res,next)=> {
        res.status(200).json({
            message: "Home page"
        })
    });
    app.use('/annonces', annoncesRoutes);
    app.use('/auth', authRoutes);
    app.use('/admin', adminRoutes);
};

module.exports = initRoutes;