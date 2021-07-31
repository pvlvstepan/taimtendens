import { initDB } from '@lib/mysql';

export function post(req, res) {
  const { db } = initDB();
  db.query(
    `SELECT user.user_tp, user.first_name, user.last_name, user.email, lecturer.module_id, user.role_id, student.intake_id, user.profile_pic FROM user LEFT JOIN student ON user.user_tp = student.user_tp LEFT JOIN lecturer ON lecturer.user_tp = user.user_tp WHERE user.user_tp = ${req.body.token};`,
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
