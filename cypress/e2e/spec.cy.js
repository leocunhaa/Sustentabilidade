describe('My First Test', () => {
  it('Preenche o formulário de sustentabilidade e envia', () => {

    //Intercepta mensagens no console do navegador
    cy.on('window:console', (log) => {
      if (log.type === 'error') {
        // Verifica se a mensagem de erro esperada está no console
        expect(log.message).to.include('Erro ao registrar ação sustentável');
      }
    });
    
    // Visita o site
    cy.visit('http://localhost:3000/#');

    // includes '/commands/actions'
    cy.url().should('include', '/#')
    
    // Seleciona o setor "TI"
    cy.get('select[name="setor"]').select('TI'); // Ajuste o seletor para o campo <select> correto

    // Seleciona a ação "Apagar Luz"
    cy.get('select[name="acao"]').select('Apagar Luz'); // Ajuste o seletor para o campo <select> correto

    // Preenche a descrição
    cy.get('textarea[placeholder="Descreva sua ação sustentável (opcional)"]').type('Desliguei a luz ontem às 14:00'); // Ajuste o seletor se necessário


    // Clica no botão "Enviar"
    cy.contains('Enviar').click();
    
  });
});
