"use client";
import { MenuList } from "@/lib/config";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  ChevronDown,
  Menu,
  Search,
  ArrowDownWideNarrow,
  SquareX,
} from "lucide-react";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAppSelector } from "@/lib/hooks";

// Job categories list
const jobCategories = [
  "Developer",
  "Designer",
  "Marketing Specialist",
  "Sales Representative",
  "HR Manager",
  "Finance Analyst",
  "Project Manager",
  "Data Analyst",
  "Customer Support",
  "Content Writer",
];

const Navbar = () => {
  const [open, SetOpen] = useState<Boolean>(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const { user } = useAppSelector((state) => state.auth);

  
  const pathname = usePathname();
  return (
    <div className="h-16 sm:h-18  flex gap-5 sm:gap-0 justify-between items-center px-1 bg-mycolor py-3 sm:p-4  fixed top-0 z-20 w-full ">
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
          className="border-2 border-custom text-sm  sm:p-4 w-full shadow-lg pr-14 md:pr-15 rounded-full text-custom font-semibold"
        />

        <Button className="cursor-pointer absolute right-0  bg-custom rounded-l-none rounded-r-full hover:bg-none">
          <Search className=" w-8 h-8" />
        </Button>
      </div>
      <div className="lg:hidden flex flex-col relative items-center justify-center ">
        <Menu
          size={30}
          className=" text-custom transition-all duration-300 "
          onClick={() => SetOpen(true)}
        />

        <div
          className={`absolute -top-5 -right-2  bg-mycolor   h-screen flex flex-col p-3 transition-all duration-300 ease-in-out ${
            open ? "translate-x-0" : "translate-x-full"
          } `}
        >
          <div className="flex flex-col gap-5 ">
            <SquareX
              size={30}
              className=" text-custom transition-all duration-300  "
              onClick={() => SetOpen(false)}
            />

            <div className="flex flex-col items-start gap-5 bg-mycolor">

             {
              user?.role ==='JOBSEEKER' ?  <div className="flex flex-col items-start gap-5 bg-mycolor">
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
              </div>:null
             }
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="text-lg text-custom font-semibold hover:text-hoverColor flex gap-1 items-center cursor-pointer">
                    <ArrowDownWideNarrow />
                    Categories <ChevronDown className="h-4 w-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                  {jobCategories.map((category, index) => (
                    <DropdownMenuItem key={index}>
                      <Link
                        href={`/jobs/${category
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                        className="w-full "
                        onClick={() => SetOpen(false)}
                      >
                        {category}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <div className="flex items-center">
              {
                user && user ===null ? (  <>
                <Button
                  className="bg-custom cursor-pointer hover:text-hoverColor text-lg font-semibold rounded-r-none"
                  onClick={() => SetOpen(false)}
                >
              <Link href='/login'>   Login</Link>
                </Button>
                <Button
                  className="border-custom border-2 text-hoverColor cursor-pointer border-l-0 hover:text-custom rounded-l-none text-lg font-semibold"
                  variant={"outline"}
                  onClick={() => SetOpen(false)}
                >
                        <Link href='/signup'>Signup</Link>

                </Button></>):(<>
                  <Button
                  className="border-custom border-2 text-hoverColor cursor-pointer  hover:text-custom text-lg font-semibold"
                  variant={"outline"}
                  onClick={() => SetOpen(false)}
                >
                        <Link href='/logout'>Logout</Link>

                </Button></>)
              }
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex items-center gap-6">
      {
              user?.role ==='JOBSEEKER' ?  <div  className="hidden lg:flex items-center gap-6">
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
              </div>:null
             }
        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
          <PopoverTrigger asChild>
            <button
              className="text-lg text-custom font-semibold hover:text-hoverColor cursor-pointer  flex gap-1 items-center "
              onMouseEnter={() => setIsPopoverOpen(true)}
              onMouseLeave={() => setIsPopoverOpen(false)}
            >
              Categories <ChevronDown className="h-4 w-4 " />
            </button>
          </PopoverTrigger>
          <PopoverContent
            className="w-56"
            onMouseEnter={() => setIsPopoverOpen(true)}
            onMouseLeave={() => setIsPopoverOpen(false)}
          >
            <div className="flex flex-col space-y-1">
              {jobCategories.map((category, index) => (
                <Link
                  key={index}
                  href={`/jobs/${category.toLowerCase().replace(/\s+/g, "-")}`}
                  className="px-2 py-1.5 text-sm hover:bg-muted rounded-md "
                >
                  {category}
                </Link>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        <div className="flex items-center">
        {
                user && user ===null ? (  <>
                <Button
                  className="bg-custom cursor-pointer hover:text-hoverColor text-lg font-semibold rounded-r-none"
                  onClick={() => SetOpen(false)}
                >
              <Link href='/login'>   Login</Link>
                </Button>
                <Button
                  className="border-custom border-2 text-hoverColor cursor-pointer border-l-0 hover:text-custom rounded-l-none text-lg font-semibold"
                  variant={"outline"}
                  onClick={() => SetOpen(false)}
                >
                        <Link href='/signup'>Signup</Link>

                </Button></>):(<>
                  <Button
                  className="border-custom border-2 text-hoverColor cursor-pointer  hover:text-custom  text-lg font-semibold"
                  variant={"outline"}
                  onClick={() => SetOpen(false)}
                >
                        <Link href='/logout'>Logout</Link>

                </Button></>)
              }
        </div>
      </div>
    </div>
  );
};

export default Navbar;
