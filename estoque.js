const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let produtos = [];

function exibirMenu() {
  console.log("\n======= SISTEMA DE ESTOQUE =======\n");

  console.log("1 - ADICIONAR PRODUTO AO ESTOQUE");
  console.log("2 - LISTAR PRODUTOS");
  console.log("3 - ATUALIZAR A QUANTIDADE DE UM PRODUTO EXISTENTE");
  console.log("4 - REMOVER PRODUTO");
  console.log(
    "5 - VERIFICAR PRODUTOS COM BAIXA QUANTIDADE EM ESTOQUE (MENOS DE 5 UNIDADES)"
  );
  console.log("6 - CALCULAR VALOR TOTAL DO ESTOQUE");
  console.log("7 - BUSCAR PRODUTO POR NOME");
  console.log("8 - BUSCAR PRODUTOS POR CATEGORIA");
  console.log("9 - SAIR");

  rl.question("Selecione a opção desejada: ", (opcao) => {
    opcaoFormatada = parseInt(opcao);

    switch (opcaoFormatada) {
      case 1:
        adicionarProduto();
        break;
      case 2:
        listarProdutos();
        break;
      case 3:
        atualizarQuantidade();
        break;
      case 4:
        removerProduto();
        break;
      case 5:
        verificarEstoque();
        break;
      case 6:
        calcularTotal();
        break;
      case 7:
        buscarPorNome();
        break;
      case 8:
        buscarPorCategoria();
        break;
      case 9:
        console.log("\nSaindo do sistema...\n");
        rl.close();
        break;
      default:
        console.log("\nInforme uma opção válida.\n");
        exibirMenu();
    }
  });
}

function adicionarProduto() {
  console.log("\n======= ADICIONAR PRODUTO =======\n");

  rl.question("Informe o nome do produto: ", (nome) => {
    rl.question("Informe a categoria do produto: ", (categoria) => {
      rl.question("Informe o valor do produto: ", (valor) => {
        valorFormatado = parseFloat(valor.replace(",", "."));
        if (isNaN(valorFormatado) || valorFormatado < 0) {
          console.log("\nValor inválido.\n");
          return adicionarProduto();
        }
        rl.question("Informe a quantidade de produtos: ", (quantidade) => {
          quantidadeFormatada = parseInt(quantidade);
          if (isNaN(quantidadeFormatada) || quantidadeFormatada < 0) {
            console.log("\nQuantidade inválida.\n");
            return adicionarProduto();
          }
          produtos.push({
            nome: nome,
            categoria: categoria,
            valor: valorFormatado,
            quantidade: quantidadeFormatada,
          });
          console.log("\nProduto adicionado com sucesso!");
          exibirMenu();
        });
      });
    });
  });
}

function listagemProdutos() {
  if (produtos.length === 0) {
    console.log("\nNão existem produtos cadastrados para listar.\n");
    return exibirMenu();
  }
  console.log("\n======= PRODUTOS CADASTRADOS =======\n");
  produtos.forEach((produto, index) => {
    console.log(
      `Índice: ${index + 1}\nNome: ${produto.nome}\nCategoria: ${
        produto.categoria
      }\nValor: R$${produto.valor.toFixed(2)}\nQuantidade: ${
        produto.quantidade
      }\n`
    );
  });
}

function listarProdutos() {
  listagemProdutos();
  exibirMenu();
}

function atualizarQuantidade() {
  listagemProdutos();

  rl.question(
    "Informe o índice do produto que deseja atualizar a quantidade: ",
    (indice) => {
      i = parseInt(indice) - 1;
      if (isNaN(i) || i < 0 || i >= produtos.length) {
        console.log("\nFavor informar um índice válido.\n");
        return atualizarQuantidade();
      }
      rl.question("Informe a nova quantidade: ", (novaQuantidade) => {
        novaQuantidadeFormatada = parseInt(novaQuantidade);
        if (isNaN(novaQuantidadeFormatada) || novaQuantidadeFormatada < 0) {
          console.log("\nInforme uma quantidade válida.\n");
          return atualizarQuantidade();
        }
        produtos[i].quantidade = novaQuantidadeFormatada;
        console.log("\nQuantidade atualizada com sucesso!\n");
        exibirMenu();
      });
    }
  );
}

function removerProduto() {
  listagemProdutos();
  rl.question("Informe o índice do produto que deseja remover: ", (indice) => {
    i = parseInt(indice) - 1;
    if (isNaN(i) || i < 0 || i >= produtos.length) {
      console.log("\nFavor informar um índice válido.\n");
      return removerProduto();
    }
    const removido = produtos.splice(i, 1)[0];
    console.log(`\nO produto: ${removido.nome} foi removido com sucesso!\n`);
    exibirMenu();
  });
}

function verificarEstoque() {
  const produtosBaixoEstoque = produtos.filter(
    (produto) => produto.quantidade < 5
  );

  if (produtosBaixoEstoque.length === 0) {
    console.log("\nNão há produtos com menos de 5 unidades no estoque.\n");
  } else {
    console.log("\n======= PRODUTOS COM BAIXO ESTOQUE =======\n");
    produtosBaixoEstoque.forEach((produto) => {
      console.log(`Nome: ${produto.nome}\nQuantidade: ${produto.quantidade}\n`);
    });
  }

  exibirMenu();
}

function calcularTotal() {
  if (produtos.length === 0) {
    console.log("\nNão há produtos no estoque para calcular o total.\n");
    return exibirMenu();
  }

  let total = 0;

  produtos.forEach((produto) => {
    total += produto.valor * produto.quantidade;
  });

  console.log(`\nValor total do estoque: R$ ${total.toFixed(2)}\n`);
  exibirMenu();
}

exibirMenu();
