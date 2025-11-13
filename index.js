import cors from "cors";
import express from "express";
import banco from "./banco.js";
import Usuario from "../Back-end/controller/UsuarioController.js"
import Produto from "../Back-end/controller/ProdutoController.js"
import Pagamento from "./controller/PagamentoController.js";
import Comanda from "./controller/ComandaController.js";
import ComandaItens from "./controller/ComandaItensController.js";

try {
    await banco.authenticate();
    console.log('Conexão com o banco de dados realizada com sucesso.');
} catch (error) {
    console.error('Erro ao conectar com o banco de dados:', error);
}

const app = express();
app.use(express.json());

app.use(cors());

app.get('/teste', (req, res) => {
    res.send('Teste ok.');
});

// Rotas para usuarios 
app.get('/usuario', Usuario.listar);
app.get('/usuario/:id', Usuario.selecionar);
app.post('/usuario', Usuario.inserir);
app.put('/usuario/:id', Usuario.alterar);
app.delete('/usuario/:id', Usuario.excluir);

// Rotas para produto 
app.get('/produto', Produto.listar);
app.get('/produto/:id', Produto.selecionar);
app.post('/produto', Produto.inserir);
app.put('/produto/:id', Produto.alterar);
app.delete('/produto/:id', Produto.excluir);

// Rotas para pagamentos
app.get('/pagamento', Pagamento.listar);
app.get('/pagamento/:id', Pagamento.selecionar);
app.post('/pagamento', Pagamento.inserir);
app.put('/pagamento/:id', Pagamento.alterar);
app.delete('/pagamento/:id', Pagamento.excluir); 

// Rotas para comandas
app.get('/comanda', Comanda.listar);
app.get('/comanda/:id', Comanda.selecionar);
app.post('/comanda', Comanda.inserir);
app.put('/comanda/:id', Comanda.alterar);
app.delete('/comanda/:id', Comanda.excluir); 

// Rotas para comanda itens
app.get('/comandaitens', ComandaItens.listar);
app.get('/comandaitens/:id', ComandaItens.selecionar);
app.post('/comandaitens', ComandaItens.inserir);
app.put('/comandaitens/:id', ComandaItens.alterar);
app.delete('/comandaitens/:id', ComandaItens.excluir);

app.listen(4000, () => { console.log(`Servidor rodando.`) });
