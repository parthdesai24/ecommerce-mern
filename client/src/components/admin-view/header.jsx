import { AlignJustify, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/store/auth-slice";

function AdminHeader({setOpen}) {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  }
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-background border-b">
      <Button onClick={() => setOpen(true)} className="lg:hidden sm:block">
        <AlignJustify />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      <div className="flex flex-1 justify-end">
        <Button
        onClick={handleLogout}
          className="inline-flex gap-2 items-center rounded-md lg:px-4 lg:py-2 sm:px-2 sm:py-1 text-sm sm:text-xs font-medium shadow"
          >
          <LogOut />
          Logout
        </Button>
      </div>
    </header>
  );
}
export default AdminHeader;
