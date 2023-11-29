import { database } from "@/firebaseConfig";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";

let files = collection(database, "files");
let logs = collection(database, "logs");


export const addFiles = (
  fileLink: string,
  fileName: string,
  folderId: string,
  userEmail: string,
) => {
  try {
    addDoc(files, {
      fileLink: fileLink,
      fileName: fileName,
      isFolder: false,
      isStarred: false,
      isTrashed: false,
      folderId: folderId,
      userEmail: userEmail,
    });
    addLog(userEmail,`Added a file named ${fileName}`)
  } catch (err) {
    console.error(err);
  }
};

export const addFolder = (payload: any) => {
  try {
    addDoc(files, {
      ...payload,
    });
    addLog(payload.userEmail,`Added a folder named ${payload.folderName}`)
  } catch (err) {
    console.error(err);
  }
};

export const shareFile = async (
  fileId: string,
  email: string,
  userEmail: string,
  fileName: string
) => {
  const fileRef = doc(files, fileId);
  try {
    await updateDoc(fileRef, {
      fileSharedWithUserEmail:email,
      fileShared:true
    });
    addLog(userEmail,`${fileName} shared to ${email}`)

  } catch (error) {
    console.error("Error updating file properties: ", error);
  }
};

export const renameFile = async (
  fileId: string,
  name: string,
  newName: string,
  userEmail: string,
  isFolder: boolean,
) => {
  const fileRef = doc(files, fileId);
  try {
    await updateDoc(fileRef, {
      [isFolder ? "folderName" : "fileName"]: newName,
    });
    addLog(userEmail,`File renamed to ${newName} from ${name}`)
  } catch (error) {
    console.error("Error updating file properties: ", error);
  }
};

export const starFile = async (fileId: string,fileName:string,userEmail:string, isStarred: boolean) => {
  const fileRef = doc(files, fileId);
  try {
    await updateDoc(fileRef, {
      isStarred: isStarred,
    });

    const text = isStarred ? `Starred ${fileName}` : `Removed Starred for ${fileName}`

    addLog(userEmail,text)
  } catch (error) {
    console.error("Error updating file properties: ", error);
  }
};

export const trashFile = async (fileId: string,fileName:string,userEmail:string, isTrashed: boolean) => {
  const fileRef = doc(files, fileId);
  try {
    await updateDoc(fileRef, {
      isStarred: false,
      isTrashed: isTrashed,
    });

    const text = isTrashed ? `Moved ${fileName} to trash` : `Removed ${fileName} from trash`
    addLog(userEmail,text)


  } catch (error) {
    console.error("Error updating file properties: ", error);
  }
};

export const deleteFile = async (fileId: string,fileName:string,userEmail:string, isFolder: boolean) => {
  const fileRef = doc(files, fileId);
  try {
    // Delete the file or folder itself
    await deleteDoc(fileRef);

    // If it's a folder, also delete all files with the same folderId
    if (isFolder && fileId) {
      const filesQuery = query(files, where("folderId", "==", fileId));
      const querySnapshot = await getDocs(filesQuery);

      const deletePromises: any[] = [];

      querySnapshot.forEach((doc) => {
        deletePromises.push(deleteDoc(doc.ref));
      });

      await Promise.all(deletePromises);
    addLog(userEmail,`${fileName} deleted`)

    }
  } catch (error) {
    console.error("Error deleting file or folder: ", error);
  }
};

export const addLog = (email:string,description:string)=>{
  try {
    addDoc(logs,{
      description,
      metadata:{},
      timeStamp: new Date().toISOString(),
      userEmail: email
    }).then((res)=>{
      console.log(res)
    })
  } catch (error) {
    console.error(error);
  }
}