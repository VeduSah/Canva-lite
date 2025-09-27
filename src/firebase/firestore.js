import { doc, setDoc, getDoc, collection, addDoc } from 'firebase/firestore';
import { db } from './firebase';

export const saveCanvas = async (id, canvasData) => {
  try {
    await setDoc(doc(db, 'canvases', id), {
      data: canvasData,
      updatedAt: new Date()
    });
  } catch (error) {
    console.error('Error saving canvas:', error);
    throw error;
  }
};

export const loadCanvas = async (id) => {
  try {
    const docRef = doc(db, 'canvases', id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
  } catch (error) {
    console.error('Error loading canvas:', error);
    throw error;
  }
};

export const createCanvas = async (canvasData) => {
  try {
    const docRef = await addDoc(collection(db, 'canvases'), {
      data: canvasData,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating canvas:', error);
    throw error;
  }
};