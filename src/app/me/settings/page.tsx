"use client";

import { useUserStore } from "@/stores";
import { Button } from "@heroui/react";

const Settings = () => {
  const { logout } = useUserStore();

  return (
    <div className="p-4 space-y-16">
      <div className="space-y-4">
        <div className="text-2xl font-semibold text-red-500">Danger Zone</div>

        <div className="flex items-center gap-3">
          <Button color="danger" onPress={logout}>
            Logout
          </Button>

          <Button color="danger" variant="bordered">
            Delete account
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
