/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function(){
        cy.visit('./src/index.html') 
        // antes de cada teste ele vai visitar a url da aplicação
    })
    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT') 
        // testa se o titulo é igual ao testado  
    })
    it('preenche os campos obrigatórios e envia o formulário', function() {
        const longText = 'O texto que vai ser digitado será muito longe e vamos usar o delay para que ao invez de usar o normal que e de 10 milisegundos queremos q o tste seja rapido e vamos usaro delay q vai ser de 0 segundos'
        cy.get('#firstName').type('Adriano')
        cy.get('#lastName').type('Costa')
        cy.get('#email').type('adriano@teste.com')
        cy.get('#open-text-area').type(longText, {delay: 0})
        cy.get('button[type="submit"]').click() 
        
        // testa se a msg q esta visivel apos clicar por x segundos esta sendo mostrada
        cy.get('.success').should('be.visible')
    })
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        cy.get('#firstName').type('Adriano')
        cy.get('#lastName').type('Costa')
        cy.get('#email').type('adriano@teste,com')
        cy.get('#open-text-area').type('teste')
        cy.get('button[type="submit"]').click() 
        
        // testa se a msg q esta visivel apos clicar por x segundos esta sendo mostrada
        cy.get('.error').should('be.visible')
    })
    it('campo telefone continua vazio quando preenchido com valor não-numérico', function() {
        cy.get('#phone').type('abacdefghijklmnopqrstuv').should('have.value', '')
    })
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        cy.get('#firstName').type('Adriano')
        cy.get('#lastName').type('Costa')
        cy.get('#email').type('adriano@teste.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('teste')
        cy.get('button[type="submit"]').click() 
        
        // testa se a msg q esta visivel apos clicar por x segundos esta sendo mostrada
        cy.get('.error').should('be.visible')
    })
    it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
        cy.get('#firstName').type('Adriano')
        .should('have.value', 'Adriano')
        .clear()
        .should('have.value', '')
        cy.get('#lastName').type('Costa').should('have.value', 'Costa')
        .clear().should('have.value', '')
        cy.get('#email').type('adriano@teste.com').should('have.value', 'adriano@teste.com')
        .clear().should('have.value', '')
        cy.get('#phone').type('123456789').should('have.value', '123456789')
        .clear().should('have.value', '')      
    })
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
        // vou usar o contains nno lugar do get, outra maneira de usar
        cy.contains('button', 'Enviar').click()        
        cy.get('.error').should('be.visible')
    })
    it('envia o formuário com sucesso usando um comando customizado', function() {
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')
    })
    it('seleciona um produto (YouTube) por seu texto', function() {
        cy.get('#product').select('YouTube').should('have.value', 'youtube')
    })
    it('seleciona um produto (Mentoria) por seu valor (value)', function() {
        cy.get('#product').select('mentoria').should('have.value', 'mentoria')
    })
    it('seleciona um produto (Blog) por seu índice', function() {
        cy.get('#product').select(1).should('have.value', 'blog')
    })
  })
  