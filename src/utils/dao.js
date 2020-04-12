import _ from "lodash";
import firebase from "firebase";

export const createUserIfNotExist = (fb, user) => {
  return fb
    .usersCollection()
    .doc(user.uid)
    .set(
      {
        email: user.email,
        profile: {},
        created_at: firebase.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    )
    .catch((error) => console.error(error));
};

export const updateUserWithAdditionalInformations = (fb, data) => {
  return fb
    .usersCollection()
    .doc(data.uid)
    .update(_.omit(data, "uid"))
    .catch((error) => console.error(error));
};

export const syncUserOnUpdate = (fb, user, setUser) => {
  return fb
    .usersCollection()
    .doc(user.uid)
    .onSnapshot((doc) => setUser({ uid: doc.id, ...doc.data() }));
};
