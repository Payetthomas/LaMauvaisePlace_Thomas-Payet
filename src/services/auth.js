module.exports = {
    login,
    register
};

const emailFictif = "thomas@example.com";
const mdpFictif = "azerty";
 
function login(req, res) {
    const {email, password} = req.body;

    if(email != emailFictif){
        return res.status(404).json({ message: "Email ou mot de passe incorrect" });
    }; 

    if(password != mdpFictif) {
        return res.status(404).json({ message: "Email ou mot de passe incorrect" });
    };

    res.status(200).json({
        message: "Vous etes connecté !"
    });

};

function register(req, res) {
    const {email, password, role} = req.body;


}