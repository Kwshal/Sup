import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getDatabase, ref, set, onValue, update, remove, push, get, onDisconnect, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-database.js";
const firebaseConfig = {
     apiKey: "AIzaSyCSbf8wxFIFpHJGsNvl5MzQKVht6GqMHZ4",
     authDomain: "react-chatapp-38.firebaseapp.com",
     projectId: "react-chatapp-38",
     storageBucket: "react-chatapp-38.firebasestorage.app",
     messagingSenderId: "235234632686",
     appId: "1:235234632686:web:e5df834ac3985f452de4ff",
     measurementId: "G-NR0BE6JGEY",
     databaseURL: "https://react-chatapp-38-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

const app = initializeApp(firebaseConfig);

const db = getDatabase(app);

let getAllUsers = () => {
     return get(ref(db, 'users')).then((snapshot) => {
          if (snapshot.exists()) {
               return snapshot.val();
          } else {
               return {};
          }
     });
}
let getAllFriends = (user) => {
     return get(ref(db, `users/${user}/contacts`)).then((snapshot) => {
          if (snapshot.exists()) {
               return snapshot.val();
          } else {
               return {}; 
          }
     });
}
let getUser = async (user) => {
     return get(ref(db, `users/${user}`)).then((snapshot) => {
          if (snapshot.exists()) {
               return snapshot.val();
          } else {
               return null; 
          }
     });
}


// Function to write data to the database
function writeUserData(name, password, status = 'online') {
     const userRef = ref(db, 'users/' + name);
     // check ig the user already exists
     get(userRef).then((snapshot) => {
          if (snapshot.exists()) {
               alert("User already exists");
          } else {
               set(userRef, {
                    username: name,
                    password: password,
                    status: status
               });
               alert("User created successfully");
          }
     });
}

async function saveMsgsToCloud(user, contact, msg) {
  const messageRef = push(
    ref(db, `users/${user}/contacts/${contact}`)
  );

  const uid = messageRef.key;

  const message = {
    msg,
    timestamp: serverTimestamp(),
    read: false
  };

  const updates = {
    [`users/${user}/contacts/${contact}/${uid}`]: {
      ...message,
      type: "sent"
    },
    [`users/${contact}/contacts/${user}/${uid}`]: {
      ...message,
      type: "received"
    }
  };

  await update(ref(db), updates);

  return uid;
}

function markRead(user, contact, messages) {
  const updates = {};

  messages.forEach(([id, message]) => {
    if (message.type === "received" && !message.read) {
      updates[`users/${user}/contacts/${contact}/${id}/read`] = true;
      updates[`users/${contact}/contacts/${user}/${id}/read`] = true;
    }
  });

  if (Object.keys(updates).length) {
    update(ref(db), updates);
  }
}

function listenForMessages(user, contact, callback) {
     const msgsRef = ref(db, `users/${user}/contacts/${contact}`);
     return onValue(msgsRef, snapshot => {
          callback(snapshot.exists() ? snapshot.val() : {});
          // console.log(snapshot.exists() && Object.entries(snapshot.val()));
     });
}
function setMyStatus(user, status = 'online') {
     const statusRef = ref(db, `users/${user}/status`);
     const connectRef = ref(db, '.info/connected');

     onValue(connectRef, snapshot => {  // Listen for connection state changes
          if (snapshot.val() === false) return;
          onDisconnect(statusRef).set(serverTimestamp());  // Set status to offline when disconnected
          set(statusRef, status);  // Set status to online when connected
     });
}
function listenToUserStatus(username, callback) {
    const statusRef = ref(db, `users/${username}/status`);

    return onValue(statusRef, (snapshot) => {
        callback(snapshot.val());
    });
}

// Function to update user data
function updateUserData(userId, name, password) {
     const updates = {};
     updates[`/users/${userId}/username`] = name;
     updates[`/users/${userId}/password`] = password;
     return update(ref(db), updates);
}

// Function to delete user data
function deleteUserData(userId) {
     return remove(ref(db, 'users/' + userId));
}

function addFeature(feature) {
     const featuresRef = ref(db, 'features');
     set(featuresRef, feature);
}
function listenToFeatures(callback) {
     const featuresRef = ref(db, 'features');
     return onValue(featuresRef, snapshot => {
          callback(snapshot.exists() ? snapshot.val() : []);
     });
}

// delete a msg
// edit a msg
function deleteMsg(user, contact, msgId) {
     const sentMsgRef = ref(db, `users/${user}/contacts/${contact}/${msgId}`);
     const receivedMsgRef = ref(db, `users/${contact}/contacts/${user}/${msgId}`);
     remove(sentMsgRef);
     remove(receivedMsgRef);
     console.log('deleted', msgId);
}
function clearChat(user, contact) {
     const sentMsgRef = ref(db, `users/${user}/contacts/${contact}`);
     set(sentMsgRef, {});
     console.log('cleared');
}

async function editMsg(user, contact, msg, msgId, newMsg) {
  const edited = newMsg && newMsg !== msg;

  const sentMsgPath = `users/${user}/contacts/${contact}/${msgId}`;
  const receivedMsgPath = `users/${contact}/contacts/${user}/${msgId}`;

  const updates = {
    [`${sentMsgPath}/msg`]: newMsg,
    [`${sentMsgPath}/edited`]: edited,
    [`${receivedMsgPath}/msg`]: newMsg,
    [`${receivedMsgPath}/edited`]: edited
  };

  await update(ref(db), updates);
}
// get unread msgs
function getUnreadMsgsCount(contact) {
     const user = localStorage.getItem("user");
     const msgsRef = ref(db, `users/${user}/contacts/${contact}`);

     return get(msgsRef).then(snapshot => {
          if (snapshot.exists()) {
               const messages = snapshot.val();
               const unreadMessages = Object.entries(messages).filter(([id, message]) => message.type === 'received' && !message.read);
               return unreadMessages.length;
          } else {
               return Promise.resolve(0); // No messages, so unread count is 0
          }
     });
}

// Export the functions for use in other parts of the application
export {
     writeUserData,
     updateUserData,
     deleteUserData,
     getAllUsers,
     getUser,
     saveMsgsToCloud,
     listenForMessages,
     getAllFriends,
     setMyStatus,
     listenToUserStatus,
     addFeature,
     listenToFeatures,
     deleteMsg,
     editMsg,
     clearChat,
     markRead,
     getUnreadMsgsCount
};