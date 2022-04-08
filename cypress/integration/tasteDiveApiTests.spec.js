/// <reference types="cypress" />

describe("test suite on similar route with all params", function () {
  it("should throw a get request with all params needed and receive a response corresponding to these params", function () {
    cy.fixture("data").then((requestData) => {
      let { band, type, info, limit } = requestData.filter(
        (item) => item.key === "allParams"
      )[0];

      cy.apiRequest(band, type, info, limit).then((response) => {
        expect(response.status).to.be.eq(200);
        expect(response.body).to.have.property("Similar");
        expect(response.body.Similar.Info[0].Name.toLowerCase()).to.be.eq(
          band.toLowerCase()
        );
        expect(response.body.Similar.Results.length).to.be.eq(5);
      });
    });
  });
});

describe("test suite on similar route without any param ", function () {
  it("should throw request with missing  params  and receive a body response with no info et result properties", function () {
    cy.fixture("data.json").then((requestData) => {
      let { band, type, info, limit } = requestData.filter(
        (item) => item.key === "emptyParams"
      )[0];

      cy.apiRequest(band, type, info, limit).then((response) => {
        expect(response.status).to.be.eq(200);
        expect(response.body).to.have.property("Similar");
        expect(response.body.Similar.Info.length).to.be.eq(2);
        expect(response.body.Similar.Info[0].Name).to.be.eq("");
        expect(response.body.Similar.Info[1].Name).to.be.eq("");
        expect(response.body.Similar.Results.length).to.be.eq(0);
      });
    });
  });
});

describe("test suite on similar route missing, info param ", function () {
  it("should throw a get request without an info param, ", function () {
    cy.fixture("data").then((requestData) => {
      let { band, type, info, limit } = requestData.filter(
        (item) => item.key === "withoutInfoParam"
      )[0];

      cy.apiRequest(band, type, info, limit).then((response) => {
        expect(response.status).to.be.eq(200);
        expect(response.body).to.have.property("Similar");
        expect(response.body.Similar.Info.length).to.be.eq(1);
        expect(response.body.Similar.Info[0]["wTesaser"]).to.be.eq(undefined);
        expect(response.body.Similar.Info[0].Name.toLowerCase()).to.be.eq(
          band.toLowerCase()
        );
        expect(response.body.Similar.Results.length).to.be.eq(5);
      });
    });
  });
});
