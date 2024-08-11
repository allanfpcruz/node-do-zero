import { sql } from './db.js'

//apaga tabela
// sql`
// DROP TABLE IF EXISTS videos;
// `.then(() => {
//   console.log('tabela apagada')
// })

//cria tabela
sql`
CREATE TABLE videos (
  id          TEXT PRIMARY KEY,
  title       TEXT NOT NULL,
  description TEXT,
  duration    INTEGER
);
`.then(() => {
  console.log('Tabela criada')
})
