import sirv from 'sirv';
import express from 'express';
import compression from 'compression';
import * as sapper from '@sapper/server';
import {json} from 'body-parser';
import session from 'express-session';
import sessionFileStore from 'session-file-store';

const {PORT, NODE_ENV} = process.env;
const dev = NODE_ENV === 'development';
const FileStore = new sessionFileStore(session);

express()
  .use(
    json(),
    session({
      secret: 'SomeSecretStringThatIsNotInGithub',
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 31536000
      },
      store: new FileStore({
        path: `.sessions`,
        retries: 0
      })
    }),
    compression({threshold: 0}),
    sirv('static', {dev}),
    sapper.middleware({
      session: (req, res) => ({
        isLoggedIn: req.session.isLoggedIn,
        token: req.session.token
      })
    })
  )
  .listen(PORT, err => {
    if (err) console.log('error', err);
  });
