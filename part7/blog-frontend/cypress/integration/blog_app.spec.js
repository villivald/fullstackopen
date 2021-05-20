describe("Blog app", function () {
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
      cy.get(".warning")
        .should("contain", "Wrong username or password")
        .and("have.css", "border-color", "rgb(255, 0, 0)");
      cy.get("html").should("not.contain", "Lebron James is logged in");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "theking", password: "lalakers" });
    });

    it("a new blog can be created", function () {
      cy.contains("New blog").click();
      cy.get("#titleInput").type("Cypress");
      cy.get("#authorInput").type("Mr. C.Y. Press");
      cy.get("#urlInput").type("cypress.com");
      cy.get("#newBlogButton").click();
      cy.get("html").should("contain", "Cypress by Mr. C.Y. Press");
    });

    describe("and a blog exists", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "Cypress Test Blog",
          author: "Tester MC",
          url: "test.com",
          likes: 0,
        });
      });

      it("it can be liked", function () {
        cy.contains("Cypress Test Blog");
        cy.contains("View").click();
        cy.get(".likeButton").click();
        cy.get(".likeContainer").contains("1 like");
        cy.get(".likeButton").click();
        cy.get(".likeContainer").contains("2 likes");
      });
    });

    describe("blog can be created", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "Cypress Test Blog",
          author: "Tester MC",
          url: "test.com",
          likes: 0,
        });
      });

      it("and deleted by creator", function () {
        cy.contains("Cypress Test Blog");
        cy.contains("View").click();
        cy.contains("Remove").click();
        cy.get("html").should("not.contain", "Cypress Test Blog");
      });
    });

    describe("several blogs can be created", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "Blog with 1 like",
          author: "Tester 1",
          url: "test.com3",
          likes: 1,
        });
        cy.createBlog({
          title: "Blog with 15 likes",
          author: "Tester 2",
          url: "test.com2",
          likes: 15,
        });
        cy.createBlog({
          title: "Blog with 6 likes",
          author: "Tester 3",
          url: "test.com1",
          likes: 6,
        });
      });

      it("and they are automatically sorted by likes", function () {
        cy.get(".blog-container>.blogTitle").should((items) => {
          expect(items[0]).to.contain("Blog with 15 likes");
          expect(items[1]).to.contain("Blog with 6 likes");
          expect(items[2]).to.contain("Blog with 1 like");
        });
      });
    });
  });
});
