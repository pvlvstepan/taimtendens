import { initDB } from '@lib/mysql';

export function post(req, res) {
  const { db } = initDB();

  const { tpNumber, password } = req.body;

  db.query(`SELECT user.user_tp FROM user WHERE user.user_tp = ${tpNumber} AND password = "${password}"`, (err, results) => {
    if (err) {
      console.log('[mysql]:', err.message);
      res.end(JSON.stringify({ error: 'Something went wrong...' }));
    } else if (results.length < 1) {
      res.end(JSON.stringify({ error: 'Wrong TP Number or password' }));
    } else {
      req.session.token = tpNumber;
      req.session.isLoggedIn = true;
      res.end(JSON.stringify({ message: 'Login success', token: tpNumber }));
    }
  });
}