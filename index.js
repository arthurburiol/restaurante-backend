import cors from "cors";
import express from "express";
import banco from "./banco.js";

import Usuario from "./controller/UsuarioController.js"
import Produto from "./controller/ProdutoController.js"
import Pagamento from "./controller/PagamentoController.js";
import Comanda from "./controller/ComandaController.js";
import ComandaItens from "./controller/ComandaItensController.js";
import  Login  from "./controller/LoginController.js";
import Relatorio from "./controller/RelatorioController.js";
import "./model/relacionamentos.js";


// Teste de conexão com o banco
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

//Login
// app.use("/login", loginRoute);
app.post("/login", Login.login);


// Rotas para relatórios
app.get('/relatorio/itens', Usuario.validarToken,Relatorio.vendasPorItens); 
app.get('/relatorio/total', Usuario.validarToken,Relatorio.valorTotalDoDia);
app.post('/relatorio/itensperiodo', Usuario.validarToken,Relatorio.vendasPorItensPeriodo);
app.post('/relatorio/totalperiodo', Usuario.validarToken,Relatorio.valorTotalDoPeriodo);


// Rotas para usuarios 
app.get('/usuario', Usuario.validarToken,Usuario.listar);
app.get('/usuario/:id', Usuario.validarToken,Usuario.selecionar);
app.post('/usuario', Usuario.inserir);
app.put('/usuario/:id', Usuario.validarToken,Usuario.alterar);
app.delete('/usuario/:id', Usuario.validarToken,Usuario.excluir); 
app.put('/senhausuarios', Usuario.validarToken, Usuario.definirSenha);

// Rotas para produto 
app.get('/produto', Usuario.validarToken,Produto.listar);
app.get('/produto/:id', Usuario.validarToken,Produto.selecionar);
app.post('/produto/selecionarporids', Usuario.validarToken,Produto.selecionarPorIds);
app.post('/produto', Usuario.validarToken,Produto.inserir);
app.put('/produto/:id', Usuario.validarToken,Produto.alterar);
app.delete('/produto/:id', Usuario.validarToken,Produto.excluir); 

// Rotas para pagamentos
app.get('/pagamento', Usuario.validarToken,Pagamento.listar);
app.get('/pagamento/:id', Usuario.validarToken,Pagamento.selecionar);
app.post('/pagamento', Usuario.validarToken,Pagamento.inserir);
app.put('/pagamento/:id', Usuario.validarToken,Pagamento.alterar);
app.delete('/pagamento/:id', Usuario.validarToken,Pagamento.excluir); 

// Rotas para comandas
app.get('/comanda', Usuario.validarToken,Comanda.listarComandaAberta);
app.get('/comanda/:id', Usuario.validarToken,Comanda.selecionar);
app.get('/comanda/listarComandaFechada', Usuario.validarToken, Comanda.listarComandaFechada);
app.post('/comanda', Usuario.validarToken,Comanda.inserir);
app.put('/comanda/:id', Usuario.validarToken,Comanda.alterar);
app.delete('/comanda/:id', Usuario.validarToken,Comanda.excluir); 

// Rotas para comanda itens
app.get('/comandaitens', Usuario.validarToken,ComandaItens.listar);
app.get('/comandaitens/bebidas', Usuario.validarToken,ComandaItens.listarBebidas);
app.get('/comandaitens/pratos', Usuario.validarToken,ComandaItens.listarPratos);
app.get('/comandaitens/:id_comanda', Usuario.validarToken,ComandaItens.selecionar);
app.post('/comanda/criar', Usuario.validarToken,ComandaItens.criarComanda);
app.post('/comandaitens', Usuario.validarToken,ComandaItens.inserir);
app.put('/comandaitens/:id', Usuario.validarToken,ComandaItens.alterar);
app.put('/comandaitens/alterarStatusItem/:id', Usuario.validarToken,ComandaItens.alterarStatusItem);
app.delete('/comandaitens/:id', Usuario.validarToken,ComandaItens.excluir);

app.listen(4000, () => { console.log(`Servidor rodando na porta 4000.`) });
