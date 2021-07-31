import { initDB } from '@lib/mysql';

export function post(req, res) {
  const { db } = initDB();

  const { tpNumber, email, password } = req.body;

  db.query(
    `UPDATE user SET email = "${email}" WHERE user_tp = ${tpNumber} AND password = "${password}"`,
    err => {
      if (err) {
        console.log('[mysql]:', err.message);
        res.end(JSON.stringify({ error: 'Something went wrong...' }));
        db.end();
      } else {
        res.end(JSON.stringify({ message: 'UPDATE success' }));
        db.end();
      }

    }
  );
}
