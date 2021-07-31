import { initDB } from '@lib/mysql';

export function post(req, res) {
  const { db } = initDB();

  const { tpNumber, newPass, password } = req.body;

  db.query(
    `UPDATE user SET password = "${newPass}" WHERE user_tp = ${tpNumber} AND password = "${password}"`,
    err => {
      if (err) {
        console.log('[mysql]:', err.message);
        res.end(JSON.stringify({ error: 'Something went wrong...' }));
      } else {
        res.end(JSON.stringify({ message: 'UPDATE success' }));
      }
    }
  );
  db.end();
}
