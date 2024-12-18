describe('Test de navegabilidad en la página', () => {
  beforeEach(() => {
    cy.intercept('POST', `${Cypress.env('apiUrl')}/login`).as('loginRequest');
    cy.getUsers();
  });
  
    it('Debería permitir la navegación entre las pestañas como usuario', () => {
      
      cy.get('@users').then(({ userEmail, userPassword }) => {
        cy.login(userEmail, userPassword);

            cy.get('nav').contains('Productos').click();
            cy.url().should('include', '/productos');  
        
            cy.get('nav').contains('Contacto').click();
            cy.url().should('include', '/contacto');  
        
            cy.get('button.cart-btn').find('i.fa-cart-shopping').click();
            cy.url().should('include', '/cart'); 

            cy.get('a[routerLink="/perfilUsuario"]').click();
              cy.url().should('include', '/perfilUsuario');
      })
    });
    
    it('No debería permitir el acceso al panel de administración para un usuario no administrador', () => {
      cy.get('@users').then(({ userEmail, userPassword }) => {
        cy.login(userEmail, userPassword);
        
      cy.get('nav').contains('Admin Panel').should('not.exist');
      cy.visit('/admin-panel');
      cy.url().should('eq', `${Cypress.env('url')}/`);
      });
    });
  
    it('Debería permitir el acceso al panel de administración para un administrador', () => {
      cy.get('@users').then(({ adminEmail, adminPassword }) => {
        cy.login(adminEmail, adminPassword);
      cy.get('nav').contains('Admin Panel').click();
      cy.url().should('include', '/admin-panel'); 
      });
    });
  
  });
  