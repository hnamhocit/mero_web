"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

import { getUserLocation, shortName } from "@/utils";
import { useUserStore } from "@/stores";
import { Image } from "@heroui/react";

export default function Home() {
  const { user } = useUserStore();
  const [greeting, setGreeting] = useState("");
  const [weather, setWeather] = useState<{
    temperature: number;
    weatherCode: number;
  } | null>(null);

  useEffect(() => {
    const now = new Date();
    const hours = now.getHours();
    if (hours < 12) setGreeting("Good morning");
    else if (hours < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");

    getUserLocation()
      .then(({ lat, lon }) =>
        fetch(`/api/weather?lat=${lat}&lon=${lon}`).then((r) => r.json())
      )
      .then((data) => {
        if (data.temperature !== undefined) {
          setWeather({
            temperature: data.temperature,
            weatherCode: data.weatherCode,
          });
        }
      })
      .catch((err) => {
        console.log("Cannot fetch weather:", err);
      });
  }, []);

  function weatherEmoji(code: number): string {
    if (code === 0) return "☀️";
    if (code < 50) return "🌤️";
    return "🌧️";
  }

  return (
    <motion.div
      className="h-screen flex flex-col items-center justify-center text-center bg-semidark text-white"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="space-y-7">
        <div className="flex justify-center">
          <div className="flex items-center justify-center h-16 w-16 rounded-2xl bg-white shadow-md">
            <Image src="/logo.png" alt="Logo" width={40} height={40} />
          </div>
        </div>

        <div className="space-y-2">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl font-semibold tracking-wide"
          >
            {greeting} {weather ? weatherEmoji(weather.weatherCode) : ""}
          </motion.div>

          <div className="text-3xl font-bold">
            How are you today, {shortName(user?.displayName as string)}?
          </div>

          {weather && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg text-gray-300"
            >
              {Math.round(weather.temperature)}°C{" "}
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
