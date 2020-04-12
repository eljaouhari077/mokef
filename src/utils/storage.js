export const getStorageFile = (fb, ref) => fb.storageRef(ref).getDownloadURL();

export const removeStorageFile = (fb, ref) => fb.storageRef(ref).delete();

export const addStorageFile = (fb, ref, file) => fb.storageRef(ref).put(file);
