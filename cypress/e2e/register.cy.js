describe('Prueba de registro', () => {

    beforeEach(() => {
      cy.intercept('POST', `${Cypress.env('apiUrl')}/signup`).as('signupRequest');
    });
    
it('Debería registrarse correctamente con datos no repetidos', () => {
        cy.register('11111','emailtest@gmail.com', '12345678A.', '123456789999','1111','Test 1111');
        cy.url().should('include', '/login');
        cy.verifyErrorMessage('Registro exitoso');
        const testEmail = 'emailtest@gmail.com'; 
        cy.request('DELETE', `${Cypress.env('apiUrl')}/deleteUserByEmail`, { email: testEmail }).then((response) => {
        expect(response.status).to.eq(200); 
        expect(response.body).to.have.property('message', 'Usuario eliminado correctamente');
       });

    }); //está bien si elimino así el usuario test?

    it('Debería mostrar un mensaje de error si los campos son inválidos', () => {
      cy.register('a','usuario_incorrecto@gmail.com','a','a','a','a')
      cy.verifyErrorMessage('Registro fallido');
    });
    
    it('Debería mostrar un mensaje de error si los campos están vacíos', () => {
        cy.visit('/signup');
        cy.get('button[type="submit"]').click();
        cy.verifyErrorMessage('Registro fallido');

      });
      
  });
  