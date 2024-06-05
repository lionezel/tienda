import { useEffect, useState } from "react";

import { auth } from "../firebase/config";
import { User } from "firebase/auth";

export const useOnAuthStateChanged = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);
  return user
};
