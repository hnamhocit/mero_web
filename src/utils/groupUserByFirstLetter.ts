import { IUser } from "@/interfaces";

export function groupUsersByFirstLetter(users: IUser[]) {
  const sorted = [...users].sort((a, b) =>
    a.displayName.localeCompare(b.displayName, "vi", { sensitivity: "base" })
  );

  return sorted.reduce<Record<string, IUser[]>>((acc, user) => {
    const firstLetter = user.displayName.trim().charAt(0).toUpperCase();
    if (!acc[firstLetter]) acc[firstLetter] = [];
    acc[firstLetter].push(user);
    return acc;
  }, {});
}
