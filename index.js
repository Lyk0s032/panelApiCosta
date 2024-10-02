const express = require('express');
const bodyParser = require('body-parser');
const {db, Op } = require('./db/db');
const { getAllCalls, getCall, addCall, addEmail, newQRDATA, getAllByQr, getQrById } = require('./controllers/call');

const app = express();

app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
}); 

const PORT = process.env.PORT || 3002;

app.get('/', (req, res) => {
    res.send('Bienvenido al servidor de virtual');
});

// Consultar todos los registros
app.get('/call/get/', getAllCalls);
// Consultar registros especificos
app.get('/call/get/:callReference', getCall);
// Ingresar llamada - General
app.post('/call/post/new', addCall);
// Ingresar llamada 
app.post('/call/post/subscription', addEmail);


// QR
app.post('/qr/new', newQRDATA);
app.get('/qr/get/', getAllByQr);
app.get('/qr/get/:qrId', getQrById);

// Enciende el servidor
app.listen(PORT, () => {
    db.sync();
    console.log(`Server running on port ${PORT}`);
}); 