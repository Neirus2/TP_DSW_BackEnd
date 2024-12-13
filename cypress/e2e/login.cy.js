require('dotenv').config({ path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env.development' });
cy.createTestUser();
describe('Prueba de login', () => {

    beforeEach(() => {
      cy.intercept('POST', 'http://localhost:3000/api/login').as('loginRequest');
      cy.visit('http://localhost:4200/login'); 
    });
  
    it('Debería iniciar sesión con credenciales correctas', () => {
    
      cy.get('input#form3Example3').type('e2e@gmail.com'); 
      cy.get('input#form3Example4').type('12345678.'); 
      cy.get('button[type="submit"]').click();
      cy.url().should('include', '/'); 
    });
  
    it('Debería mostrar un mensaje de error si las credenciales son incorrectas', () => {
      cy.get('input#form3Example3').type('usuario_incorrecto@gmail.com');
      cy.get('input#form3Example4').type('contraseña_incorrecta');
      cy.get('button[type="submit"]').click();
    
      cy.wait(1500); 

      cy.get('.swal2-popup').should('be.visible');
      
      cy.get('.swal2-popup').should('have.class', 'swal2-show'); 

      cy.get('.swal2-popup').should('contain', 'Inicio de sesión fallido');
    });
    
  
    it('Debería verificar que los campos de email y contraseña existan', () => {
      cy.get('input#form3Example3').should('exist');
      cy.get('input#form3Example4').should('exist'); 
    });
  
   it('Debería evitar el inicio de sesión si los campos están vacíos', () => {

      cy.get('button[type="submit"]').click();
      cy.url().should('include', '/login'); 

      cy.get('.swal2-popup').should('be.visible');
      
      cy.get('.swal2-popup').should('have.class', 'swal2-show'); 

      cy.get('.swal2-popup').should('contain', 'Inicio de sesión fallido');
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
  