describe("Note app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "Lebron James",
      username: "theking",
      password: "lalakers",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.visit("http://localhost:3000");
  });

  it("front page can be opened", function () {
    cy.contains("Blogs");
  });

  it("login form can be opened", function () {
    cy.contains("Log in").click();
  });

  it("user can login", function () {
    cy.contains("Log in").click();
    cy.get("#username").type("theking");
    cy.get("#password").type("lalakers");
    cy.get("#login-button").click();
    cy.contains("Lebron James is logged in");
  });

  describe("when logged in", function () {
    beforeEach(function () {
      cy.contains("Log in").click();
      cy.get("#username").type("theking");
      cy.get("#password").type("lalakers");
      cy.get("#login-button").click();
    });

    it("a new note can be created", function () {
      cy.contains("New blog").click();
      cy.get("#titleInput").type("Cypress");
      cy.get("#authorInput").type("Mr. C.Y. Press");
      cy.get("#urlInput").type("cypress.com");
      cy.get("#newBlogButton").click();
      cy.contains("Cypress");
    });
  });
});
