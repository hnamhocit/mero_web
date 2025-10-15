import { FC, memo } from "react";

import { IUser } from "@/interfaces";
import Contact from "../Contact";

interface ContactSectionProps {
  letter: string;
  contacts: IUser[];
}

const ContactSection: FC<ContactSectionProps> = ({ letter, contacts }) => {
  return (
    <div>
      <div className="p-4 border-b border-white/10 text-lg font-bold">
        {letter}
      </div>

      <div className="p-2 space-y-2 bg-semidark rounded-b-2xl">
        {contacts.map((c, i) => (
          <Contact key={i} {...c} />
        ))}
      </div>
    </div>
  );
};

export default memo(ContactSection);
