const app = require("../server");
const chai = require("chai");
const chaiHttp = require("chai-http");

const { expect } = chai;
chai.use(chaiHttp);
describe("Gets all transactions", () => {
  it("Gets all transactions from database", done => {
    chai
      .request(app)
      .get("/api/v1/transactions")
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
})

  //const { expect } = chai;
chai.use(chaiHttp);
describe("POST transaction", () => {
  it("Post new transaction to database", done => {
    chai
      .request(app)
      .post("/api/v1/transactions")
      .send({text: "Salmon", amount: 100 })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.success).to.eqls(true)
        done();
      });
  });
});

chai.use(chaiHttp);
describe("Signup", () => {
  it("Signs up a user", done => {
    chai
      .request(app)
      .post("/api/account/signup")
      .send({ firstName: "Hello", lastName: "World", email: "test10@gmail.com", password: 'test123'})
      .end((err, res) => {
        expect(res).to.have.status(201);
        done();
      });
  });
})

chai.use(chaiHttp);
describe("Signin", () => {
  it("User Sign in", done => {
    chai
      .request(app)
      .post("/api/account/signin")
      .send({  email: "test10@gmail.com", password: 'test123'})
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
})

chai.use(chaiHttp);
describe("Logout User", () => {
  it("Logout User", done => {
    chai
      .request(app)
      .get("/api/account/logout")
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
})

chai.use(chaiHttp);
describe("Verify User", () => {
  it("Verify User", done => {
    chai
      .request(app)
      .get("/api/account/verify")
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
})







