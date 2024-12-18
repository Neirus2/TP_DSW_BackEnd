Cypress.Commands.add('login', (email, password) => {
    cy.visit('/login');
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
  
  Cypress.Commands.add('register', (razon, email, pass, cuit, telef, address) =>{
    cy.visit('/signup');
    cy.wait(2000);
    cy.get('input#form3Example1').type(razon);
    cy.get('input#form3Example2').type(email);
    cy.get('input#form3Example3').type(pass);
    cy.get('input#form3Example4').type(cuit);
    cy.get('input#form3Example5').type(telef);
    cy.get('input#form3Example6').type(address);
    cy.get('button[type="submit"]').click();
    
  });
