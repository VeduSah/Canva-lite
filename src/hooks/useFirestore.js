import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

const useFirestore = () => {
  const saveScene = async (id, data) => {
    try {
      await setDoc(doc(db, "scenes", id), { data });
    } catch (error) {
      console.warn('Failed to save scene, using localStorage:', error.message);
      localStorage.setItem(`scene_${id}`, data);
    }
  };

  const loadScene = async (id) => {
    try {
      const snap = await getDoc(doc(db, "scenes", id));
      return snap.exists() ? snap.data().data : null;
    } catch (error) {
      console.warn('Failed to load scene, using localStorage:', error.message);
      const localData = localStorage.getItem(`scene_${id}`);
      return localData;
    }
  };

  return { saveScene, loadScene };
};

export default useFirestore;
