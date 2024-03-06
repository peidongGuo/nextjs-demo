## Next.js 打造一个青少年编程考试模拟系统

### Mini CMS 系统

### 关键功能
1. 在线代码编辑器；
2. 自动执行代码，对比代码来算考试分；
3. 题库系统；
4. 模拟考试系统；
5. dashboard;
6. 考试试题分析；
3. 简单的登录系统；

### 艰难技术点
1. 在线代码编辑器
https://github.com/Samyc2002/React-IDE
https://github.com/Vishal-raj-1/code_deck
https://github.com/devansh016/Cloud-IDE
https://github.com/kallefrombosnia/amxx-online
https://github.com/Ajeet1606/code_crushed
https://github.com/Kshitiz1403/Collaborative-IDE
https://github.com/souravrax/codeditor-front
另外参考：
https://github.com/judge0/judge0   远程代码运行项目 https://judge0.com/#pricing
https://rapidapi.com/judge0-official/api/judge0-ce/pricing  接口请求平台
https://github.com/michaelliao/remote-code-runner  类似于在本机执行 cmd 命令，将 output 返回，可以不参考了。
https://github.com/zakariamaaraki/RemoteCodeCompiler 类似于在本机执行 cmd 命令，将 output 返回，可以不参考了。
https://cloud.tencent.com/developer/article/2116163

![alt text](image.png)

2. vercel 部署
https://vercel.com/templates/next.js
https://nextjs.org/

3.CMS 系统
https://vercel.com/templates/next.js/nextjs-blog-with-microcms
https://vercel.com/templates/next.js/blog-agility-cms-nextjs

3. 其他收获
https://github.com/asciinema/asciinema
itermal  录屏

https://www.w3cschool.cn/python3/python3-tutorial.html
https://123.w3cschool.cn/webtools  工具网站



### 开发日志
#### 2024.3.5
主要搜索技术难点的解决方案。
在线代码编辑器，基本是：前端收集代码字符串，传输给后端服务进行运行，然后返回运行结果给前端，前端根据结果来进行显示。

#### 2024.3.6
测试本地部署第一个在线编辑器方案；
https://github.com/Samyc2002/React-IDE
![alt text](image-1.png)
这个方案也是，前端 react app，react-code-mirror 组件配置，加 paika.io.rapidapi.com 做服务端来解析代码

测试本地部署第二个在线编辑器方案；
https://github.com/Vishal-raj-1/code_deck
这个方案也是，前端 react app，react-code-mirror 组件配置，加 jugde0.io.rapidapi.com 做服务端来解析代码

测试本地部署第三个在线编辑器方案；
https://github.com/devansh016/Cloud-IDE
这个方案也是，前端 native javascript, texteditor 组件配置，用 node express 起前端服务，代码 runner 也是用 jugde0.io.rapidapi.com 做服务端来解析代码

测试本地部署第四个在线编辑器方案；
https://github.com/kallefrombosnia/amxx-online
框架设计不对，前端服务 node express 起个服务，然后还用到了 exe 执行程序，经测试跑不起来。

测试本地部署第五个在线编辑器方案；
https://github.com/Ajeet1606/code_crushed
框架是理想中的，前端 react + monoca editor,后端用的 jugde0, 算是比较理想的了。 界面要稍调整一下，然后，代码编写时要加一些 snippet

https://github.com/Kshitiz1403/Collaborative-IDE
这个是全栈的,很有借鉴意义，但现在不太适合用它，因为它可能太过复杂，而且依赖于运行主机要安装多种语言的运行容器

https://github.com/souravrax/codeditor-front  只参考前端的就好，后端暂时先不管
https://codeditorproject.web.app/

最后理想方案，参考第五个方案就可以。


## Next.js App Router Course - Starter

This is the starter template for the Next.js App Router Course. It contains the starting code for the dashboard application.

For more information, see the [course curriculum](https://nextjs.org/learn) on the Next.js Website.
