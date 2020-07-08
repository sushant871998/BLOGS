const mongooose = require('mongoose');
const chai = require('chai')
const chaiHttp= require('chai-http');
const server = require('./../app');
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