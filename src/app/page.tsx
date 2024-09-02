import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CheckCircle,
  Code,
  Database,
  Github,
  Globe,
  Key,
  Lock,
  LogOut,
  Menu,
  Shield,
  Zap,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { auth, signOut } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function Component() {
  const session = await auth();

  console.log(session);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <header className="px-4 lg:px-6 h-16 flex items-center justify-between backdrop-blur-sm bg-white/30 dark:bg-gray-800/30 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <Link className="flex items-center justify-center" href="#">
          <Lock className="h-6 w-6 mr-2 text-primary" />
          <span className="font-bold text-xl">NextAuth Starter</span>
        </Link>
        <nav className="hidden md:flex items-center gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium hover:text-primary transition-colors"
            href="#features"
          >
            Features
          </Link>
          <Link
            className="text-sm font-medium hover:text-primary transition-colors"
            href="#tech-stack"
          >
            Tech Stack
          </Link>
          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar>
                    <AvatarImage
                      src={
                        session?.user?.image || "https://github.com/shadcn.png"
                      }
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <form
                    action={async () => {
                      "use server";
                      await signOut();
                    }}
                  >
                    <button className="w-full text-left flex items-center">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </button>
                  </form>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild variant="ghost" size="sm">
              <Link href="/auth/sign-in">Sign In</Link>
            </Button>
          )}
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-4 mt-4">
              <Link
                className="text-sm font-medium hover:text-primary transition-colors"
                href="#features"
              >
                Features
              </Link>
              <Link
                className="text-sm font-medium hover:text-primary transition-colors"
                href="#tech-stack"
              >
                Tech Stack
              </Link>
              {session ? (
                <form
                  action={async () => {
                    "use server";
                    await signOut();
                  }}
                >
                  <button className="w-full text-left flex items-center text-sm font-medium hover:text-primary transition-colors">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </button>
                </form>
              ) : (
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start"
                >
                  <Link href="/auth/sign-in">Sign In</Link>
                </Button>
              )}
            </nav>
          </SheetContent>
        </Sheet>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 px-4">
          <div className="container mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                  Next.js 14 Auth Starter
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Jumpstart your Next.js project with a powerful database
                  strategy authentication system using Auth.js, Prisma, and
                  NeonDB. Secure, scalable, and easy to integrate.
                </p>
              </div>
              <div className="space-x-4">
                <Button asChild size="lg" className="rounded-full">
                  <Link href="/auth/sign-in">Get Started</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="rounded-full"
                >
                  <Link href="https://github.com/yourusername/nextjs-auth-starter">
                    <Github className="mr-2 h-4 w-4" />
                    View on GitHub
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section
          id="features"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800"
        >
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              Key Features
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="bg-white dark:bg-gray-800 border-none shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <Shield className="h-12 w-12 mb-4 text-primary" />
                  <CardTitle className="text-xl">Multi-Strategy Auth</CardTitle>
                </CardHeader>
                <CardContent>
                  Integrated with Auth.js for flexible authentication including
                  Credentials, GitHub, and Google strategies.
                </CardContent>
              </Card>
              <Card className="bg-white dark:bg-gray-800 border-none shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <Database className="h-12 w-12 mb-4 text-primary" />
                  <CardTitle className="text-xl">Prisma ORM & NeonDB</CardTitle>
                </CardHeader>
                <CardContent>
                  Robust database management with Prisma ORM and NeonDB
                  serverless PostgreSQL for efficient, scalable data handling.
                </CardContent>
              </Card>
              <Card className="bg-white dark:bg-gray-800 border-none shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <Code className="h-12 w-12 mb-4 text-primary" />
                  <CardTitle className="text-xl">
                    Type-Safe Development
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  Leverage Zod for schema validation and Conform for type-safe
                  form handling in your Next.js app.
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section
          id="tech-stack"
          className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-900"
        >
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              Tech Stack
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center text-center space-y-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md">
                <Zap className="h-12 w-12 text-primary" />
                <div>
                  <h3 className="font-bold text-lg">Next.js 14</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    React framework for server-rendered apps
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center text-center space-y-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md">
                <Key className="h-12 w-12 text-primary" />
                <div>
                  <h3 className="font-bold text-lg">Auth.js (NextAuth)</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Authentication for Next.js
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center text-center space-y-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md">
                <Database className="h-12 w-12 text-primary" />
                <div>
                  <h3 className="font-bold text-lg">Prisma & NeonDB</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    ORM and serverless PostgreSQL database
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center text-center space-y-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md">
                <CheckCircle className="h-12 w-12 text-primary" />
                <div>
                  <h3 className="font-bold text-lg">Zod</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    TypeScript-first schema validation
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center text-center space-y-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md">
                <Code className="h-12 w-12 text-primary" />
                <div>
                  <h3 className="font-bold text-lg">Conform</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Type-safe form validation library
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center text-center space-y-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md">
                <Globe className="h-12 w-12 text-primary" />
                <div>
                  <h3 className="font-bold text-lg">Shadcn & Tailwind CSS</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    UI components and utility-first CSS
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          id="get-started"
          className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-primary to-purple-600 text-white"
        >
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Ready to Get Started?
                </h2>
                <p className="mx-auto max-w-[600px] text-primary-foreground/80 md:text-xl">
                  Clone our repository now and start building your Next.js
                  application with advanced authentication, serverless database,
                  and a robust tech stack in minutes.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <Button
                  asChild
                  className="w-full"
                  variant="secondary"
                  size="lg"
                >
                  <Link href="https://github.com/yourusername/nextjs-auth-starter">
                    <Github className="mr-2 h-4 w-4" />
                    Clone Repository
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full py-6 bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © 2024 NextAuth Starter. All rights reserved.
            </p>
            <nav className="flex gap-4 sm:gap-6">
              <Link
                className="text-sm hover:underline underline-offset-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                href="#"
              >
                Terms of Service
              </Link>
              <Link
                className="text-sm hover:underline underline-offset-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                href="#"
              >
                Privacy Policy
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
