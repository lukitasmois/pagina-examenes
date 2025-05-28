const express = require("express");
const app = express();
const port = 3000;
app.use(express.json())

app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
  console.log(`http://localhost:${port}`);
});

app.get('/',(req, res) =>{
  res.status(200).send("ok")
})