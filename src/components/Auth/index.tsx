import Image from "next/image";

import AuthForm from "./AuthForm";

const Auth = () => {
  return (
    <div className="h-screen flex">
      <div className="flex-1 w-full bg-primary -z-20 p-7 relative overflow-hidden">
        <div className="absolute top-0 right-0 scale-150 -z-10 translate-x-1/2 -translate-y-1/2 w-full h-full rounded-full bg-[#9767e2] backdrop-blur-2xl flex items-center justify-center">
          <div className="w-3/4 h-3/4 rounded-full bg-[#9d6ee4] flex items-center justify-center">
            <div className="w-3/4 h-3/4 bg-[#a176e4] rounded-full"></div>
          </div>
        </div>

        <div className="flex flex-col gap-24 max-w-1/2 text-white">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="Logo" width={32} height={32} />
            <div className="text-xl font-bold">HNCHAT</div>
          </div>

          <div className="flex flex-col gap-7">
            <div>Hnchat Freehand Enterprise</div>

            <div className="text-2xl font-bold">
              Transformative collaboration for larger teams
            </div>

            <button className="py-4 px-6 block w-fit font-medium shadow-md shadow-purple-500/10 bg-[#9d6ee4]">
              Schedule a demo
            </button>
          </div>
        </div>
      </div>

      <div className="shrink-0 w-1/3 flex items-center justify-center bg-dark">
        <AuthForm />
      </div>
    </div>
  );
};

export default Auth;
