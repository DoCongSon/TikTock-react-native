import { getDoc, getFirestore, doc } from 'firebase/firestore';

const getUserById = async (id) => {
  try {
    const db = getFirestore();
    const snapshot = await getDoc(doc(db, 'user', id));
    if (snapshot.exists) {
      return { ...snapshot.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
};

export { getUserById };
