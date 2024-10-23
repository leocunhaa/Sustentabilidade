// Importar pacotes necessários
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname)); // Isto serve os arquivos estáticos da pasta onde está o server.js

// Conectar ao MongoDB
mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 30000 // 30 segundos
}).then(() => {
  console.log('Conectado ao MongoDB');
}).catch(err => {
  console.log('Erro ao conectar ao MongoDB', err);
});

const formSchema = new mongoose.Schema({
  setor: { type: String, required: true },
  acao: { type: String, required: true },
  descricao: { type: String }
});

const FormSustentability = mongoose.model('FormSustentability', formSchema);

// Rota POST para receber os dados do formulário
app.post('/submit-form', async (req, res) => {
  const { setor, acao, descricao } = req.body;

  try {
    const newEntry = new FormSustentability({ setor, acao, descricao });
    await newEntry.save();
    res.status(201).send('Ação sustentável registrada com sucesso!');
  } catch (err) {
    console.error('Erro ao registrar ação sustentável:', err);
    res.status(500).send('Erro ao registrar ação sustentável');
  }
});

// Rota GET para gerar o ranking, sim estou usando o html aqui no js mesmo... gambiarra a gente aceita
app.get('/resultados', async (req, res) => {
  try {
    const ranking = await FormSustentability.aggregate([
      { $group: { _id: '$setor', total: { $sum: 1 } } },
      { $sort: { total: -1 } },
      { $limit: 3 }
    ]);

    res.send(`
      <!DOCTYPE html>
      <html lang="pt-br">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Resultados</title>
        <link href="/results.css" rel="stylesheet">
      </head>
      <body>
        <div class="container text-center">
          <h1>Resultados</h1>
          <div class="podium">
            ${ranking[1] ? `<div class="second col-md-3"><h2>2º Lugar</h2><p>${ranking[1]._id}</p><p>${ranking[1].total} ações</p></div>` : ''}
            ${ranking[0] ? `<div class="first col-md-3"><h2>1º Lugar</h2><p>${ranking[0]._id}</p><p>${ranking[0].total} ações</p></div>` : ''}
            ${ranking[2] ? `<div class="third col-md-3"><h2>3º Lugar</h2><p>${ranking[2]._id}</p><p>${ranking[2].total} ações</p></div>` : ''}
          </div>
          <a href="/" class="btn btn-success">Voltar para a página inicial</a>
        </div>
      </body>
      </html>
    `);
  } catch (err) {
    console.error('Erro ao gerar os resultados:', err);
    res.status(500).send('Erro ao gerar os resultados.');
  }
});

// Rota GET o arquivo HTML do formulário
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
