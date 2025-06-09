describe('TODOMvc App', () => {
  it('Verifica se app está abrindo', () => {
    cy.visit('')
  })

  it('Insere uma tarefa', () => {
    cy.visit(''); 

    cy.get('[data-cy=todo-input]')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1) 
      .first()
      .should('have.text', 'TP2 de Engenharia de Software'); 
  });

  it('Insere e deleta uma tarefa', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1);

    cy.get('[data-cy=todos-list] > li [data-cy=remove-todo-btn]')
      .invoke('show')
      .click();

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 0);
  });

  it('Filtra tarefas completas e ativas', () => {
    cy.visit(''); 

    cy.get('[data-cy=todo-input]')
      .type('TP2 de ES{enter}')
      .type('Prova de ES{enter}');

    cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]')
      .first()
      .click();

    cy.get('[data-cy=filter-active-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'Prova de ES');

    cy.get('[data-cy=filter-completed-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'TP2 de ES');

    cy.get('[data-cy=filter-all-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 2);
  });
  it('Teste de visita à página principal', () => {
    cy.visit('/');
  });

  it('Teste de clique no botão de "Nova Pergunta"', () => {
    cy.visit('/');
    cy.get('#botao-nova-pergunta').click();
    cy.get('#input-pergunta').should('be.visible');
  });

  it('Teste de cadastro de uma nova pergunta', () => {
    cy.visit('/');
    cy.get('#botao-nova-pergunta').click();
    cy.get('#input-pergunta').type('Qual a capital de Minas Gerais?');
    cy.get('#botao-cadastrar').click();
    cy.contains('Qual a capital de Minas Gerais?').should('be.visible');
  });

  // ==========================================================
  // Nossos 3 novos testes, já com o cy.visit('/') correto
  // ==========================================================

  it('Deve cadastrar uma resposta para uma pergunta existente', () => {
    cy.visit('/');

    // ETAPA 1: Cria uma pergunta para garantir o estado inicial do teste
    cy.get('#botao-nova-pergunta').click();
    cy.get('#input-pergunta').type('Qual a linguagem de programação usada pelo Cypress?');
    cy.get('#botao-cadastrar').click();

    // ETAPA 2: Encontra a pergunta e testa o fluxo de resposta
    cy.get('.botao-ver-respostas').click();
    cy.get('.input-resposta').type('JavaScript');
    cy.get('.botao-responder').click();

    // Verificação: Garante que a resposta apareceu na tela
    cy.contains('JavaScript').should('be.visible');
  });

  it('Não deve cadastrar uma pergunta com texto vazio', () => {
    cy.visit('/');
    cy.get('#botao-nova-pergunta').click();

    // Garante que não existe nenhuma pergunta na tela antes da ação
    cy.get('.pergunta').should('not.exist');

    // Clica no botão de cadastrar sem digitar nada no input
    cy.get('#botao-cadastrar').click();

    // Verificação: Garante que nenhuma pergunta foi adicionada ao DOM
    cy.get('.pergunta').should('not.exist');
  });

  it('Deve alternar a visibilidade da seção de respostas ao clicar no botão', () => {
    cy.visit('/');
    
    // ETAPA 1: Cria uma pergunta de teste
    cy.get('#botao-nova-pergunta').click();
    cy.get('#input-pergunta').type('Pergunta para teste de visibilidade');
    cy.get('#botao-cadastrar').click();

    // ETAPA 2: Realiza as ações e verificações
    // Clica uma vez para ABRIR a seção de respostas
    cy.get('.botao-ver-respostas').click();
    cy.get('.respostas-container').should('be.visible');

    // Clica uma segunda vez para FECHAR a seção de respostas
    cy.get('.botao-ver-respostas').click();
    cy.get('.respostas-container').should('not.be.visible');
  });
});
