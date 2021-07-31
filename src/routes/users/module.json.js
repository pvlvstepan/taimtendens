import { initDB } from '@lib/mysql';

export function get(req, res) {
  const { db } = initDB();
  db.query(
    `SELECT module_id as value, concat(module_name, ' (', module_id, ')') as name FROM module ORDER BY module_id ASC`,
    (err, results) => {
      if (err) throw err;
      res.writeHead(200, {
        'Content-Type': 'application/json'
      });
      res.end(JSON.stringify(results));
      db.end();
    }
  );

}
