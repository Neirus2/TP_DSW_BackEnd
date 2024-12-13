Cypress.Commands.add('login', (email, password) => {
    cy.visit('/login');
    cy.wait(2000);
    cy.get('input#form3Example3').type(email);
    cy.get('input#form3Example4').type(password);
    cy.get('button[type="submit"]').click();
  });

  // cy.login('sool@mail.com','contraseña');
  
  Cypress.Commands.add('verifyErrorMessage', (message) => {
    cy.get('.swal2-popup').should('be.visible');
    cy.get('.swal2-popup').should('have.class', 'swal2-show'); 
    cy.get('.swal2-popup').should('contain', message);
  });
  
    // cy.verifyErrorMessage('Credenciales incorrectas');

    Cypress.Commands.add('getUsers', () => {
      const users = {
        userEmail: Cypress.env('TEST_USER'),
        userPassword: Cypress.env('TEST_PASS'),
        adminEmail: Cypress.env('ADMIN_USER'),
        adminPassword: Cypress.env('ADMIN_PASS')
      };
      return cy.wrap(users).as('users'); 
    });

