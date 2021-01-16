import massive from 'massive';
import pgm from 'pg-monitor';

import conf from '../config/config.js';

const connstring = conf.db.conn;

/*
const db = await massive({
  connstring,
  ssl: false
}).then(db => {
  pgm.attach(db.driverConfig);

  db.query('SELECT NOW()').then(data => {
    console.log(data);
  });
});
*/

const db = await massive({
  connstring,
  ssl: false
},
{
  // massive.js config
  allowedSchemas: ['wxschema']
});

pgm.attach(db.driverConfig);

//const tables = db.listTables();
//console.log(tables);

const data = await db.query('SELECT NOW()');
console.log('Connected to database: ' + data[0].now);

export default db;
