const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let estoque = [];

function exibirMenu() {
  console.log("======= SISTEMA DE ESTOQUE =======\n");

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
      default:
        console.log("\nInforme uma opção válida.\n");
        exibirMenu();
    }
  });
}
exibirMenu();
