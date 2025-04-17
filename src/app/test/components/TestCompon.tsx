"use client";
import { ConversationService } from "@/api/services/ConversationService";
import { signOut } from "next-auth/react";
import React, { useEffect, useState } from "react";

export const TestCompon = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchConversations = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const res = await ConversationService.getConversations();
        setData(res);
      } catch (error: any) {
        setError(error.message || "Failed to fetch conversations");
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchConversations();
  }, []); // Run only once on mount

  const handleSignOut = async () => {
    try {
      await signOut({ redirect: true, callbackUrl: "/sign-in" });
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return (
    <div className="p-4">
      <button
        onClick={handleSignOut}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
      >
        Sign out
      </button>

      <div className="mt-4">
        <h2 className="text-xl font-bold">Test Component</h2>

        {isLoading && <p>Loading conversations...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}

        {data && (
          <div className="mt-2 p-3 text-black bg-gray-50 rounded">
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};
