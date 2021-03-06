import { initDB } from '@lib/mysql';

export function post(req, res) {
  const { db } = initDB();
  db.query(
    `UPDATE intake SET intake_name = '${req.body.intake_name}' WHERE intake_id = '${req.body.intake_id}'`,
    err => {
      if (err) {
        console.log('[mysql]:', err.message);
        res.end(JSON.stringify({ error: 'Something went wrong...' }));
        db.end();
      } else {
        db.query(
          `DELETE FROM intake_module WHERE intake_id = '${req.body.intake_id}'`,
          err => {
            if (err) {
              console.log('[mysql]:', err.message);
              res.end(JSON.stringify({ error: 'Something went wrong...' }));
              db.end();
            } else {
              req.body.modules.map((val, index) => {
                db.query(
                  `INSERT INTO intake_module (intake_id, module_id, active) VALUES ('${req.body.intake_id}', '${val}', 0)`,
                  err => {
                    if (err) {
                      console.log('[mysql]:', err.message);
                      res.end(
                        JSON.stringify({ error: 'Something went wrong...' })
                      );
                      db.end();
                    } else {
                      req.body.activeModules.map(value => {
                        if (val === value) {
                          db.query(
                            `UPDATE intake_module SET active = 1 WHERE intake_id = '${req.body.intake_id}' AND module_id = '${val}'`,
                            err => {
                              if (err) {
                                console.log('[mysql]:', err.message);
                                res.end(
                                  JSON.stringify({ error: 'Something went wrong...' })
                                );
                              }
                            }
                          );
                          if (index === (req.body.modules.length - 1)) db.end();
                        }
                      });
                      res.end(
                        JSON.stringify({ message: 'OK' })
                      );
                    }
                  }
                );
              });
            }
          }
        );
      }
    }
  );

}
