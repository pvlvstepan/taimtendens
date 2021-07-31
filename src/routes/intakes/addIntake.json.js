import {initDB} from '@lib/mysql';

export function post(req, res) {
  const {db} = initDB();
  db.query(
    `INSERT INTO intake (intake_id, intake_name) VALUES ('${req.body.intake_id}', '${req.body.intake_name}')`,
    err => {
      if (err) {
        console.log('[mysql]:', err.message);
        res.end(JSON.stringify({error: 'Something went wrong...'}));
      } else {
        req.body.modules.map(val => {
          db.query(
            `INSERT INTO intake_module (intake_id, module_id, active) VALUES ('${req.body.intake_id}', '${val}', 1)`,
            err => {
              if (err) {
                console.log('[mysql]:', err.message);
                res.end(JSON.stringify({error: 'Something went wrong...'}));
              } else {
                res.end(JSON.stringify({message: 'OK'}));
              }
            }
          );
        });
      }
    }
  );
}
