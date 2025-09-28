import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

const useFirestore = () => {
  const saveScene = async (id, data) => {
    // Use localStorage as primary storage
    localStorage.setItem(`scene_${id}`, data);
    console.log('Saved to localStorage, ID:', id);
    
    // Try Firebase as backup
    try {
      await setDoc(doc(db, "scenes", id), { data, updatedAt: new Date() });
      console.log('Also saved to Firestore');
    } catch (error) {
      console.warn('Firestore save failed, but localStorage succeeded:', error.message);
    }
  };

  const loadScene = async (id) => {
    // Try localStorage first
    const localData = localStorage.getItem(`scene_${id}`);
    if (localData) {
      console.log('Found data in localStorage');
      return localData;
    }
    
    // Fallback to Firestore
    try {
      console.log('No localStorage data, trying Firestore');
      const snap = await getDoc(doc(db, "scenes", id));
      if (snap.exists()) {
        const data = snap.data().data;
        localStorage.setItem(`scene_${id}`, data); // Cache locally
        return data;
      }
    } catch (error) {
      console.warn('Firestore load failed:', error.message);
    }
    
    return null;
  };

  return { saveScene, loadScene };
};

export default useFirestore;
