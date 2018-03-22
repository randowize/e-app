import * as app from './main/app';
import * as dbconnector from './api/db-con-control';
(async function () {
  await dbconnector.connect();
  console.log('connection established !!!');
  app.lauch();
})();
