import { useRouter } from 'next/router';
import { FaFeather } from 'react-icons/fa';

import { Routes } from '@/typings/routes';

const SidebarTweetButton = () => {
  const router = useRouter();

  return (
    <div onClick={() => router.push(Routes.HOME)}>
      <div className="mt-6 lg:hidden rounded-full w-14 h-14 p-4 flex items-center justify-center bg-sky-500 hover:opacity-80 cursor-pointer transition">
        <FaFeather size={28} color="white" />
      </div>
      <div className="mt-6 hidden lg:block px-4 py-2 rounded-full bg-sky-500 hover:opacity-80 cursor-pointer transition">
        <p className="hidden lg:block text-center font-semibold text-white text-[20px]">
          Tweet
        </p>
      </div>
    </div>
  );
};

export default SidebarTweetButton;
