import { ReactNode } from 'react';

import { Sidebar, FollowBar } from '@/components';

interface ComponentProps {
  children: ReactNode;
}

const Layout = ({ children }: ComponentProps) => {
  return (
    <div className="h-screen bg-black">
      <div className="container h-full mx-auto xl:px-32 max-w-6xl">
        <div className="grid grid-cols-4 h-full">
          <Sidebar />
          <div className="col-span-3 lg:col-span-2 border-x-[1px] border-neutral-800">
            {children}
          </div>
          <FollowBar />
        </div>
      </div>
    </div>
  );
};

export default Layout;
