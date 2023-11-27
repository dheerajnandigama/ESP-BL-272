import Head from "next/head";
import GetFiles from "@/components/GetFiles";
import GetFolders from "@/components/GetFolders";
import FileHeader from "@/components/FileHeader";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { fetchFiles, fetchFilesShared, fetchFilesSharedWithUser } from "@/hooks/fetchFiles";
import { DotLoader } from "react-spinners";

export default function Home() {
  const [isFilesSharedWithUser, setFilesSharedWithUser] = useState(false);
  const [isFileShared, setIsFileShared] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { data: session } = useSession();

  console.log(session)

  // Fetch the list of files and folders
  const filesSharedWithUser = fetchFilesSharedWithUser(session?.user.email!);
  const filesShared = fetchFilesShared(session?.user.email!);


  useEffect(() => {
    // Determine if there are folders and files in the list
    const hasFileSharedWithUser = filesSharedWithUser.length>0;
    const hasFiles = filesShared.length>0;

    // Update the state based on the results
    setFilesSharedWithUser(hasFileSharedWithUser);
    setIsFileShared(hasFiles);

    setTimeout(() => {
      setIsLoading(false);
    }, 2200);
  }, [filesSharedWithUser,filesShared]);

  return (
    <>
      <Head>
        <title>Guardian</title>
        <meta name="description" content="Secured File Sharing Platform" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <FileHeader headerName={"Shared Files"} />
        <div className="h-[75vh] w-full overflow-y-auto p-5">
          {/* If the list is loading, display the loading state */}
          {!isFilesSharedWithUser && !isFileShared && isLoading ? (
            <div className="flex h-full items-center justify-center">
              <DotLoader color="#b8c2d7" size={60} />
            </div>
          ) : (
            <>
              {/* If there are files or folders, display them */}
              {isFilesSharedWithUser || isFileShared ? (
                <>
                  {/* {isFolder && (
                    // If there are folders, display them
                    <div className="mb-5 flex flex-col space-y-4">
                      <h2>Folders</h2>
                      <div className="flex flex-wrap justify-start gap-x-3 gap-y-5 text-textC">
                        <GetFolders folderId="" select="" />
                      </div>
                    </div>
                  )} */}
                  {isFilesSharedWithUser && (
                    // If there are files, display them
                    <div className="mb-5 flex flex-col space-y-4">
                      <h2>Files shared with me</h2>
                      <div className="flex flex-wrap justify-start gap-x-3 gap-y-5 text-textC">
                        <GetFiles folderId="" select="" type={"fileSharedWithYou"} />
                      </div>
                    </div>
                  )}
                  {isFileShared && (
                    // If there are files, display them
                    <div className="mb-5 flex flex-col space-y-4">
                      <h2>Files shared</h2>
                      <div className="flex flex-wrap justify-start gap-x-3 gap-y-5 text-textC">
                        <GetFiles folderId="" select=""  type={"sharedFiles"}/>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                // If there are no files or folders, display the empty state
                <div className="flex h-full flex-col items-center justify-center">
                  <h2 className="mb-5 text-xl font-medium text-textC">
                    A place for all of your files
                  </h2>
                  <Image
                    draggable={false}
                    src="/empty_state_drive.png"
                    width={500}
                    height={500}
                    alt="empty-state"
                    className="w-full max-w-2xl object-cover object-center"
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
