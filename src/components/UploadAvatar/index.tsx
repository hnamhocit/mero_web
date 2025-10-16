import { Avatar, AvatarProps } from "@heroui/react";
import { ChangeEvent, FC, memo, useEffect, useRef, useState } from "react";

interface UploadAvatarProps extends AvatarProps {
  onFileChange: (file: File) => void;
}

const UploadAvatar: FC<UploadAvatarProps> = ({
  onFileChange,
  ...avatarProps
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [blob, setBlobs] = useState<string | null>(null);
  const ref = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setFile(file);
      setBlobs(URL.createObjectURL(file));
      onFileChange(file);
    }
  };

  useEffect(() => {
    return () => {
      if (blob) {
        URL.revokeObjectURL(blob);
      }
    };
  }, []);

  return (
    <div>
      <input
        ref={ref}
        type="file"
        hidden
        onChange={handleChange}
        accept="image/*"
      />
      <Avatar
        {...avatarProps}
        src={blob ?? ""}
        onClick={() => ref.current?.click()}
      />
    </div>
  );
};

export default memo(UploadAvatar);
