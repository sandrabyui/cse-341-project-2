const isAuthenticated =(req,res,next) =>{
    if (req.session.user ===undefined){
        return res.staus(401).json("you do not have Access.");
    }
    next();
};

module.exports - {
    isAuthenticated
}