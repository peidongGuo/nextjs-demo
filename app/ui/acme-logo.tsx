import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { inter } from '@/app/ui/fonts';

export default function AcmeLogo() {
  return (
    <div
      className={`${inter.className} flex flex-row items-center leading-none text-white`}
    >
      <GlobeAltIcon className="h-12 w-12 rotate-[15deg]" />
      <p className="whitespace-nowrap text-[30px]">青少年编程</p>
    </div>
  );
}
