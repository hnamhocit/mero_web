import { useState } from "react";
import { Button, Card, InputOtp } from "@heroui/react";
import clsx from "clsx";

import { useUserStore } from "@/stores";

export default function ConfirmEmail() {
  const { user, verifyEmail } = useUserStore();
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (value.trim() !== user?.verificationCode) {
      setError("Invalid verification code");
      return;
    }

    if (Date.now() > (user?.verificationCodeExpiresAt?.valueOf() || 0)) {
      setError("Verification code expired");
      return;
    }

    setLoading(true);
    try {
      verifyEmail();
    } catch (err) {
      setError(JSON.stringify(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 to-indigo-500">
      <Card className="p-8 w-full max-w-md shadow-xl bg-white rounded-2xl">
        <div className="text-center mb-6">
          <h1 className="text-2xl text-black font-semibold">
            Confirm Your Email
          </h1>

          <p className="text-gray-700 mt-2">
            Please enter the 6-digit verification code we sent to your email.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 items-center"
        >
          <InputOtp
            length={6}
            value={value}
            onValueChange={setValue}
            isInvalid={!!error}
            classNames={{
              base: "gap-3",
              input:
                "text-lg font-semibold w-12 h-12 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-center",
            }}
          />

          {error && <p className="text-sm text-red-600 font-medium">{error}</p>}

          <Button
            type="submit"
            className={clsx(
              "w-full text-white font-medium py-2.5 rounded-lg transition-all",
              loading ? "bg-indigo-400" : "bg-indigo-600 hover:bg-indigo-700",
            )}
            isLoading={loading}
          >
            Verify Email
          </Button>
        </form>
      </Card>
    </div>
  );
}
