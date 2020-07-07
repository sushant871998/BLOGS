module.exports = {
    ensureAuthenticated: function(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }
        //flash msg
        res.redirect('/login');
    }
}