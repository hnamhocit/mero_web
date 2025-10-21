import {
  ActivityIcon,
  FlagIcon,
  OmegaIcon,
  PawPrintIcon,
  PersonStandingIcon,
  SearchIcon,
  Smile,
  SmileIcon,
  TargetIcon,
  UtensilsCrossedIcon,
} from "lucide-react";
import clsx from "clsx";
import { useState } from "react";
import { Button, Input, Tooltip } from "@heroui/react";

import categories from "@/assets/json/emoji/categories.json";
import smileysEmotion from "@/assets/json/emoji/categories/smileys-emotion.json";
import activities from "@/assets/json/emoji/categories/activities.json";
import animalsNature from "@/assets/json/emoji/categories/animals-nature.json";
import flags from "@/assets/json/emoji/categories/flags.json";
import foodDrink from "@/assets/json/emoji/categories/food-drink.json";
import objects from "@/assets/json/emoji/categories/objects.json";
import peopleBody from "@/assets/json/emoji/categories/people-body.json";
import symbols from "@/assets/json/emoji/categories/symbols.json";
import travelPlaces from "@/assets/json/emoji/categories/travel-places.json";
import { useComposerStore } from "@/stores";

function CategoryIcon(slug: string) {
  switch (slug) {
    case "smileys-emotion":
      return <SmileIcon size={20} />;
    case "people-body":
      return <PersonStandingIcon size={20} />;
    case "animals-nature":
      return <PawPrintIcon size={20} />;
    case "food-drink":
      return <UtensilsCrossedIcon size={20} />;
    case "activities":
      return <ActivityIcon size={20} />;
    case "objects":
      return <TargetIcon size={20} />;
    case "symbols":
      return <OmegaIcon size={20} />;
    default:
      return <FlagIcon size={20} />;
  }
}

function getEmojiList(slug: string) {
  switch (slug) {
    case "smileys-emotion":
      return smileysEmotion;
    case "people-body":
      return peopleBody;
    case "animals-nature":
      return animalsNature;
    case "food-drink":
      return foodDrink;
    case "activities":
      return activities;
    case "objects":
      return objects;
    case "symbols":
      return symbols;
    case "travel-places":
      return travelPlaces;
    default:
      return flags;
  }
}

const Emoji = () => {
  const [activeSlug, setActiveSlug] = useState("smileys-emotion");
  const { setContent, content } = useComposerStore();

  return (
    <Tooltip
      content={
        <div className="space-y-4 min-h-60 min-w-40 py-2">
          <Input
            placeholder="Enter here..."
            endContent={<SearchIcon size={20} />}
          />

          <div className="flex items-center gap-3 flex-wrap">
            {categories.map((category) => (
              <button
                key={category.slug}
                onClick={() => setActiveSlug(category.slug)}
                className={clsx(
                  "block p-1 rounded-xl hover:bg-semilight transition-colors",
                  category.slug === activeSlug && "bg-semilight"
                )}
              >
                {CategoryIcon(category.slug)}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-8 gap-3 max-h-40 overflow-y-scroll no-scrollbar">
            {getEmojiList(activeSlug).map((emoji) => (
              <button
                key={emoji.character}
                onClick={() => setContent(content + emoji.character)}
                className="block p-1 rounded-xl hover:bg-semilight transition-colors"
              >
                {emoji.character}
              </button>
            ))}
          </div>
        </div>
      }
    >
      <Button isIconOnly size="sm" variant="light">
        <Smile size={20} />
      </Button>
    </Tooltip>
  );
};

export default Emoji;
