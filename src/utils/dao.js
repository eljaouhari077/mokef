import _ from "lodash";

export const createUserIfNotExist = (fb, user) => {
  return fb
    .usersCollection()
    .doc(user.uid)
    .set({ email: user.email }, { merge: true })
    .catch((error) => console.error(error));
};

export const updateUserWithAdditionalInformations = (fb, data) => {
  console.log(data);
  return fb
    .usersCollection()
    .doc(data.uid)
    .update(_.omit(data, "uid"))
    .catch((error) => console.error(error));
};
