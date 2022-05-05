describe('Note app', function() {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');

    const user = {
      name: 'Nubster Tester',
      username: 'nub',
      password: 'password',
    };

    cy.request('POST', 'http://localhost:3001/api/users', user);
    cy.visit('http://localhost:3000');
  });

  it('front page can be opened', function () {
    cy.contains('Notes');
    cy.contains('Note app');
  });

  it('user can log in', function() {
    cy.contains('login').click();
    cy.get('#username').type('nub');
    cy.get('#password').type('password');
    cy.get('#login-button').click();

    cy.contains('Nubster Tester logged in');
  });

  it('login fails with the wrong password', function () {
    cy.contains('login').click();
    cy.get('#username').type('nub');
    cy.get('#password').type('bad password');
    cy.get('#login-button').click();

    cy.get('.error')
      .should('contain', 'Wrong credentials')
      .and('have.css', 'border-style', 'solid');

    cy.get('html').should('not.contain', 'Nubster Tester logged in');
  });

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'nub', password: 'password' });
    });

    it('a new note can be created', function () {
      cy.contains('new note').click();
      cy.get('input').type('a note created by cypress');
      cy.contains('save').click();
      cy.contains('a note created by cypress');
    });

    describe('and several notes exist', function () {
      beforeEach(function () {
        cy.createNote({ content: 'first test note', important: false });
        cy.createNote({ content: 'second test note', important: false });
        cy.createNote({ content: 'third test note', important: false });
      });

      it('one of those can be made important', function () {
        cy.contains('second test note').parent().find('button').as('theButton');
        cy.get('@theButton').click();
        cy.get('@theButton').should('contain', 'make not important');
      });
    });
  });
});