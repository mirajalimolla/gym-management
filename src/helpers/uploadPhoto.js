// src/helpers/uploadPhoto.js
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app } from '../assets/firebase';

const storage = getStorage(app);

export async function uploadPhoto(file) {
  const name = Date.now() + '-' + file.name;
  const snap = await uploadBytes(ref(storage, 'avatars/' + name), file);
  return await getDownloadURL(snap.ref);
}