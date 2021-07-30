import { initDB } from '@lib/mysql';

export function get(req, res) {
  const { db } = initDB();
  db.query(`SELECT m.module_id, m.module_name, u.first_name, u.last_name FROM module m LEFT JOIN lecturer l ON m.module_id = l.module_id LEFT JOIN user u ON u.user_tp = l.user_tp`, (err, results, fields) => {
    if (err) throw err;
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    res.end(JSON.stringify(results));
  });

}