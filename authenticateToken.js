const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccount.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // This is formatted based on the tutorial here:
  // https://javascript.plainenglish.io/lets-create-react-app-with-firebase-auth-express-backend-and-mongodb-database-805c83e4dadd
  // unfortunately, I do not see a 'database url' in my firebase settings, so I am copying the format of the example url and hoping this works.
  databaseURL: "https://bookbug-6289b.firebaseio.com",
});

async function decodeIDToken(req, res, next) {
  const header = req.headers.authorization;
  if (header !== 'Bearer null' &&
  req.headers.authorization.startsWith('Bearer ')) {

    const idToken = req.headers.authorization.split('Bearer ')[1];

    try {
      const decodedToken = await
      admin.auth().verifyIdToken(idToken);
      req['currentUser'] = decodedToken;
    } catch (err) {
      console.log(err);
    }
  }
  next();
}

module.exports = decodeIDToken;
