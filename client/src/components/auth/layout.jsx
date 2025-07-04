import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full">
      <div className="hidden lg:flex items-center justify-center bg-black w-1/2 px-12">
        <div className="max-w-md space-y-6 text-center text-primary-foreground">
          <h1 className="text-5xl font-extrabold tracking-tight text-white">
            Welcome to <span className="text-indigo-400">DealHut</span>
          </h1>
          <p className="text-xl font-medium text-gray-400 mt-4">
            Discover the best deals, fast checkout,
            <br /> and smooth shopping experience.
          </p>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
