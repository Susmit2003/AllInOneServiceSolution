
// // "use client";

// // import React, { createContext, useState, useContext, useEffect, ReactNode, useCallback } from 'react';
// // import { useRouter, usePathname } from 'next/navigation';
// // import type { UserProfile } from '@/types';
// // import { getSafeUser, logoutUser } from '@/lib/actions/user.actions';

// // interface AuthContextType {
// //   isLoggedIn: boolean;
// //   logout: () => void;
// //   isLoading: boolean;
// //   currentUser: UserProfile | null;
// //   refreshUser: () => Promise<void>;
// // }

// // const AuthContext = createContext<AuthContextType | undefined>(undefined);

// // export function AuthProvider({ children }: { children: ReactNode }) {
// //   const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
// //   const [isLoading, setIsLoading] = useState(true);
// //   const router = useRouter();
// //   const pathname = usePathname();

// //   const fetchUser = useCallback(async () => {
// //     try {
// //       // No need to set isLoading(true) here as it's handled by the effect dependencies
// //       const user = await getSafeUser();
// //       setCurrentUser(user);
// //     } catch (error) {
// //       console.error("Failed to fetch user", error);
// //       setCurrentUser(null);
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   }, []);

// //   useEffect(() => {
// //     setIsLoading(true);
// //     fetchUser();
// //   }, [fetchUser, pathname]);

// //   const logout = useCallback(() => {
// //     setCurrentUser(null);
// //     router.push('/login');
// //     router.refresh();
// //   }, [router]);

// //   const refreshUser = useCallback(async () => {
// //     await fetchUser();
// //   }, [fetchUser]);

// //   const value = { 
// //     isLoggedIn: !!currentUser,
// //     currentUser,
// //     isLoading,
// //     logout,
// //     refreshUser 
// //   };

// //   return (
// //     <AuthContext.Provider value={value}>
// //       {children}
// //     </AuthContext.Provider>
// //   );
// // }

// // export function useAuth() {
// //   const context = useContext(AuthContext);
// //   if (context === undefined) {
// //     throw new Error('useAuth must be used within an AuthProvider');
// //   }
// //   return context;
// // }










// "use client";

// import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
// import { getSafeUser } from '@/lib/actions/user.actions';
// import type { UserProfile } from '@/types';

// // **FIX 1:** Added the refetchUser function to the context type definition.
// interface AuthContextType {
//     currentUser: UserProfile | null;
//     isLoggedIn: boolean;
//     isLoading: boolean;
//     refetchUser: () => Promise<void>;
// }

// const AuthContext = createContext<AuthContextType>({
//     currentUser: null,
//     isLoggedIn: false,
//     isLoading: true,
//     refetchUser: async () => {}, // Provide a default empty function
// });

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//     const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
//     const [isLoading, setIsLoading] = useState(true);

//     // Renamed to refetchUser for clarity, but it's the same function
//     const refetchUser = useCallback(async () => {
//         // Set loading to true when refetching to show loading states if needed
//         setIsLoading(true); 
//         try {
//             const user = await getSafeUser();
//             setCurrentUser(user as UserProfile | null);
//         } catch (error) {
//             console.error("Failed to refetch user", error);
//             setCurrentUser(null);
//         } finally {
//             setIsLoading(false);
//         }
//     }, []);

//     useEffect(() => {
//         refetchUser();
//     }, [refetchUser]);

//     const value = {
//         currentUser,
//         isLoggedIn: !!currentUser,
//         isLoading,
//         refetchUser, // **FIX 2:** Added the function to the value provided by the context.
//     };

//     return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

// export const useAuth = () => useContext(AuthContext);





"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getSafeUser } from '@/lib/actions/user.actions';
import type { UserProfile } from '@/types';

// **FIX 1:** Added the refetchUser function to the context type definition.
interface AuthContextType {
    currentUser: UserProfile | null;
    isLoggedIn: boolean;
    isLoading: boolean;
    refetchUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    currentUser: null,
    isLoggedIn: false,
    isLoading: true,
    refetchUser: async () => {}, // Provide a default empty function
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const refetchUser = useCallback(async () => {
        // No need to set loading true here, as it can cause UI flashes.
        // The individual components can manage their own loading states.
        try {
            const user = await getSafeUser();
            setCurrentUser(user as UserProfile | null);
        } catch (error) {
            console.error("Failed to refetch user", error);
            setCurrentUser(null);
        } finally {
            // Ensure loading is false after the first fetch.
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        refetchUser();
    }, [refetchUser]);

    const value = {
        currentUser,
        isLoggedIn: !!currentUser,
        isLoading,
        refetchUser, // **FIX 2:** Added the function to the value provided by the context.
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

