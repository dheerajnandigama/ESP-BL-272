import { renameFile, shareFile } from "@/API/Firestore";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { toast } from "react-toastify";

// The Rename component displays a pop-up for rename input.
function Share({
  setShareToggle,
  fileId,
  fileName,
  isFolder,
}: shareProps) {
  const [email, setEmail] = useState("");

  const { data: session } = useSession();


  const share = () => {
    if (email === "") return;

    shareFile(fileId, email,session?.user.email??" ",fileName);
    setShareToggle("");
    toast.success('File shared')
  };

  return (
    <div className="absolute top-9 z-10 space-y-2 rounded-xl bg-white p-3 shadow-lg shadow-[#bbb]">
      <h2 className="text-xl">Share</h2>
      <input
        className="w-full rounded-md border border-textC py-1.5 indent-2 outline-textC2"
        type="text"
        placeholder="email@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <div className=" flex w-full justify-between  font-medium text-textC2">
        <button
          type="button"
          onClick={() => setShareToggle("")}
          className="rounded-full px-3 py-2 hover:bg-darkC2"
        >
          Cancel
        </button>
        <button
          onClick={() => share()}
          className={`rounded-full px-3 py-2 ${email && "hover:bg-darkC2"}`}
        >
          Share
        </button>
      </div>
    </div>
  );
}

export default Share;
