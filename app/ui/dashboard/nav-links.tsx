'use client';

import {
  UserGroupIcon,
  UserIcon,
  HomeIcon,
  AcademicCapIcon,
  PuzzlePieceIcon,
  ShoppingCartIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: '首页', href: '/dashboard', icon: HomeIcon },
  { name: '用户', href: '/dashboard/profile', icon: UserIcon },
  { name: '试卷', href: '/dashboard/exams', icon: DocumentDuplicateIcon },
  { name: '考试', href: '/dashboard/exam-records', icon: AcademicCapIcon },
  { name: '试题', href: '/dashboard/questions', icon: AcademicCapIcon },
  {
    name: '订单',
    href: '/dashboard/orders',
    icon: ShoppingCartIcon,
  },
  // { name: '数据看板', href: '/admin', icon: HomeIcon },
  // { name: '试卷列表', href: '/admin/papers', icon: DocumentDuplicateIcon },
  // { name: '试题列表', href: '/admin/questions', icon: PuzzlePieceIcon },
  // { name: '用户列表', href: '/admin/customers', icon: UserGroupIcon },
  // {
  //   name: '订单列表',
  //   href: '/admin/orders',
  //   icon: ShoppingCartIcon,
  // },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            title={link.name}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-sky-100 text-blue-600': pathname === link.href,
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
