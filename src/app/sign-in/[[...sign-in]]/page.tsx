import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-blue-200 rounded-full opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-1/4 w-20 h-20 bg-indigo-200 rounded-full opacity-25 animate-pulse delay-2000"></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-purple-300 rounded-full opacity-20 animate-pulse delay-500"></div>

        <div className="absolute top-1/3 right-10 w-16 h-16 bg-gradient-to-r from-purple-300 to-blue-300 rounded-lg opacity-30 transform rotate-12 animate-bounce"></div>
        <div className="absolute bottom-1/3 left-20 w-12 h-12 bg-gradient-to-r from-blue-300 to-indigo-300 rounded-lg opacity-25 transform -rotate-12 animate-bounce delay-1000"></div>
      </div>

      {/* Centered Sign In Component */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <SignIn />
      </div>
    </div>
  );
}
