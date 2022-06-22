const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
// const Firestore = require("@google-cloud/firestore");
// const firestore = new Firestore();
const db = admin.firestore();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


// exports.randomNumber = functions.https.onRequest((request, response) => {
//   const number = Math.round(Math.random() * 100);
//   response.send(number.toString());
// });

exports.retrieveCollection = functions.https.onCall(async (data, context) => {
  const cRef = db.collection(data.collection);
  const cDocs = await cRef.get();
  const cList = cDocs.docs.map((doc) => ({...doc.data(), id: doc.id}));
  return cList;
});

exports.updateColor = functions.https.onCall(async (data, context) => {
  const cRef = await db.collection("colors").where("code", "==",
      data.colorCode).get();
  const docRef = cRef.docs[0].ref;
  const setStatus = await docRef.update({"selected": data.select});
  const docData = await docRef.get();
  return [setStatus, {...docData.data(), id: docData.id}];
});

exports.updatePlayer = functions.https.onCall(async (data, context) => {
  const cRef = await db.collection("players").doc(data.playerId).get();
  const docRef = cRef.ref;
  const setStatus = await docRef.update({"color": data.colorCode});
  const docData = await docRef.get();
  return [setStatus, {...docData.data(), id: docData.id}];
});

exports.updateLogin = functions.https.onCall(async (data, context) => {
  const cRef = await db.collection("players").where(data.field, "==",
      data.id).get();
  const docRef = cRef.docs[0].ref;
  const setStatus = await docRef.update({"loggedIn": data.value});
  const docData = await docRef.get();
  return [setStatus, {...docData.data(), id: docData.id}];
});

