const isAdmin = (req, res, next) => {
    if (req.user.role !== "admin") return res.status(401).json({ message: "Only admin acces"});
    next();
};

module.exports = {
    isAdmin
};