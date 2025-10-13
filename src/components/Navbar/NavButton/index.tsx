import { Tooltip } from "@heroui/react";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

function NavButton({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: React.ElementType;
  label: string;
}) {
  const pathname = usePathname();

  const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <Tooltip content={label} placement="right">
      <Link
        href={href}
        className={clsx(
          "flex items-center justify-center p-3 rounded-xl transition-colors",
          "hover:bg-white/20 text-gray-300 hover:text-white",
          isActive && "bg-purple-500 text-white",
        )}
      >
        <Icon size={20} />
      </Link>
    </Tooltip>
  );
}

export default NavButton;
