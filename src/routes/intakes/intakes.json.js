import { initDB } from '@lib/mysql';

export function get(req, res) {
  const { db } = initDB();
  db.query(
    `SELECT COUNT(s.user_tp) AS total_students, i.intake_id, i.intake_name FROM intake i LEFT JOIN student s ON i.intake_id = s.intake_id GROUP BY i.intake_id ORDER BY i.intake_name ASC`,
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
