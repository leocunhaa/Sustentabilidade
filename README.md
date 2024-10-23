# Formulário de Sustentabilidade

Este projeto é um site de formulário para registrar ações sustentáveis realizadas por setores de uma organização. Ele coleta dados do formulário e os armazena em um banco de dados MongoDB, além de gerar rankings das ações por setor.

## Funcionalidades

- Envio de dados de ações sustentáveis realizadas por diferentes setores.
- Registro das informações em um banco de dados MongoDB.
- Visualização do ranking dos setores que mais realizaram ações sustentáveis.
- Interface responsiva e intuitiva para fácil utilização.

## Tecnologias Utilizadas

### Frontend

- **HTML/CSS**: Interface do formulário e exibição do ranking.
- **Tailwind CSS**: Framework CSS para estilização responsiva.
- **JavaScript (Fetch API)**: Envio dos dados do formulário sem redirecionamento de página.

### Backend

- **Node.js**: Plataforma para o servidor backend.
- **Express.js**: Framework para criação das rotas e gerenciamento de requisições HTTP.
- **MongoDB**: Banco de dados NoSQL para armazenar os registros do formulário.
- **Mongoose**: ODM para modelar dados MongoDB com Node.js.
- **Body-parser**: Middleware para lidar com dados de requisições POST.