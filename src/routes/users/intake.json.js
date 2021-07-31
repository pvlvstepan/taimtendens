import { initDB } from '@lib/mysql';

export function get(req, res) {
  const { db } = initDB();
  db.query(
    `SELECT intake_id as value, concat(intake_name, ' (', intake_id, ')') as name FROM intake ORDER BY value ASC`,
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
