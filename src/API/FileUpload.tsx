import { storage } from "@/firebaseConfig";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { addFiles } from "@/API/Firestore";
import * as CryptoJS from 'crypto-js'

const fileUpload = (
  file: any,
  password: string,
  setProgress: Function,
  parentId: string,
  userEmail: string,
) => {
  const storageRef = ref(storage, `files/${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
      );
      // TODO: add progress bar
      setProgress((prev: number[]) => [...prev, { [file.name]: progress }]);
    },
    (error) => {
      alert(error);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log(password,downloadURL)
        const encryptedURL = CryptoJS.AES.encrypt(downloadURL, password).toString()
        addFiles(encryptedURL, file.name, parentId, userEmail);
      });
    },
  );
};

export default fileUpload;
