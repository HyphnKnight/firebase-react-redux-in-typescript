const admin = require('firebase-admin');

const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://dnd-character.firebaseio.com"
});

const database = admin.database();

const fetchData =
  path =>
    database
      .ref(path)
      .once('value')
      .then((snapshot) => snapshot.val());

const setData =
  (path, value) =>
    database
      .ref(path)
      .set(value)
      .then(() => value);

const postData = (path, value) => {
  const ref = database.ref(path).push();
  return ref.set(value)
    .then(() => ref.key);
}

module.exports = { fetchData, setData, postData };
