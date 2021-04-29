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

  describe("Login", function () {
    it("user can login with correct credentials", function () {
      cy.contains("Log in").click();
      cy.get("#username").type("theking");
      cy.get("#password").type("lalakers");
      cy.get("#login-button").click();
      cy.contains("Lebron James is logged in");
      cy.get(".notification").should(
        "have.css",
        "border-color",
        "rgb(0, 128, 0)"
      );
    });

    it("login fails with wrong credentials", function () {
      cy.contains("Log in").click();
      cy.get("#username").type("uncledrew");
      cy.get("#password").type("biggysmalls");
      cy.get("#login-button").click();
      cy.contains("Wrong username or password");
      cy.get(".warning").should("have.css", "border-color", "rgb(255, 0, 0)");
    });
  });

  describe("When logged in", function () {
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
