import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { BiArrowBack } from 'react-icons/bi';

interface ComponentProps {
  label: string;
  showBackArrow?: boolean;
}

const Header = ({
  label,
  showBackArrow,
}: ComponentProps) => {
  const router = useRouter();

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <div className="border-b-[1px] border-neutral-800 p-5">
      <div className="flex flex-row items-center gap-2">
        {showBackArrow && (
          <BiArrowBack
            onClick={handleBack}
            size={28}
            color="white"
            className="cursor-pointer hover:opacity-70 transition"
          />
        )}
        <h1 className="text-white text-xl font-semibold ">
          {label}
        </h1>
      </div>
    </div>
  );
};

export default Header;
