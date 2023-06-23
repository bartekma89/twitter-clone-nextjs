import { BsHouseFill, BsBellFill } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';
import { BiLogOut } from 'react-icons/bi';

import {
  SidebarLogo,
  SidebarItem,
  SidebarTweetButton,
} from '@/components';
import { Routes } from '@/typings/routes';

const Sidebar = () => {
  const items = [
    {
      label: 'Home',
      href: Routes.HOME,
      icon: BsHouseFill,
    },
    {
      label: 'Notifications',
      href: Routes.NOTIFICATIONS,
      icon: BsBellFill,
    },
    {
      label: 'Profile',
      href: `${Routes.USERS}/123`,
      icon: FaUser,
    },
  ];

  return (
    <div className="col-span-1 h-full pr-4 md:pr-6">
      <div className="flex flex-col items-end">
        <div className="space-y-2 lg:w-[230px]">
          <SidebarLogo />
          {items.map((item) => (
            <SidebarItem
              key={item.href}
              href={item.href}
              label={item.label}
              icon={item.icon}
            />
          ))}
          <SidebarItem
            icon={BiLogOut}
            label="Logout"
            onClick={() => {}}
          />
          <SidebarTweetButton />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
