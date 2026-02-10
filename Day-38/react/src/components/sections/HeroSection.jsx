import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "../../lib/utils";

export default function HeroSection() {
  return (
    <div>
      <div className="max-w-[1400px] h-[610px] mx-auto rounded-[40px] bg-white">
        <div className="flex h-full relative">
          <div className="basis-1/2 h-full flex items-center pl-14">
            <div>
              <p className="text-[16px] leading-[16.5px] mb-3">
                Order Restaurant food, takeaway and groceries.
              </p>
              <div className="mb-3">
                <h1 className="text-[54px] leading-[60px] font-semibold text-gray-900">
                  Feast Your Senses,
                </h1>
                <h1 className="text-[54px] leading-[60px] font-semibold text-orange-500">
                  Fast and Fresh
                </h1>
              </div>
              <div className="pt-5">
                <p className="mb-3 text-gray-600">
                  Enter a postcode to see what we deliver
                </p>
                <div className="relative w-[376px] h-14">
                  <Input
                    className={cn(
                      "w-full h-full rounded-full text-[16px] lg:text-[18px] pr-[172px] border-2 border-gray-200",
                    )}
                    placeholder="e.g. EC4R 3TE"
                  />
                  <Button
                    className={cn(
                      "absolute right-0 top-0 text-white font-semibold bg-orange-500 rounded-full h-full px-14 hover:bg-orange-600 cursor-pointer",
                    )}
                  >
                    Search
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-162 -translate-x-1/2 z-20">
            <img
              src="../../../public/hero-img/hero-center.png"
              alt="hero-center"
              className="h-[500px] object-contain"
            />
          </div>

          <div className="basis-1/2 relative z-10 overflow-hidden pr-5 h-full">
            <img
              className="absolute bottom-0 -right-20 w-[626px] h-[565px] object-cover"
              src="../../../public/hero-img/bg-hero.png"
              alt="hero_bg"
            />

            <img
              className="absolute left-20 bottom-0 w-[377px] h-[455px] "
              src="../../../public/hero-img/hero-right.png"
              alt="hero_right_img"
            />

            <div className="z-20 relative flex flex-col gap-[88px] items-end mt-[100px]">
              <Card
                className={cn(
                  "w-[344px] gap-0 p-4 relative top-5 right-[60px] shadow-lg",
                )}
              >
                <div className="absolute top-1 right-8 -translate-y-full text-6xl font-bold text-orange-500 [text-shadow:1px_1px_0_white,0_1px_0_white,1px_0_0_white,-1px_0_0_white,0_-1px_0_white,-1px_-1px_0_white,0_0_1px_white]">
                  1
                </div>
                <CardHeader className={cn("p-0")}>
                  <CardTitle>
                    <img
                      className="w-[58px] bg-white"
                      src="/LOGO 1.png"
                      alt="LOGO 1"
                    />
                  </CardTitle>
                  <CardDescription
                    className={cn("font-semibold text-gray-900")}
                  >
                    We've Received your order!
                  </CardDescription>
                  <CardAction className={cn("text-gray-400 text-sm")}>
                    now
                  </CardAction>
                </CardHeader>
                <CardContent className={cn("p-0")}>
                  <p className="text-gray-500">
                    Awaiting Restaurant acceptance
                  </p>
                </CardContent>
              </Card>

              <Card
                className={cn("w-[344px] gap-0 p-4 relative right-0 shadow-lg")}
              >
                <div className="absolute top-2 right-8 -translate-y-full text-6xl font-bold text-orange-500 [text-shadow:1px_1px_0_white,0_1px_0_white,1px_0_0_white,-1px_0_0_white,0_-1px_0_white,-1px_-1px_0_white,0_0_1px_white]">
                  2
                </div>
                <CardHeader className={cn("p-0")}>
                  <CardTitle>
                    <img className="w-[58px]" src="/LOGO 1.png" alt="LOGO 1" />
                  </CardTitle>
                  <CardDescription
                    className={cn("font-semibold text-gray-900")}
                  >
                    Order Accepted! ✅
                  </CardDescription>
                  <CardAction className={cn("text-gray-400 text-sm")}>
                    now
                  </CardAction>
                </CardHeader>
                <CardContent className={cn("p-0")}>
                  <p className="text-gray-500">
                    Your order will be delivered shortly
                  </p>
                </CardContent>
              </Card>

              <Card
                className={cn(
                  "w-[344px] gap-0 p-4 relative -top-5 right-5 shadow-lg",
                )}
              >
                <div className="absolute top-2 right-8 -translate-y-full text-6xl font-bold text-orange-500 [text-shadow:1px_1px_0_white,0_1px_0_white,1px_0_0_white,-1px_0_0_white,0_-1px_0_white,-1px_-1px_0_white,0_0_1px_white]">
                  3
                </div>
                <CardHeader className={cn("p-0")}>
                  <CardTitle>
                    <img className="w-[58px]" src="/LOGO 1.png" alt="LOGO 1" />
                  </CardTitle>
                  <CardDescription
                    className={cn("font-semibold text-gray-900")}
                  >
                    Your rider's nearby 🎉
                  </CardDescription>
                  <CardAction className={cn("text-gray-400 text-sm")}>
                    now
                  </CardAction>
                </CardHeader>
                <CardContent className={cn("p-0")}>
                  <p className="text-gray-500">
                    They're almost there - get ready!
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
