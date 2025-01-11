import { ShieldAlert } from "lucide-react";

export const AdminPermissionRequired = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex flex-col gap-y-2 items-center justify-center">
        <ShieldAlert size={50} color="red" />
        <h1>you dont have permissions to view this page.</h1>
      </div>
    </div>
  );
};
