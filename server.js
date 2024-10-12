const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Configuração do body-parser para ler dados enviados pelo formulário
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Servir a página HTML
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Rota para salvar os dados no JSON
app.post('/save', (req, res) => {
    const data = req.body;

    // Ler o arquivo JSON existente
    fs.readFile('data.json', 'utf8', (err, jsonData) => {
        if (err) {
            console.log('Erro ao ler o arquivo JSON', err);
            return res.status(500).send('Erro no servidor');
        }

        let dataArray = [];
        if (jsonData) {
            dataArray = JSON.parse(jsonData); // Converte JSON string para array
        }

        // Adiciona novos dados ao array
        dataArray.push(data);

        // Salvar o novo array de volta no arquivo JSON
        fs.writeFile('data.json', JSON.stringify(dataArray, null, 2), 'utf8', (err) => {
            if (err) {
                console.log('Erro ao salvar no arquivo JSON', err);
                return res.status(500).send('Erro no servidor');
            }

            res.send('Dados salvos com sucesso!');
        });
    });
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
