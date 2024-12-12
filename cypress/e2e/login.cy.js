require('dotenv').config({ path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env.development' });
describe('Prueba de login', () => {

    beforeEach(() => {
      
      cy.visit('http://localhost:4200/login'); 
    });
  
    it('Debería iniciar sesión con credenciales correctas', () => {
    
      cy.get('input#form3Example3').type('e2e@gmail.com'); 
      cy.get('input#form3Example4').type('12345678.'); 
      cy.get('button[type="submit"]').click();
      cy.url().should('include', '/'); 
    });
  
   /* it('Debería mostrar un mensaje de error con Swal.fire si las credenciales son incorrectas', () => {
      cy.window().then((win) => {
        cy.stub(win, 'Swal').as('swal');
      });
  

      cy.get('input#form3Example3').type('emailfalso@gmail.com');
      cy.get('input#form3Example4').type('passwordIncorrecto'); 
      
      cy.get('button[type="submit"]').click();
      cy.wait(2000); 
      cy.get('@swal').should('have.been.calledWith', {
        icon: 'error',
        title: 'Inicio de sesión fallido',
        text: 'Credenciales incorrectas. Por favor, verifique su nombre de usuario y contraseña.',
        timer: 1000
      });
    });*/
  
    it('Debería verificar que los campos de email y contraseña existan', () => {
      cy.get('input#form3Example3').should('exist');
      cy.get('input#form3Example4').should('exist'); 
    });
  
    /*it('Debería evitar el inicio de sesión si los campos están vacíos', () => {

      cy.get('button[type="submit"]').click();
      

      cy.url().should('include', '/login'); 
      cy.get('.error-message')
        .should('exist')
        .and('contain', 'Por favor, complete los campos'); 
    });*/

    it('Debería redirigir al usuario a la página de recuperación de contraseña', () => {

      cy.get('a[routerLink="/retrieve-pass"]').click();
      

      cy.url().should('include', '/retrieve-pass');
    });
  
    it('Debería redirigir al usuario a la página de registro si no tiene cuenta', () => {

      cy.get('a[routerLink="/signup"]').click();

      cy.url().should('include', '/signup');
    });
  
  
  });
  