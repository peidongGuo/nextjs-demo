import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
// import { NextRequest, NextResponse } from 'next/server';

// export function middleware(req: NextRequest) {
//   // 检查当前请求的路径是否在管理员只能访问的路径列表中
//   if (adminOnlyPaths.includes(req.nextUrl.pathname)) {
//     // 获取当前用户的权限等信息,这里假设从 session 中获取
//     console.log(req.cookies, 'req.cookies');
//     const { role } = req.cookies;

//     // 如果用户不是管理员,重定向到登录页面
//     if (role !== 'admin') {
//       return NextResponse.redirect('/dashboard');
//     }
//   }

//   // 其他情况下,让请求继续执行
//   return NextResponse.next();
// }

export default NextAuth(authConfig).auth;

// 定义需要管理员权限的页面路径
const adminOnlyPaths = ['/dashboard/questions/create'];

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
