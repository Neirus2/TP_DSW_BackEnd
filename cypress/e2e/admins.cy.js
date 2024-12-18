describe('Prueba de funciones de admins', () => { 

    beforeEach( ()=> {
        cy.visit(`${Cypress.env('url')}/login`);
        cy.getUsers();
        cy.get('@users').then(({ adminEmail, adminPassword }) => {
          cy.login(adminEmail, adminPassword);
          cy.get('button[type="submit"]').click();
          cy.url().should('include', '/'); 
        });
        cy.visit(`${Cypress.env('url')}/admin-panel`);
    });

    it('Debería poder manipular un proveedor', ()=>{
        const cuitTest= '11111';
        cy.get('button').contains('Alta Proveedor').click();
        cy.get('#cuit').type(cuitTest);
        cy.get('#businessName').type('Proveedor Test');
        cy.get('#address').type('Proveedor Test');
        cy.get('#phoneNumber').type('111111111111');
        cy.get('button').contains('Guardar Proveedor').click();
        cy.verifyErrorMessage('Proveedor creado con éxito!!')
        cy.get('button').contains('OK').click();
        cy.get('button').contains('Atrás').click();
        cy.get('button').contains('Modificación Proveedor').click();
        cy.get('#cuit').type(cuitTest);
        cy.get('button').contains('Buscar').click();
        cy.get('button').contains('Actualizar Proveedor').click();
        cy.get('#newAddress').type('Nueva Dirección Test');
        cy.get('button').contains('Guardar Cambios').click();
        cy.verifyErrorMessage('Proveedor actualizado con éxito')
        cy.request('DELETE', `${Cypress.env('apiUrl')}/deleteSuppliers`, { cuit: cuitTest }).then((response) => {
        expect(response.status).to.eq(200); 
        expect(response.body).to.have.property('message', 'Supplier eliminado correctamente');
    });
    });

});