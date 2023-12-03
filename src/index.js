const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const app = express();
app.use(cors());
app.use(express.json({ limit: '25mb' }));
app.set('view engine', 'ejs');
require('dotenv').config();

async function getConnection() {
  //crear y configurar la conexion
  const connection = await mysql.createConnection({
    host: 'sql.freedb.tech',
    user: 'freedb_admin project',
    password: process.env.DBPASS,
    database: 'freedb_proyectosMolones'
  });
  connection.connect();
  return connection;
}

const port = 3500;
app.listen(port, () => {
  console.log(`ha arrancado mi server en http://localhost:${port}`);
});

app.get('/authors/list', async (req, res) => {
  const conn = await getConnection();
  const queryAuthors =
    'SELECT * FROM autora, proyectos WHERE proyectos.fk_autora = autora.idAutora;';
  const [results] = await conn.query(queryAuthors);
  conn.end();

  res.json(results);
});

app.post('/createproject', async (req, res) => {
  console.log('crear projecto');
  // 1. Hacer la query
  const queryInsertAutora =
    'INSERT INTO autora (autor, job, photo) VALUES (?, ?, ?); ';
  const queryInsertProyectos =
    'INSERT INTO proyectos (name, slogan, repo, demo, technologies, `desc`, image, fk_autora) VALUES (?, ?, ?, ?, ?, ?, ?, ?);';

  // 2. Hacer la conexión
  const conn = await getConnection();

  // 3. Ejecutar la query para la tabla autora
  const [resultsAutora] = await conn.query(queryInsertAutora, [
    req.body.autor,
    req.body.job,
    req.body.photo,
  ]);

  // 4. Ejecutar la query para la tabla proyectos
  const [resultsProyectos] = await conn.query(queryInsertProyectos, [
    req.body.name,
    req.body.slogan,
    req.body.repo,
    req.body.demo,
    req.body.technologies,
    req.body.desc,
    req.body.image,
    resultsAutora.insertId,
  ]);

  console.log(resultsAutora);
  console.log(resultsProyectos);

  conn.end();
  res.json({
    success: true,
    idNewAutora: resultsAutora.insertId,
    idNewProyectos: resultsProyectos.insertId,
    message: 'Se ha insertado correctamente',
    cardURL: `http://localhost:${port}/project/${resultsProyectos.insertId}`,
  });
});

app.get('/project/:idProject', async (req, res) => {
  const id = req.params.idProject;
  const selectProject =
    'SELECT * FROM autora, proyectos WHERE proyectos.fk_autora = autora.idAutora and idProject = ?;';
  const conn = await getConnection();
  const [results] = await conn.query(selectProject, [id]);
  console.log(results[0]);
  if (results.length === 0) {
    res.render('notFound');
  } else {
    res.render('detailProject', results[0]);
  }
});

const staticServerPath = './src/public-react';
app.use(express.static(staticServerPath));

const pathServerPublicStyles = './src/public-css';
app.use(express.static(pathServerPublicStyles));

const pathServerPublicImage = './src/public-image';
app.use(express.static(pathServerPublicImage));
