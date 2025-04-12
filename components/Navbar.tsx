"use client";
import { MenuList } from "@/lib/config";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  return (
    <div className="flex justify-between items-center p-4 bg-secondary fixed top-0 z-20 w-full shadow-sm">
      <Link href="/">
        <Image
          alt="logo"
          src="/logo.png"
          width={170}
          height={100}
          className="cursor-pointer mix-blend-multiply"
        />
      </Link>

      <div className="flex items-center justify-center w-1/4 relative">
        <Input
          type="text"
          placeholder="Search jobs here..."
          className="border-2 border-custom text-sm p-4 w-full shadow-lg pr-10 rounded-full text-custom font-semibold"
        />

        <Button className="cursor-pointer absolute right-0  bg-custom rounded-l-none rounded-r-full hover:bg-none">
          <Search size={"icon"} className="h-8 w-8 " />
        </Button>
      </div>

      <div className="flex items-center gap-6">
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
