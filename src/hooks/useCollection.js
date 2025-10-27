// src/hooks/useCollection.js
import { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../assets/firebase';

export const useCollection = (c) => {
  const [docs, setDocs] = useState([]);
  useEffect(() => {
    const unsub = onSnapshot(collection(db, c), (snap) => {
      const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setDocs(data);
    });
    return unsub;
  }, [c]);
  return docs;
};