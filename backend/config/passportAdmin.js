const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('./../models/adminModel');

module.exports=function (passport){
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, (email, password, done)=>{
            //Match Admin
            Admin.findOne({ email:email })
                .then(user=>{
                    if(!user){
                        return done(null, false, {message: 'That email is not registered'});
                    }

                    bcrypt.compare(password, user.password, (err,isMatch)=>{
                        if(err) throw err;

                        if(isMatch){
                            return done(null,user);
                        } else {
                            return done(null ,false, { message: 'Password incorrect' });
                        }
                    })
                })
                .catch(err=>{
                    console.log(err);
                })
        })
    );
    passport.serializeUser(function(user,done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done){
        Admin.findById(id,(err,user)=>{
            done(err, user);
        });
    });    
};