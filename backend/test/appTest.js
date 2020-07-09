const mongooose = require('mongoose');
const chai = require('chai')
const chaiHttp= require('chai-http');
const server = require('./../app');
const request = require('supertest');
let expect= chai.expect;

chai.use(chaiHttp);

describe('Welcome Page test',()=>{
    it('Render test',function (done) {
        chai.request(server)
            .get('/')
            .end((err, res)=>{
                expect(res).to.be.html;
                done();
            })
    });
});

describe('Admin Page test',()=>{
    it('Render test',function (done) {
        chai.request(server)
            .get('/admin')
            .end((err, res)=>{
                expect(res).to.be.html;
                done();
            })
    });
});

describe('Login page test',()=>{
    it('Render test',function (done) {
        chai.request(server)
            .get('/login')
            .end((err, res)=>{
                expect(res).to.be.html;
                done();
            })
    });
});

describe('Register Page test',()=>{
    it('Render test',function (done) {
        chai.request(server)
            .get('/register')
            .end((err, res)=>{
                expect(res).to.be.html;
                done();
            })
    });
});

describe('Login POST route testing',()=>{
    it('Correct Login values',(done)=>{
        request(server).post('/login')
                        .type('form')
                        .send({
                            email: 'n@n',
                            password:'1234'
                        })
                        .then((res)=>{
                            expect(res).redirectTo('/homepage');
                            done();
                        })
                        .catch(err=>done(err));
    });

    it('Invalid Login values',(done)=>{
        request(server).post('/login')
                        .type('form')
                        .send({
                            email: 'n@n',
                            password:'1'
                        })
                        .then((res)=>{
                            expect(res).redirectTo('/login/fail');
                            done();
                        })
                        .catch(err=>done(err));
    });

    it('No Login email  ',(done)=>{
        request(server).post('/login')
                        .type('form')
                        .send({
                            email: '',
                            password:'1234'
                        })
                        .then((res)=>{
                            expect(res).redirectTo('/login/fail');
                            done();
                        })
                        .catch(err=>done(err));
    });

    it('No Login password value',(done)=>{
        request(server).post('/login')
                        .type('form')
                        .send({
                            email: 'n@n',
                            password:''
                        })
                        .then((res)=>{
                            expect(res).redirectTo('/login/fail');
                            done();
                        })
                        .catch(err=>done(err));
    });

    it('Invalid Login values-2',(done)=>{
        request(server).post('/login')
                        .type('form')
                        .send({
                            email: 'b@b',
                            password:'1234'
                        })
                        .then((res)=>{
                            expect(res).redirectTo('/login/fail');
                            done();
                        })
                        .catch(err=>done(err));
    });
});

describe('Register POST route testing',()=>{
    it('User already exists',(done)=>{
        request(server).post('/register')
                        .type('form')
                        .send({
                            name: 'Nis',
                            email: 'n@n',
                            password:'1234'
                        })
                        .then((res)=>{
                            expect(res).redirectTo('/register/fail');
                            done();
                        })
                        .catch(err=>done(err));
    });

    it('No password field ',(done)=>{
        request(server).post('/register')
                        .type('form')
                        .send({
                            name: 'Nis',
                            email: 'n@n',
                            password:''
                        })
                        .then((res)=>{
                            expect(res).redirectTo('/register/fail');
                            done();
                        })
                        .catch(err=>done(err));
    });
});

describe('Admin Login POST route testing',()=>{
    it('Correct credentials',(done)=>{
        request(server).post('/admin')
                        .type('form')
                        .send({
                            email: 'n@n',
                            password:'1234'
                        })
                        .then((res)=>{
                            expect(res).redirectTo('/admin/home');
                            done();
                        })
                        .catch(err=>done(err));
    });

    it('Wrong credentials',(done)=>{
        request(server).post('/admin')
                        .type('form')
                        .send({
                            email: 'n@nnn',
                            password:'1234'
                        })
                        .then((res)=>{
                            expect(res).redirectTo('/admin/fail');
                            done();
                        })
                        .catch(err=>done(err));
    });

    it('Email not entered',(done)=>{
        request(server).post('/admin')
                        .type('form')
                        .send({
                            email: '',
                            password:'1234'
                        })
                        .then((res)=>{
                            expect(res).redirectTo('/admin/fail');
                            done();
                        })
                        .catch(err=>done(err));
    });
});