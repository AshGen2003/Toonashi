"use client";

import { useUser, useAuth } from "@clerk/nextjs"; // 1. Import useAuth
import { useEffect, useRef } from "react";
import axios from "axios";

export default function AuthSync() {
  const { isLoaded, isSignedIn, user } = useUser();
  const { getToken } = useAuth(); // 2. Get the getToken function from useAuth
  
  // Use a ref to prevent double-firing in React Strict Mode
  const hasSynced = useRef(false);

  useEffect(() => {
    // Only run if Clerk is loaded, User is signed in, and we haven't synced yet
    if (isLoaded && isSignedIn && user && !hasSynced.current) {
      
      const syncUserToBackend = async () => {
        try {
          // 3. Get the Token directly
          const token = await getToken(); 

          // Prepare the data
          const userData = {
            clerk_id: user.id,
            email: user.primaryEmailAddress?.emailAddress || "",
            name: user.fullName || "",
            avatar: user.imageUrl,
          };

          if (!token) {
            return;
          }

          // Send to Laravel
          const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
          await axios.post(`${apiUrl}/api/user-sync`, userData, {
            headers: {
              Authorization: `Bearer ${token}`, 
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
          });

          console.log("User synced to Laravel MySQL");
          hasSynced.current = true; 
          
        } catch (error) {
          console.error("Failed to sync user:", error);
        }
      };

      syncUserToBackend();
    }
  }, [isLoaded, isSignedIn, user, getToken]); // Added getToken to dependencies

  return null;
}
// src/components/AuthSync.tsx:36
// Temporary test
const apiUrl = 'http://localhost:8000'; 
console.log("Attempting sync to:", apiUrl); // Check your console to verify this prints