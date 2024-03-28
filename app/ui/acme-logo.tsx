import { CodeBracketIcon } from '@heroicons/react/24/outline';
import { inter } from '@/app/ui/fonts';

export default function AcmeLogo() {
  return (
    <div
      className={`${inter.className} flex flex-row items-center leading-none text-white`}
    >
      <CodeBracketIcon className="h-8 w-8" />
      <p className="ml-2 whitespace-nowrap text-[20px]">青少年编程</p>
    </div>
  );
}
