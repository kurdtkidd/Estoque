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
        valorFormatado = parseFloat(valor);
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
      }\nValor: ${produto.valor}\nQuantidade: ${produto.quantidade}\n`
    );
  });
}

function listarProdutos() {
  listagemProdutos();
  exibirMenu();
}

exibirMenu();
