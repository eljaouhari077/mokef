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

export const getUser = (fb, userId) => {
  return fb.usersCollection().doc(userId).get();
};

export const addReview = (fb, userId, review) => {
  return fb
    .usersCollection()
    .doc(userId)
    .update({
      reviews: firebase.firestore.FieldValue.arrayUnion(review),
    });
};

export const saveAnnounce = (fb, announce) => {
  return fb.announcesCollection().add(announce);
};

export const getAllAnnounces = (fb) => {
  return fb.announcesCollection().get();
};

export const getUserAnnounces = (fb, userId) => {
  const userRef = fb.usersCollection().doc(userId);
  return fb.announcesCollection().where("user", "==", userRef).get();
};

export const getAnnounce = (fb, announceId) => {
  return fb.announcesCollection().doc(announceId).get();
};

export const saveContract = (fb, ownerId, clientId, subContractId) => {
  return fb.contractsCollection().add({
    ownerId,
    clientId,
    contracts: [subContractId],
    messages: [],
  });
};

export const getContracts = (fb, ownerId, clientId) => {
  return fb
    .contractsCollection()
    .where("ownerId", "==", ownerId)
    .where("clientId", "==", clientId)
    .get();
};

export const getUserContracts = (fb, userId, field) => {
  return fb.contractsCollection().where(field, "==", userId).get();
};

export const updateContract = (fb, contractId, subContractId) => {
  return fb
    .contractsCollection()
    .doc(contractId)
    .update({
      contracts: firebase.firestore.FieldValue.arrayUnion(subContractId),
    });
};

export const updateContractMessages = (fb, contractId, message) => {
  return fb
    .contractsCollection()
    .doc(contractId)
    .update({
      messages: firebase.firestore.FieldValue.arrayUnion(message),
    });
};
