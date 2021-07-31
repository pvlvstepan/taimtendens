import {initDB} from '@lib/mysql';

export function post(req, res) {
  const {db} = initDB();
  db.query(
    `SELECT m.module_id as value, concat(m.module_name, ' (', m.module_id, ')') as name FROM module m INNER JOIN intake_module im ON im.module_id = m.module_id WHERE im.active = 1 AND im.intake_id = '${req.body.intake_id}' ORDER BY m.module_id ASC`,
    (err, results) => {
      if (err) throw err;
      res.writeHead(200, {
        'Content-Type': 'application/json'
      });
      res.end(JSON.stringify(results));
    }
  );
}
