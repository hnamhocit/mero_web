import clsx from "clsx";
import { EyeClosedIcon, EyeIcon } from "lucide-react";
import { InputHTMLAttributes, useState } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const Input = ({ type, error, ...props }: InputProps) => {
  const [isShow, setIsShow] = useState(false);
  const toggleIsShow = () => setIsShow(!isShow);

  return (
    <div className="flex flex-col gap-1">
      <div
        className={clsx(
          "flex items-center gap-3 py-2 px-3 border-b-2 border-white/10",
          {
            "!border-red-500": error,
          },
        )}
      >
        <input
          {...props}
          type={type === "password" ? (isShow ? "text" : "password") : type}
          className={`block w-full outline-none bg-transparent`}
          autoComplete="off"
          spellCheck={false}
        />

        {type === "password" && (
          <button
            type="button"
            onClick={toggleIsShow}
            className="text-gray-500 hover:text-gray-700"
          >
            {isShow ? <EyeClosedIcon size={18} /> : <EyeIcon size={18} />}
          </button>
        )}
      </div>

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default Input;
