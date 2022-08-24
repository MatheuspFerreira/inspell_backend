const app = require('./src/app.js');
const port = process.env.PORT || 3000;

app.listen(port, () => {
   console.log(`Servidor conectado em http://localhost:${port}`)

});