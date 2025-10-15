import { Button, Image } from "@heroui/react";
import { BoltIcon, PhoneIcon, VideoIcon } from "lucide-react";

const Header = () => {
  return (
    <div className="sticky top-0 left-0 w-full h-16 border-b border-white/10 flex items-center justify-between px-4 bg-semilight">
      <div className="flex items-center gap-3">
        <Image
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP5ZUpPdZVKWaCvqmZulKqnEzDKffKbGQpvQ&s"
          radius="full"
          alt="Logo"
          width={40}
          height={40}
          className="object-cover"
        />

        <div>
          <div className="text-white line-clamp-1 font-semibold">Nhung</div>
          <div className="text-sm line-clamp-1 text-white/50">
            “Stars can’t shine without darkness.” ✨
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button isIconOnly variant="light">
          <PhoneIcon size={20} />
        </Button>

        <Button isIconOnly variant="light">
          <VideoIcon size={20} />
        </Button>

        <Button isIconOnly variant="light">
          <BoltIcon size={20} />
        </Button>
      </div>
    </div>
  );
};

export default Header;
