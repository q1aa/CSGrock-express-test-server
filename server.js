const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

app.use((req, res, next) => {
    if(req.path == "/home" || req.path == "/api/v1/post" || req.path == "/api/v1/head") return next();

    var path = req.path;
    var method = req.method;
    var body = req.body;
    var headers = req.headers;
    
    console.log('path: ', path);
    console.log('method: ', method);
    console.log('body: ', body);
    console.log('headers: ', headers);

    res.status(200).send({ path, method, body, headers })

    next();
});

app.get('/home', (req, res) => {
    res.status(200).send(`
        <!DOCTYPE html>
        <html>
            <head>
            <link rel="stylesheet" href="style.css">
                <title>Home</title>
            </head>
            <body>
                <h1>Home</h1>
            </body>
        </html>
    `);
});

app.post('/api/v1/post', async (req, res) => {
    console.log('req.body: ', req.body);

    const { name, age } = req.body;
    if(!name || !age) {
        return res.status(400).send({ error: 'Missing name or age' });
    }
    res.status(201).send({ name, age });
});

app.head('/api/v1/head', (req, res) => {
    res.status(300).send({
        headers: req.headers
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));