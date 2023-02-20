const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const authenticate = (req, res) => {
    res.redirect(
        `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`,
      );
};

const callback = ({ query: { code } }, res) => {
    const body = {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_SECRET,
        code
      };

    const opts = { headers: { accept: 'application/json' } };
    axios
        .post('https://github.com/login/oauth/access_token', body, opts)
        .then((_res) => _res.data)
        .then((data) => {
          console.log('My token:', data.access_token);
          res.send(`THIS IS MY TOKEN: ${data.access_token}`);  
        })
        .catch((err) => res.status(500).json({ err: err.message }));
};

module.exports = {
   authenticate,
   callback
};