import { onSnapshot, collection, query, where } from "firebase/firestore";
import { database } from "@/firebaseConfig";
import { useEffect, useState } from "react";

let files = collection(database, "files");

export const fetchFiles = (folderId: string, userEmail: string) => {
  const [fileList, setFileList] = useState<FileListProps[]>([]);

  const getFolders = () => {
    if (userEmail) {
      const getUserFiles = query(files, where("userEmail", "==", userEmail));
      if (!folderId) {
        onSnapshot(getUserFiles, (res) => {
          return setFileList(
            res.docs
              .map((doc) => {
                const fileExtension = doc
                  .data()
                  .fileName?.split(".")
                  .pop()
                  ?.toLowerCase();
                return {
                  ...doc.data(),
                  id: doc.id,
                  fileName: doc.data().fileName,
                  fileExtension: fileExtension,
                  fileLink: doc.data().fileLink,
                  folderId: doc.data().folderId,
                  folderName: doc.data().folderName,
                  isFolder: doc.data().isFolder,
                  isStarred: doc.data().isStarred,
                  isTrashed: doc.data().isTrashed,
                };
              })
              .filter((file) => file.folderId === "") as FileListProps[],
          );
        });
      } else {
        onSnapshot(getUserFiles, (res) => {
          return setFileList(
            res.docs
              .map((doc) => {
                const fileExtension = doc
                  .data()
                  .fileName?.split(".")
                  .pop()
                  ?.toLowerCase();
                return {
                  ...doc.data(),
                  id: doc.id,
                  fileName: doc.data().fileName,
                  fileExtension: fileExtension,
                  fileLink: doc.data().fileLink,
                  folderId: doc.data().folderId,
                  folderName: doc.data().folderName,
                  isFolder: doc.data().isFolder,
                  isStarred: doc.data().isStarred,
                  isTrashed: doc.data().isTrashed,
                };
              })
              .filter((file) => file.folderId === folderId) as FileListProps[],
          );
        });
      }
    }
  };

  useEffect(() => {
    getFolders();
  }, [folderId, userEmail]);

  return fileList;
};


export const fetchFilesSharedWithUser = (userEmail: string) => {
  const [fileList, setFileList] = useState<FileListProps[]>([]);

  const getFolders = () => {
    const getUserFiles = query(files, where("fileSharedWithUserEmail", "==", userEmail));
    onSnapshot(getUserFiles, (res) => {
      return setFileList(
        res.docs
          .map((doc) => {
            const fileExtension = doc
              .data()
              .fileName?.split(".")
              .pop()
              ?.toLowerCase();
            return {
              ...doc.data(),
              id: doc.id,
              fileName: doc.data().fileName,
              fileExtension: fileExtension,
              fileLink: doc.data().fileLink,
              folderId: doc.data().folderId,
              folderName: doc.data().folderName,
              isFolder: doc.data().isFolder,
              isStarred: doc.data().isStarred,
              isTrashed: doc.data().isTrashed,
            };
          })
      );
    });
  }

  useEffect(() => {
    getFolders();
  }, [userEmail]);
  
  return fileList;
};

export const fetchFilesShared = (userEmail: string) => {
  const [fileList, setFileList] = useState<FileListProps[]>([]);

  const getFolders = () => {
    const getUserFiles = query(files, where("fileShared", "==", true),where("userEmail", "==", userEmail));
    onSnapshot(getUserFiles, (res) => {
      const data = res.docs
      .map((doc) => {
        const fileExtension = doc
          .data()
          .fileName?.split(".")
          .pop()
          ?.toLowerCase();
        return {
          ...doc.data(),
          id: doc.id,
          fileName: doc.data().fileName,
          fileExtension: fileExtension,
          fileLink: doc.data().fileLink,
          folderId: doc.data().folderId,
          folderName: doc.data().folderName,
          isFolder: doc.data().isFolder,
          isStarred: doc.data().isStarred,
          isTrashed: doc.data().isTrashed,
        };
      })
      console.log(data)
      return setFileList(
        data
      );
    });
  }

  useEffect(() => {
    getFolders();
  }, [userEmail]);
  
  return fileList;
};