import React, { useEffect, useState } from "react";
import { MdUploadFile } from "react-icons/md";
import { Button, Checkbox, Label, Modal, TextInput } from 'flowbite-react';

function UploadFileBtn({ uploadFile }: { uploadFile: Function }) {

  const [openModal, setOpenModal] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [buttonDisabled,setButtonDisabled] = useState(false)


  function onCloseModal() {
    setOpenModal(false);
    setPassword('');
    setConfirmPassword('')
  }

  useEffect(()=>{


    if(confirmPassword.length>3&& password.length>3 && confirmPassword===password){
      setButtonDisabled(false)
    }else{
      setButtonDisabled(true)

    }

  },[password,confirmPassword])

  const upload = (e:any)=>{
    console.log(password)
    uploadFile(e,password)
    onCloseModal()
  }




  return (
    <button className="relative flex w-full items-center space-x-3 px-4 py-1.5 hover:bg-darkC">
      <MdUploadFile className="h-5 w-5" />
      {/*  */}
      <span onClick={() => setOpenModal(true)}>File upload</span>
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Set Password" />
              </div>
              <TextInput
                type="password"
                id="password"
                placeholder="*******"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Confirm Password" />
              </div>
              <TextInput
                type="password"
                id="password"
                placeholder="*******"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                required
              />
            </div>
            <div className="w-full">
              <Button className="w-full" color="success" disabled={buttonDisabled}>
                <input
                  type="file"
                  multiple
                  onChange={upload}
                  className="absolute -left-3 top-0 h-full w-full cursor-pointer bg-slate-300 opacity-0"
                />
                Upload File
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </button>
  );
}

export default UploadFileBtn;
