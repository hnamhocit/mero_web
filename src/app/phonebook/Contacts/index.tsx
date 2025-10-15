import { api, socket } from "@/config";
import { IUser } from "@/interfaces";
import { groupUsersByFirstLetter } from "@/utils";
import React, { FC, memo, useEffect, useMemo, useState } from "react";
import ContactSection from "./ContactSection";

interface ContactsProps {
  q: string;
}

const Contacts: FC<ContactsProps> = ({ q }) => {
  const [friends, setFriends] = useState<IUser[]>([]);
  const [filteredFriends, setFilteredFriends] = useState<IUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFriends = async () => {
      const response = await api.get("/users/me/friends");
      setFriends(response.data);
      setFilteredFriends(response.data);
      setIsLoading(false);
    };

    fetchFriends();
  }, []);

  useEffect(() => {
    const handleNewFriend = (friend: IUser) => {
      setFriends((prev) => [...prev, friend]);
      setFilteredFriends((prev) => [...prev, friend]);
    };

    socket.on("friend:new", handleNewFriend);

    return () => {
      socket.off("friend:new", handleNewFriend);
    };
  }, []);

  const grouped = useMemo(() => {
    return groupUsersByFirstLetter(
      filteredFriends.filter((f) =>
        f.displayName.toLocaleLowerCase().includes(q.toLocaleLowerCase())
      )
    );
  }, [filteredFriends, q]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {Object.entries(grouped).map(([letter, users]) => (
        <ContactSection key={letter} letter={letter} contacts={users} />
      ))}
    </div>
  );
};

export default memo(Contacts);
