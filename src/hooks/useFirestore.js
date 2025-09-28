import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

const useFirestore = () => {
  const saveScene = async (id, data) => {
    try {
      console.log('Saving to Firestore, ID:', id);
      await setDoc(doc(db, "scenes", id), { data, updatedAt: new Date() });
      console.log('Successfully saved to Firestore');
    } catch (error) {
      console.warn('Failed to save scene to Firestore, using localStorage:', error.message);
      localStorage.setItem(`scene_${id}`, data);
    }
  };

  const loadScene = async (id) => {
    try {
      console.log('Loading from Firestore, ID:', id);
      const snap = await getDoc(doc(db, "scenes", id));
      if (snap.exists()) {
        console.log('Found data in Firestore');
        return snap.data().data;
      } else {
        console.log('No data in Firestore, checking localStorage');
        return localStorage.getItem(`scene_${id}`);
      }
    } catch (error) {
      console.warn('Failed to load scene from Firestore, using localStorage:', error.message);
      return localStorage.getItem(`scene_${id}`);
    }
  };

  return { saveScene, loadScene };
};

export default useFirestore;
