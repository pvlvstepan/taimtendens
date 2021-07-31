import { initDB } from '@lib/mysql';

export function get(req, res) {
  const { db } = initDB();
  db.query(
    `SELECT im.module_id, im.intake_id, m.module_name, im.active FROM intake_module im INNER JOIN module m ON m.module_id = im.module_id ORDER BY m.module_name ASC`,
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
