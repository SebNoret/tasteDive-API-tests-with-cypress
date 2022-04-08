///<reference types="cypress"/>

Cypress.Commands.add("apiRequest", (query, type, info, limit) => {
  cy.request({
    url: "https://tastedive.com/api/similar",
    qs: {
      q: query,
      type: type,
      info: info,
      limit: limit,
    },
  });
});
