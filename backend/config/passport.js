const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./../models/userModel');
const Admin = require('./../models/adminModel');
const GoogleStrategy= require('passport-google-oauth20');

module.exports=function (passport){
    passport.use('local-1',
        new LocalStrategy({ usernameField: 'email' }, (email, password, done)=>{
            //Match User
            User.findOne({ email:email })
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
    //Admin auth
    passport.use('local-2',
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
    //Google auth
    passport.use(
        new GoogleStrategy({
            //options
            callbackURL:'/auth/google/redirect',
            clientID: "1035247651503-u961cn7js471r8sjvoobbtph0729m7vv.apps.googleusercontent.com",
            clientSecret:"-J-D0WCyO_zo1RxGxYwyjNpS"
        },(accessToken, refreshToken, profile, done)=>{
            
            User.findOne({ email: profile._json.email })
                .then(user=>{
                    if(user){
                        done(null, user);
                    } else {
                        new User({
                            userId: profile.id,
                            name: profile.name.givenName,
                            email: profile._json.email,
                            password: profile.name.givenName,
                        }).save()
                          .then(newUser=>{
                              done(null, newUser);
                          })
                    }
                })       
        })
    )

    
    passport.serializeUser(function(user,done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done){
        User.findById(id,(err,user)=>{
            done(err, user);
        });
    });    
};