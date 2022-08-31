require('dotenv').config();
const app = require('./app');
const routes = require('./routes');

app.use(routes);

app.use((err, _req, res, _next) => {
  const { code, message } = err;
  return res.status(code).json({ message });
});

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
