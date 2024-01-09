"use client";

import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav className="bg-gray-100 py-4">
      <div className="bg-white mx-4 rounded-md px-8 py-2  flex justify-end items-center border border-gray-200 h-16">
        {session?.user && (
          <button
            onClick={() => signOut()}
            className="rounded-md bg-red-500 text-white px-4 py-2 hover:bg-red-600"
          >
            Signout
          </button>
        )}
      </div>
    </nav>
  );
};
export default Navbar;
