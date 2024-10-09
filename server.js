// Importar pacotes necessários
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const path = require('path'); // Importar o módulo path para lidar com caminhos de arquivos

// Inicializar o app Express
const app = express();

// Middleware para permitir o uso de JSON no body das requisições
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname)); // Servir arquivos estáticos da pasta atual (sustentability-form)

// Conectar ao MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Conectado ao MongoDB');
}).catch(err => {
  console.log('Erro ao conectar ao MongoDB', err);
});

// Definir o schema e modelo para o formulário
const formSchema = new mongoose.Schema({
  setor: { type: String, required: true },
  acao: { type: String, required: true },
  descricao: { type: String }
});

const FormSustentability = mongoose.model('FormSustentability', formSchema);

// Definir rota POST para receber os dados do formulário
app.post('/submit-form', async (req, res) => {
  const { setor, acao, descricao } = req.body;

  // Criar um novo documento no MongoDB
  try {
    const newEntry = new FormSustentability({ setor, acao, descricao });
    await newEntry.save();
    res.status(201).send('Ação sustentável registrada com sucesso!');
  } catch (err) {
    console.error('Erro ao registrar ação sustentável:', err);
    res.status(500).send('Erro ao registrar ação sustentável');
  }
});

// Definir rota GET para servir o arquivo HTML do formulário
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html')); // Certifique-se de que o arquivo index.html esteja na pasta sustentability-form
});

// Iniciar o servidor
const PORT = process.env.PORT || 3000; // Defina a porta padrão se não estiver no arquivo .env
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
