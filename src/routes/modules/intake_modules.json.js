import { initDB } from '@lib/mysql';

export function get(req, res) {
  const { db } = initDB();
  db.query(`SELECT * FROM intake_module ORDER BY intake_id ASC`, (err, results, fields) => {
    if (err) throw err;
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    res.end(JSON.stringify(results));
  });

}