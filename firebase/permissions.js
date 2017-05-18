const data = require('./data.json');

const keys = Object.keys(data);


const permissions = {};


const SESSION_ID = "$sessionId";
const USER_ID = "$uid";
const CHAR_ID = "$charid";

const CURRENT_USER = "auth.uid";

const IS_AUTH = "auth !== null";
const IS_CURRENT_USER = `${USER_ID} === ${CURRENT_USER}`;


const defaultPermissions = () => ({
  ".read": IS_AUTH,
  ".write": false,
});

const privatePermissions = () => ({
  ".read": false,
  ".write": false,
});

const currentUserPermissions = () => ({
  ".read": IS_CURRENT_USER,
  ".write": IS_CURRENT_USER,
});

const sessionPermissions = () => ({
  [SESSION_ID]: {
    ".read": `root.child('sessions/${SESSION_ID}/users/' + ${CURRENT_USER} ).exists()`,
    "id": {
      ".write": false
    },
    "name": {
      ".write": `root.child('sessions/${SESSION_ID}/dm/' + ${CURRENT_USER} ).exists()`,
    },
    "users": {
      ".write": `root.child('sessions/${SESSION_ID}/dm/' + ${CURRENT_USER} ).exists()`,
    },
  }
});

const userPermissions = () => ({
  [USER_ID]: currentUserPermissions()
});

keys.forEach(key => permissions[key] = defaultPermissions());

permissions.sessions = sessionPermissions();
permissions.users = userPermissions();

console.log(JSON.stringify({ rules: permissions }));
// node permissions.js > permissions.json
