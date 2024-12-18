describe('Prueba de login', () => {

    beforeEach(() => {
      cy.intercept('POST', `${Cypress.env('apiUrl')}/signup`).as('signupRequest');
      cy.visit(`${Cypress.env('url')}/login`);
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

    it('Debería poder recuperar contraseña si el correo es válido', () => {
      cy.getUsers();
      cy.get('@users').then(({ userEmail, userPassword }) => {
      cy.get('a[routerLink="/retrieve-pass"]').click();
      cy.get('input#form3Example3').should('exist');
      cy.get('input#form3Example3').type(userEmail);
      cy.contains('button', 'Recuperar Contraseña').click();
      cy.contains('button', 'Verificar Código');
      })
    });

    it('Debería emitir un mensaje de error si el correo no es válido al recuperar contraseña', () => {
      cy.getUsers();
      cy.get('@users').then(({ userEmail, userPassword }) => {
      cy.get('a[routerLink="/retrieve-pass"]').click();
      cy.get('input#form3Example3').should('exist');
      cy.get('input#form3Example3').type('correoinvalido');
      cy.contains('button', 'Recuperar Contraseña').click();
      cy.verifyErrorMessage('Denegado');
      })
    });
  
    /*it('Debería sanitizar el input de correo y eliminar scripts', () => {
      const maliciousInput = "<script>alert('hackeado!')</script>";
  
      cy.get('input#form3Example3')
        .type(maliciousInput) 
        .should('not.have.value', maliciousInput) 
        .should('not.contain', 'script') 
        .should('not.contain', '<>'); 
    });
  
    it('Debería sanitizar el input de contraseña y no permitir caracteres peligrosos', () => {
      const maliciousPassword = "password123<script>alert('hackeado!')</script>";
  
      cy.get('input#form3Example4')
        .type(maliciousPassword)
        .should('not.have.value', maliciousPassword) 
        .should('not.contain', 'script') 
        .should('not.contain', '<>'); 
    });
  
    it('Debería normalizar el correo ingresado (remover espacios y caracteres extraños)', () => {
      const userEmail = '    usuario@example.com   ';
      const sanitizedEmail = 'usuario@example.com';
  
      cy.get('input#form3Example3')
        .type(userEmail)
        .blur(); 
        cy.get('input#form3Example3')
        .should('have.value', sanitizedEmail); 
    });
  
    it('Debería escapar los caracteres especiales para evitar XSS', () => {
      const specialCharsInput = `" onmouseover="alert('XSS!')"`;
  
      cy.get('input#form3Example3')
        .type(specialCharsInput) 
        .should('not.contain', `onmouseover`) // Verifica que no se permita la inyección
        .should('not.contain', '"') // Verifica que las comillas dobles estén escapadas
        .should('not.contain', "'"); 
    });
  
    it('Debería evitar la inyección de caracteres de SQL en el campo de contraseña', () => {
      const sqlInjectionInput = "admin' OR 1=1 --";
  
      cy.get('input#form3Example3')
        .type(sqlInjectionInput) 
        .should('not.contain', `' OR 1=1 --`) 
        .should('not.contain', '--'); 
    });
  
    it('Debería permitir solo correos válidos en el campo de correo', () => {
      const invalidEmail = 'notanemail';
      const validEmail = 'test@example.com';
  
      cy.get('input#form3Example3')
        .type(invalidEmail)
        .blur(); 
        cy.get('input#form3Example3')
        .should('have.class', 'ng-invalid'); 
      cy.get('input#form3Example3')
        .clear()
        .type(validEmail)
        .blur();
        cy.get('input#form3Example3')
        .should('not.have.class', 'ng-invalid'); 
    });*/
    
  });
  