describe('Prueba de login', () => {

    beforeEach(() => {
      cy.intercept('POST', 'http://localhost:3000/api/login').as('loginRequest');
      cy.visit('http://localhost:4200/login');
    });
  
    it('Debería iniciar sesión con credenciales correctas', () => {
    cy.getUsers();
      cy.get('@users').then(({ userEmail, userPassword }) => {
        cy.login(userEmail, userPassword);
        cy.get('button[type="submit"]').click();
        cy.url().should('include', '/'); 
      });
    
    });
  
    it('Debería mostrar un mensaje de error si las credenciales son incorrectas', () => {
      cy.login('usuario_incorrecto@gmail.com','contraseña_incorrecta')
      cy.verifyErrorMessage('Inicio de sesión fallido');
    });
    
  
    it('Debería verificar que los campos de email y contraseña existan', () => {
      cy.get('input#form3Example3').should('exist');
      cy.get('input#form3Example4').should('exist'); 
    });
  
   it('Debería evitar el inicio de sesión si los campos están vacíos', () => {

      cy.get('button[type="submit"]').click();
      cy.url().should('include', '/login'); 
      cy.verifyErrorMessage('Inicio de sesión fallido');
  
    });

    it('Debería redirigir al usuario a la página de recuperación de contraseña', () => {

      cy.get('a[routerLink="/retrieve-pass"]').click();
      

      cy.url().should('include', '/retrieve-pass');
    });
  
    it('Debería redirigir al usuario a la página de registro si no tiene cuenta', () => {

      cy.get('a[routerLink="/signup"]').click();

      cy.url().should('include', '/signup');
    });
  
  
  });
  