// hooks/useCurrentUser.ts
'use client';

import { useEffect, useState } from 'react';

export type CurrentUser = {
  id: string;
  clerkId: string;
  email: string;
  name?: string;
  paid?: boolean;
  phone?: string;
  role: 'buyer' | 'seller' | 'admin';
  city?: string;
  createdAt?: string;
  updatedAt?: string;
  // Add any other fields from your user table
};

export function useCurrentUser() {
  const [user, setUser] = useState<CurrentUser | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/current-user');
        if (!res.ok) return;

        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error('Failed to fetch user:', err);
      }
    };

    fetchUser();
  }, []);

  return user;
}
