const app = require('./src/app.js');
const port = 3001;

app.listen(port, () => {
   console.log(`Servidor conectado em http://localhost:${port}`)

});