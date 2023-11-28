import React, { useState } from "react";
import { fetchFiles, fetchFilesShared, fetchFilesSharedWithUser } from "@/hooks/fetchFiles";
import Image from "next/image";
import fileIcons from "@/components/fileIcons";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useSession } from "next-auth/react";
import FileDropDown from "./FileDropDown";
import { fetchAllFiles } from "@/hooks/fetchAllFiles";
import Rename from "./Rename";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import Iframe from 'react-iframe'
import * as CryptoJS from 'crypto-js'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer,toast } from 'react-toastify';
import Share from "./Share";

function GetFiles({ folderId, select, type }: { folderId: string; select: string, type:string }) {
  const [openMenu, setOpenMenu] = useState("");
  const [renameToggle, setRenameToggle] = useState("");
  const [shareToggle, setShareToggle] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [password, setPassword] = useState("")
  const [validLink, setValidLink] = useState("")
  const [encryptedLink, setEncryptedLink] = useState("")


  const { data: session } = useSession();

  let fileList = fetchFiles(folderId, session?.user.email!);
  if (select) fileList = fetchAllFiles(session?.user.email!);

  if (type==="sharedFiles"){
    fileList = fetchFilesShared(session?.user.email!);
  } else if (type==="fileSharedWithYou"){
    fileList = fetchFilesSharedWithUser(session?.user.email!);
    console.log(fileList)
  } else{
    let fileList = fetchFiles(folderId, session?.user.email!);
  if (select) fileList = fetchAllFiles(session?.user.email!);
  }

  const openFile = (fileLink: string) => {
    setEncryptedLink(fileLink)
    // window.open(fileLink, "_blank");
    setOpenModal(true)
  };

  const handleMenuToggle = (fileId: string) => {
    // Toggle the dropdown for the given file
    setRenameToggle("");
    setOpenMenu((prevOpenMenu) => (prevOpenMenu === fileId ? "" : fileId));
  };

  const decrypt = () => {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedLink, password)
      const plainText = bytes.toString(CryptoJS.enc.Utf8)
      console.log(plainText)
      setValidLink(plainText)
    } catch (error) {
      toast.error('Incorrect Password', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    }

  }

  const list = fileList.map((file) => {
    // getting the icon for the file
    const icon =
      fileIcons[file.fileExtension as keyof typeof fileIcons] ??
      fileIcons["any"];

    const img = ["jpg", "ico", "webp", "png", "jpeg", "gif", "jfif"].includes(
      file.fileExtension,
    ) ? (
      icon
    ) : file.fileExtension === "mp3" ? (
      <div className="flex flex-col items-center justify-center">
        <div className="h-24 w-24 ">{icon}</div>
        <audio controls className="w-44">
          <source src={file.fileLink} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
    ) : file.fileExtension === "mp4" ? (
      <video controls>
        <source src={file.fileLink} type="audio/mpeg" />
        <div className="h-36 w-36 ">{icon}</div>
      </video>
    ) : (
      <div className="h-36 w-36 ">{icon}</div>
    );

    // set a condition for the files to be displayed
    let condition = !file?.isFolder && !file?.isTrashed;
    if (select === "starred")
      condition = !file?.isFolder && file?.isStarred && !file?.isTrashed;
    else if (select === "trashed")
      condition = !file?.isFolder && file?.isTrashed;

    return (
      condition && (
        <div
          key={file.id}
          onDoubleClick={() => openFile(file.fileLink)}
          className="hover:cursor-alias"
        >
          <div
            className="flex w-full flex-col items-center justify-center
         overflow-hidden rounded-xl bg-darkC2 px-2.5 hover:bg-darkC"
          >
            <div className="relative flex w-full items-center justify-between px-1 py-3">
              <div className="flex items-center space-x-4">
                <div className="h-6 w-6">{icon}</div>
                <span className="w-32 truncate text-sm font-medium text-textC">
                  {file.fileName}
                </span>
              </div>
              <BsThreeDotsVertical
                onClick={() => handleMenuToggle(file.id)}
                className="h-6 w-6 cursor-pointer rounded-full p-1 hover:bg-[#ccc]"
              />
              {
                /* drop down */
                openMenu === file.id && (
                  <FileDropDown
                    file={file}
                    setOpenMenu={setOpenMenu}
                    isFolderComp={false}
                    select={select}
                    folderId=""
                    setRenameToggle={setRenameToggle}
                    setShareToggle={setShareToggle}
                  />
                )
              }
              {
                // rename toggle
                renameToggle === file.id && (
                  <Rename
                    setRenameToggle={setRenameToggle}
                    fileId={file.id}
                    isFolder={file.isFolder}
                    fileName={file.fileName}
                    fileExtension={file.fileExtension}
                  />
                )
              }
               {
                // share toggle
                shareToggle === file.id && (
                  <Share
                    setShareToggle={setShareToggle}
                    fileId={file.id}
                    isFolder={file.isFolder}
                    fileName={file.fileName}
                  />
                )
              }
            </div>
            <div className="flex h-44 w-48 items-center justify-center pb-2.5">
              {img}
            </div>
          </div>
        </div>
      )
    );
  });

  // the list of files
  return (<>
    {list}
    <Modal show={openModal} onClose={() => setOpenModal(false)} position={'center'} size={validLink ? '7xl' : 'sm'}>
      <Modal.Body>
        {!validLink && <div className="w-64">
          <Label htmlFor="password" value="Enter Password to view the file" />
          <TextInput
            type="password"
            id="password"
            placeholder="*******"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>}
        {validLink.length > 0 && <Iframe url={validLink} width="100%" height="100%"
          display="block"
          position="relative"
          styles={{ height: '100vh' }}
        ></Iframe>}

      </Modal.Body>
      <Modal.Footer className="w-full">
        {!validLink && <Button className="w-full" onClick={decrypt} color="success" >View File</Button>}
        <Button className="w-full" color="gray" onClick={() => {
          setPassword("")
          setValidLink("")
          setOpenModal(false)
        }}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
    <ToastContainer />
  </>);
}

export default GetFiles;
