import _ from "lodash";
import firebase from "firebase";

export const createUserIfNotExist = (fb, user) => {
  return fb
    .usersCollection()
    .doc(user.uid)
    .set(
      {
        email: user.email,
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

export const getUserFromRef = (fb, userRef) => {
  return userRef.get();
};

export const saveAnnounce = (fb, announce) => {
  return fb.announcesCollection().add(announce);
};

export const getAllAnnounces = (fb) => {
  return fb.announcesCollection().get();
};

export const getUserAnnounces = (fb, user) => {
  const userRef = fb.usersCollection().doc(user.uid);
  return fb.announcesCollection().where("user", "==", userRef).get();
};

export const getAnnounce = (fb, announceId) => {
  return fb.announcesCollection().doc(announceId).get();
};
