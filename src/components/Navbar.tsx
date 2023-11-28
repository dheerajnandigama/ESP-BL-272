import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";
import { DiGoogleDrive } from "react-icons/di";
import { MdStarBorder } from "react-icons/md";
import { RiDeleteBin6Fill, RiDeleteBin6Line } from "react-icons/ri";
import { IoMdStar,IoMdShare } from "react-icons/io";
import { BsShare } from "react-icons/bs";
import { useSession } from "next-auth/react";
import { FaRegFileAlt } from "react-icons/fa";
import { FaRegFile } from "react-icons/fa";

function Navbar() {
  const router = useRouter();

  const { data: session } = useSession();


  // Function to check if a link is active based on the current route.
  const isActive = (href: string) => router.pathname === href;
  return (
    <nav className="space-y-0.5 pr-5">
      <Link
        href={"/drive/my-drive"}
        className={`tablet:justify-normal tablet:space-x-3 tablet:px-4 tablet:py-1.5 flex items-center justify-center rounded-full p-2 hover:bg-darkC ${
          isActive("/drive/my-drive") ? "bg-[#C2E7FF]" : ""
        }`}
      >
        {isActive("/drive/my-drive") ? (
          <DiGoogleDrive className="tablet:h-5 tablet:w-5 h-6 w-6 rounded-sm border-[2.3px] border-textC bg-textC text-white" />
        ) : (
          <DiGoogleDrive className="tablet:h-5 tablet:w-5 h-6 w-6 rounded-sm border-[2.3px] border-textC" />
        )}
        <span className="tablet:block hidden">My Drive</span>
      </Link>
      <Link
        href={"/drive/starred"}
        className={`tablet:justify-normal tablet:space-x-3 tablet:px-4 tablet:py-1.5 flex items-center justify-center rounded-full p-2 hover:bg-darkC ${
          isActive("/drive/starred") ? "bg-[#C2E7FF]" : ""
        }`}
      >
        {isActive("/drive/starred") ? (
          <IoMdStar className="tablet:h-5 tablet:w-5 h-6 w-6" />
        ) : (
          <MdStarBorder className="tablet:h-5 tablet:w-5 h-6 w-6" />
        )}

        <span className="tablet:block hidden">Starred</span>
      </Link>
      <Link
        href={"/drive/shared"}
        className={`tablet:justify-normal tablet:space-x-3 tablet:px-4 tablet:py-1.5 flex items-center justify-center rounded-full p-2 hover:bg-darkC ${
          isActive("/drive/shared") ? "bg-[#C2E7FF]" : ""
        }`}
      >
        {isActive("/drive/shared") ? (
          <IoMdShare className="tablet:h-5 tablet:w-5 h-6 w-6" />
        ) : (
          <BsShare className="tablet:h-4 tablet:w-5 h-6 w-6" />
        )}

        <span className="tablet:block hidden">Shared</span>
      </Link>
      <Link
        href={"/drive/logs"}
        className={`tablet:justify-normal tablet:space-x-3 tablet:px-4 tablet:py-1.5 flex items-center justify-center rounded-full p-2 hover:bg-darkC ${
          isActive("/drive/logs") ? "bg-[#C2E7FF]" : ""
        }`}
      >
        {isActive("/drive/logs") && session?.user.email==='asishraju.vachavaya@sjsu.edu' ? (
          <FaRegFile className="tablet:h-5 tablet:w-5 h-6 w-6" />
        ) : (
          <FaRegFileAlt className="tablet:h-4 tablet:w-5 h-6 w-6" />
        )}

        <span className="tablet:block hidden">Logs</span>
      </Link>
      <Link
        href={"/drive/trash"}
        className={`tablet:justify-normal tablet:space-x-3 tablet:px-4 tablet:py-1.5 flex items-center justify-center rounded-full p-2 hover:bg-darkC ${
          isActive("/drive/trash") ? "bg-[#C2E7FF]" : ""
        }`}
      >
        {isActive("/drive/trash") ? (
          <RiDeleteBin6Fill className="tablet:h-5 tablet:w-5 h-6 w-6" />
        ) : (
          <RiDeleteBin6Line className="tablet:h-5 tablet:w-5 h-6 w-6" />
        )}
        <span className="tablet:block hidden">Bin</span>
      </Link>
    </nav>
  );
}

export default Navbar;
