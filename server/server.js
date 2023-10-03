import express from 'express';

const htmlPath = '../';
const app = express();
const host = 'localhost';
const port = 4000;

app.use(express.static(htmlPath));
app.listen(port, () => {
    console.log(`Server path: ${htmlPath}`);
    console.log(`Server listening on: http://${host}:${port}`);
});