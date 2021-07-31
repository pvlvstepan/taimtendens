import {initDB} from '@lib/mysql';

export function post(req, res) {
  const {db} = initDB();

  const {user_tp, role_id} = req.body;

  db.query(`DELETE FROM user WHERE user_tp = ${user_tp}`, err => {
    if (err) {
      console.log('[mysql]:', err.message);
      res.end(JSON.stringify({error: 'Something went wrong...'}));
    } else {
      if (role_id === 0) {
        db.query(`DELETE FROM student WHERE user_tp = ${user_tp}`, err => {
          if (err) {
            console.log('[mysql]:', err.message);
            res.end(JSON.stringify({error: 'Something went wrong...'}));
          } else {
            res.end(JSON.stringify({message: 'OK'}));
          }
        });
        db.query(`DELETE FROM attendance WHERE user_tp = ${user_tp}`, err => {
          if (err) {
            console.log('[mysql]:', err.message);
            res.end(JSON.stringify({error: 'Something went wrong...'}));
          } else {
            res.end(JSON.stringify({message: 'OK'}));
          }
        });
      } else if (role_id === 1) {
        db.query(`DELETE FROM lecturer WHERE user_tp = ${user_tp}`, err => {
          if (err) {
            console.log('[mysql]:', err.message);
            res.end(JSON.stringify({error: 'Something went wrong...'}));
          } else {
            res.end(JSON.stringify({message: 'OK'}));
          }
        });
      } else {
        res.end(JSON.stringify({message: 'OK'}));
      }
    }
  });
}
