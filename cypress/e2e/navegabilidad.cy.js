describe('Test de navegabilidad en la página', () => {

    // Accede a las variables de entorno cargadas
    const userEmail = Cypress.env('TEST_USER');
    const userPassword = Cypress.env('TEST_PASS');
    const adminEmail = Cypress.env('ADMIN_USER');
    const adminPassword = Cypress.env('ADMIN_PASS');
  
    const loginAsUser = (email, password) => {
      cy.visit('/login');
      cy.get('input#form3Example3').type(email);
      cy.get('input#form3Example4').type(password);
      cy.get('button[type="submit"]').click();
    };
  
    // Comando para iniciar sesión como administrador
    const loginAsAdmin = (email, password) => {
      cy.visit('/login');
      cy.get('input#form3Example3').type(email);
      cy.get('input#form3Example4').type(password);
      cy.get('button[type="submit"]').click();
    };
  
    it('Debería permitir la navegación entre las pestañas como usuario', () => {
      loginAsUser(userEmail, userPassword);

      // Navegar a la página de productos
      cy.get('nav').contains('Productos').click();
      cy.url().should('include', '/productos');  // Verificar que la URL sea la correcta
  
      // Navegar a la página de contacto
      cy.get('nav').contains('Contacto').click();
      cy.url().should('include', '/contacto');  // Verificar que la URL sea la correcta
  
      // Navegar al carrito
      cy.get('button.cart-btn').find('i.fa-cart-shopping').click();
      cy.url().should('include', '/cart');  // Verificar que la URL sea la correcta
  
      // Navegar al perfil fa-solid
      cy.get('a[routerLink="/perfilUsuario"]').click();
        cy.url().should('include', '/perfilUsuario');
 // Verificar que la URL sea la correcta
    });
  
    it('No debería permitir el acceso al panel de administración para un usuario no administrador', () => {
      // Iniciar sesión como usuario regular
      loginAsUser(userEmail, userPassword);

      cy.get('nav').contains('Admin Panel').should('not.exist');
      cy.visit('/admin-panel');
      cy.url().should('eq', 'http://localhost:4200/');
    });
  
    it('Debería permitir el acceso al panel de administración para un administrador', () => {
      // Iniciar sesión como administrador
      loginAsAdmin(adminEmail, adminPassword);
      // Intentar acceder al panel de administración
      cy.get('nav').contains('Admin Panel').click();
      cy.url().should('include', '/admin-panel');  // Verificar que la URL incluye /admin
    });
  
  });
  