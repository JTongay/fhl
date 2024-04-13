'use client';

import {PropsWithChildren} from 'react';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {useLoggedInUser} from '@/hooks/useLoggedInUser';

export const NavBar = ({children}: PropsWithChildren) => {
  const {user} = useLoggedInUser();
  return (
    <>
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="flex-1
                flex
                items-center
                justify-center
                sm:items-stretch
                sm:justify-start"
            >
              <div className="flex-shrink-0 flex items-center">
                <Avatar>
                  <AvatarImage src={user?.user.imageUrl} />
                  <AvatarFallback>FHL</AvatarFallback>
                </Avatar>
              </div>
              <div className="hidden sm:block sm:ml-6">
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="bg-gray-900
                    text-white px-3 py-2 rounded-md text-sm font-medium">
                                        Dashboard
                  </a>
                  <a
                    href="#"
                    className="text-gray-900
                    px-3 py-2 rounded-md text-sm font-medium"
                  >
                                        Teams
                  </a>
                  <a
                    href="#"
                    className="text-gray-900
                    px-3 py-2 rounded-md text-sm font-medium"
                  >
                                        Seasons
                  </a>
                  <a
                    href="#"
                    className="text-gray-900
                    px-3 py-2 rounded-md text-sm font-medium"
                  >
                                        Players
                  </a>
                </div>
              </div>
            </div>
            <div
              className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:pr-0">
              <button
                type="button"
                className="bg-gray-900 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              >
                <span className="sr-only">View notifications</span>
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"></svg>
              </button>
            </div>
          </div>
        </div>
      </nav>
      {children}
    </>
  );
};
