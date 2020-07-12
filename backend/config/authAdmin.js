module.exports = {
    ensureAuthenticatedAdmin: function(req, res, next){
        if(req.isAuthenticated() && (req.headers.referer=='http://localhost:5000/admin' || req.headers.referer=='http://localhost:5000/admin/home'||req.headers.referer=='http://localhost:5000/admin/success' ||req.headers.referer=='http://localhost:5000/admin/new' )){
            return next();
        }
        //flash msg
        res.redirect('/admin');
    }
}