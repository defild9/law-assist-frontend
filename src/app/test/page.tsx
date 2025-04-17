import { auth, signOut } from "@/lib/auth";
import React from "react";
import { TestCompon } from "./components/TestCompon";

const TestPage = async () => {
  const session = await auth();

  // if (session?.error) {
  //   signOut({ redirect: true, redirectTo: "/" });
  // }

  if (!session) {
    return <div>Not authenticated. Please sign in.</div>;
  }

  return (
    <>
      <TestCompon />
      <div className="mt-4 p-4 bg-gray-100 rounded">
        <h2 className="text-lg text-black font-bold mb-2">Session Data:</h2>
        <pre className=" text-black">{JSON.stringify(session, null, 2)}</pre>
      </div>
    </>
  );
};

export default TestPage;
