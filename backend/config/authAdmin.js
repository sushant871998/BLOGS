module.exports = {
    ensureAuthenticated: function(req, res, next){
        console.log(req.headers.referer)
        console.log('http://localhost:5000/admin')
        console.log(req.baseUrl)
        console.log('/admin')
        if(req.isAuthenticated()){
            return next();
        }
        //flash msg
        res.redirect('/login');
    }
}