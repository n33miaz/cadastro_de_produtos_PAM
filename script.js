const produtos = [];

const input_nome = document.getElementById("input_nome");
const input_preco = document.getElementById("input_preco");
const input_categoria = document.getElementById("input_categoria");
const botao_listar = document.getElementById("botao_listar");

function cadastrarProduto() {
    if (!input_nome.value || !input_preco.value || !input_categoria.value) {
        return alert("Todos os campos são obrigatórios!");
    }

    const produto = {
        nome: input_nome.value,
        preco: parseFloat(input_preco.value).toFixed(2),
        categoria: input_categoria.value
    };

    produtos.push(produto);
    alert("Produto cadastrado com sucesso!");
    botao_listar.disabled = false;

    // dispara a animação de confetti
    confetti({
        particleCount: 100, 
        spread: 70,         
        origin: { y: 0.6 }  
    });

    // limpa os campos do formulário
    input_nome.value = "";
    input_preco.value = "";
    input_categoria.value = "Eletrônicos";
}

function listarProdutos() {
    if (produtos.length === 0) {
        return alert("Nenhum produto cadastrado.");
    }

    const lista = document.getElementById("lista");
    lista.innerHTML = "";

    produtos.forEach((produto, index) => {
        lista.innerHTML += `
            <div class="produto">
                <h3>${produto.nome}</h3>
                <p>Preço: R$ ${produto.preco}</p>
                <p>Categoria: ${produto.categoria}</p>
                <button onclick="removerProduto(${index})">Remover</button>
            </div>
        `;
    });
}

function removerProduto(index) {
    produtos.splice(index, 1);
    listarProdutos();
}

function filtrarProdutos() {
    const categoriaSelecionada = filtro_categoria.value;
    const lista = document.getElementById("lista");
    lista.innerHTML = "";

    const produtosFiltrados = categoriaSelecionada === "Todas"
        ? produtos
        : produtos.filter(produto => produto.categoria === categoriaSelecionada);

    if (produtosFiltrados.length === 0) {
        lista.innerHTML = "<p>Nenhum produto encontrado.</p>";
        return;
    }

    produtosFiltrados.forEach((produto, index) => {
        lista.innerHTML += `
            <div class="produto">
                <h3>${produto.nome}</h3>
                <p>Preço: R$ ${produto.preco}</p>
                <p>Categoria: ${produto.categoria}</p>
                <button onclick="removerProduto(${index})">Remover</button>
            </div>
        `;
    });
}