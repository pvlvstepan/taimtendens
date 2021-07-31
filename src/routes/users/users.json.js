import { initDB } from '@lib/mysql';

export function get(req, res) {
  const { db } = initDB();
  db.query(
    `SELECT user.user_tp, user.email, user.password, user.first_name, user.role_id, user.last_name, student.intake_id, lecturer.module_id, user.profile_pic FROM user LEFT JOIN student ON user.user_tp = student.user_tp LEFT JOIN lecturer ON lecturer.user_tp = user.user_tp ORDER BY user.first_name ASC`,
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
