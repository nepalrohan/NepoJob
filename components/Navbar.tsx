"use client";
import { MenuList } from "@/lib/config";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Menu, Search, SquareX } from "lucide-react";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [open, SetOpen] = useState<Boolean>(false);
  const pathname = usePathname();
  return (
    <div className="flex gap-5 sm:gap-0 justify-between items-center px-1 py-3 sm:p-4 bg-secondary fixed top-0 z-20 w-full shadow-sm">
      <Link href="/">
        <Image
          alt="logo"
          src="/logo.png"
          width={170}
          height={100}
          className="cursor-pointer mix-blend-multiply w-35 sm:w-40"
        />
      </Link>

      <div className="flex items-center justify-center  md:w-1/4 relative">
        <Input
          type="text"
          placeholder="Search jobs here..."
          className="border-2 border-custom text-sm  sm:p-4 w-full shadow-lg pr-10 rounded-full text-custom font-semibold"
        />

        <Button className="cursor-pointer absolute right-0  bg-custom rounded-l-none rounded-r-full hover:bg-none">
          <Search className=" w-8 h-8" />
        </Button>
      </div>
      <div className="lg:hidden flex flex-col relative items-center justify-center ">
        <Menu
          size={28}
          className=" text-custom transition-all duration-300 "
          onClick={() => SetOpen(true)}
        />

        <div
          className={`absolute -top-5 right-0 bg-secondary    h-screen flex flex-col p-3 transition-all duration-300 ease-in-out ${
            open ? "translate-x-0" : "translate-x-full"
          } `}
        >
          <div className="flex flex-col gap-5">
            <SquareX
              size={28}
              className=" text-custom transition-all duration-300  "
              onClick={() => SetOpen(false)}
            />

            <div className="flex flex-col items-start gap-5 ">
              {MenuList.map((item, index) => {
                const Icon = item.icon;

                return (
                  <Link
                    onClick={() => SetOpen(false)}
                    key={index}
                    href={item.path}
                    className={`text-lg text-custom font-semibold hover:text-hoverColor flex gap-1 items-center ${
                      pathname === item.path ? "text-hoverColor " : ""
                    }`}
                  >
                    {Icon && <Icon />}
                    {item.name}
                  </Link>
                );
              })}

              <div className="flex items-center">
                <Button
                  className="bg-custom cursor-pointer hover:text-hoverColor text-lg font-semibold rounded-r-none"
                  onClick={() => SetOpen(false)}
                >
                  Login
                </Button>
                <Button
                  className="border-custom border-2 text-hoverColor cursor-pointer border-l-0 hover:text-custom rounded-l-none text-lg font-semibold"
                  variant={"outline"}
                  onClick={() => SetOpen(false)}
                >
                  Signup
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex items-center gap-6">
        {MenuList.map((item, index) => {
          const Icon = item.icon;
          return (
            <Link
              key={index}
              href={item.path}
              className={`text-lg text-custom font-semibold hover:text-hoverColor flex gap-1 items-center ${
                pathname === item.path ? "text-hoverColor " : ""
              }`}
            >
              {Icon && <Icon />}
              {item.name}
            </Link>
          );
        })}

        <div className="flex items-center">
          <Button className="bg-custom cursor-pointer hover:text-hoverColor text-lg font-semibold rounded-r-none">
            Login
          </Button>
          <Button
            className="border-custom border-2 text-hoverColor cursor-pointer border-l-0 hover:text-custom rounded-l-none text-lg font-semibold"
            variant={"outline"}
          >
            Signup
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
