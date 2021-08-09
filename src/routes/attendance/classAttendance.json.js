import { initDB } from '@lib/mysql';

export function post(req, res) {
  const { db } = initDB();
  db.query(
    `SELECT a.*, b.signed FROM (SELECT u.user_tp, u.first_name, u.last_name, u.profile_pic FROM user u INNER JOIN student s ON s.user_tp = u.user_tp WHERE u.role_id = 0 AND s.intake_id = '${req.body.intake_id}') a LEFT JOIN (SELECT a.user_tp, a.attendance_id as signed FROM attendance a WHERE a.timeslot_id = ${req.body.timeslot_id}) b ON a.user_tp = b.user_tp ORDER BY a.first_name ASC`,
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
