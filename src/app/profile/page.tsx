"use client";
import { useSession } from "next-auth/react";

const Profile = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <section className="px-4 py-2 space-y-2">
      <h1 className=" text-2xl font-bold">Profile</h1>
      <pre className=" p-4 border border-gray-200 rounded-md space-y-2">
        <h2 className="text-2xl font-bold">Name</h2>
        <p className="text-xl font-bold inline-block border border-gray-200 rounded-md px-4 py-2 mb-2">
          {session?.user?.name}
        </p>
        <h2 className="text-2xl font-bold">Email</h2>
        <p className="text-xl font-bold border inline-block border-gray-200 rounded-md px-4 py-2 mb-2">
          {session?.user?.email}
        </p>
      </pre>
    </section>
  );
};
export default Profile;
