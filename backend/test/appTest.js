const mongooose = require('mongoose');
const chai = require('chai')
const chaiHttp = require('chai-http');
const server = require('./../app');
const request = require('supertest');
//const should = chai.should;
//const expect= require('expect');
const should = require('should');
let expect = chai.expect;
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


chai.should()
describe("GET /homepage", () => {
    it("It should GET all the articles", (done) => {
        chai.request(server)
            .get("/homepage")
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                done();
            })
    })
    it("It should not GET all the articles", (done) => {
        chai.request(server)
            .get("/homepage1")
            .end((err, response) => {
                response.should.have.status(404);
                done();
            })
    })

});

chai.should()
describe("GET /profile/myArticles", () => {
    it("It should GET all the articles by user", (done) => {
        chai.request(server)
            .get("/profile/myArticles")
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                done();
            })
        it("It should not GET all the articles by user", (done) => {
            chai.request(server)
                .get("/homepage1")
                .end((err, response) => {
                    response.should.have.status(404);
                    done();
                })
        })
        it("It should not GET all the articles by user", (done) => {
            chai.request(server)
                .get("/profile/myArticles")
                .end((err, response) => {
                    response.should.have.status(404);
                    done();
                })
        })

    })
});

chai.should()
describe("GET /profile/myArticles/:slug", () => {
    it("It should GET the particular article by user", (done) => {
        var testid = "the-most-mispronounced-word-in-the-world"
        chai.request(server)
            .get("/profile/myArticles/" + testid)
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                done();
            })
        it("It should not GET the particular article by user", (done) => {
            chai.request(server)
                .get("/homepage1")
                .end((err, response) => {
                    response.should.have.status(404);
                    done();
                })
        })
        it("It should not GET the particular article by user", (done) => {
            chai.request(server)
                .get("/profile/myArticles/")
                .end((err, response) => {
                    response.should.have.status(404);
                    done();
                })
        })
    })
});


chai.should()
describe("GET /profile/myComments/:id", () => {
    it("It should GET all the comments by user", (done) => {
        var testid = "5f0a37ac7f98494700b990b0"
        chai.request(server)
            .get("/profile/myComments/" + testid)
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                done();
            })
        it("It should not GET all the comments by user", (done) => {
            chai.request(server)
                .get("/homepage1")
                .end((err, response) => {
                    response.should.have.status(404);
                    done();
                })
        })

        it("It should not GET all the comments by user", (done) => {
            chai.request(server)
                .get("/profile/myComments/")
                .end((err, response) => {
                    response.should.have.status(404);
                    done();
                })
        })
    })
});

chai.should()
describe("GET /article/:slug", () => {
    it("It should GET the particular article", (done) => {
        var testid = "the-most-mispronounced-word-in-the-world"
        chai.request(server)
            .get("/article/" + testid)
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                done();
            })
        it("It should not GET the particular article", (done) => {
            chai.request(server)
                .get("/homepage1")
                .end((err, response) => {
                    response.should.have.status(404);
                    done();
                })
        })

        it("It should not GET the particular article", (done) => {
            chai.request(server)
                .get("/article/")
                .end((err, response) => {
                    response.should.have.status(404);
                    done();
                })
        })

    })
});

chai.should()
describe("GET /article/comments/:id", () => {
    it("It should GET all comments on an article", (done) => {
        var testid = "5f0a37ac7f98494700b990b0"
        chai.request(server)
            .get("/article/comments" + testid)
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');

                done();
            })
        it("It should not  GET all comments on an articles", (done) => {
            chai.request(server)
                .get("/homepage1")
                .end((err, response) => {
                    response.should.have.status(404);
                    done();
                })
        })
        it("It should not  GET all comments on an articles", (done) => {
            chai.request(server)
                .get("/article/comments")
                .end((err, response) => {
                    response.should.have.status(404);
                    done();
                })

    })
});

chai.should()
describe("GET /article/edit/:id", () => {
    it("It should GET edit for an article", (done) => {
        var testid = "5f0a1f966c27ca6da897500f"
        chai.request(server)
            .get("/article/edit/" + testid)
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');

                done();
            })

        it("It should not  GET edit for an article", (done) => {
            chai.request(server)
                .get("/homepage1")
                .end((err, response) => {
                    response.should.have.status(404);
                    done();
                })
        })
        it("It should not  GET edit for an article", (done) => {
            chai.request(server)
                .get("/article/edit/")
                .end((err, response) => {
                    response.should.have.status(404);
                    done();
                })
        })

        
    })
})});