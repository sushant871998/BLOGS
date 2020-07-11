const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./../models/userModel');
const Admin = require('./../models/adminModel');
const GoogleStrategy= require('passport-google-oauth20');
const FacebookStrategy= require('passport-facebook');
const GitHubStrategy= require('passport-github');
require('dotenv').config();

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
            clientID: process.env.clientID,
            clientSecret:process.env.clientSecret

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
    //Facebook auth
    passport.use(
        new FacebookStrategy({
            //Facebook options
            callbackURL:'/auth/facebook/redirect',
            clientID:process.env.appID,
            clientSecret: process.env.appSecret,
            profileFields:["email", "name"]

        },(accessToken, refreshToken, profile, done)=>{
            User.findOne({ email:profile._json.email})
                .then(user=>{
                    if(user){
                        done(null,user);
                    } else {
                        new User({
                            userId: profile._json.id,
                            name: profile._json.first_name,
                            email: profile._json.email,
                            password: profile._json.first_name
                        }).save()
                          .then(newUser=>{
                               done(null,newUser)
                          })
                    }
                })
        })
    )
    
    //Github auth
    passport.use(new GitHubStrategy({
        clientID: process.env.gitClientId,
        clientSecret: process.env.gitClientSecret,
        callbackURL: '/auth/github/redirect'
    },(accessToken, refreshToken, profile, done)=>{

        User.findOne({ email: profile._json.email })
            .then(user=>{
                if(user){
                    done(null, user)
                } else {
                    new User({
                        userId: profile._json.id,
                        name: profile._json.name,
                        email: profile._json.email,
                        password: profile._json.name
                    }).save()
                      .then(newUser=>{
                          done(null, newUser)
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
            if(user){
                done(err, user);
            }
            else{
                Admin.findById(id,(err,user)=>{
                    done(err,user)
                })
            }
        });
        // User.findById(id,(err,user)=>{
        //     done(err, user);
        // });
    });    
};