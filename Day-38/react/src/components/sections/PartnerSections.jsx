import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";

export default function Partner() {
  return (
    <div className="mt-12">
      <div className="max-w-350 mx-auto">
        <div className="flex">
          <div className="basis-1/2">
            <Card className={cn("relative p-0 gap-0")}>
              <CardHeader className={cn("absolute inset-0 p-0 z-10")}>
                <div className="absolute bottom-10 left-10">
                  <CardDescription
                    className={cn("text-orange-500 text-[18px]")}
                  >
                    Signup as a business
                  </CardDescription>
                  <CardTitle className={cn("text-[40px] font-bold text-white")}>
                    Partner with us
                  </CardTitle>
                  <Button
                    className={cn(
                      "mt-6 px-12 py-6 bg-orange-500 rounded-full hover:cursor-pointer",
                    )}
                  >
                    Get Started
                  </Button>
                </div>
                <div
                  className={cn(
                    "absolute left-15 top-0 px-5 py-2 font-bold bg-white rounded-b-md text-web-black",
                  )}
                >
                  Earn more with lower fees
                </div>
              </CardHeader>
              <CardContent className={cn("w-full p-0")}>
                <img
                  src="/partner-img/partner 1.png"
                  alt="partner 1.png"
                />
              </CardContent>
            </Card>
          </div>
          <div className="basis-1/2">
            <Card className={cn("relative p-0 gap-0 group overflow-hidden")}>
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent z-[5]"></div>

              <CardHeader className={cn("absolute inset-0 p-0 z-10")}>
                <div className="absolute bottom-10 left-10">
                  <CardDescription
                    className={cn("text-orange-500 text-[18px]")}
                  >
                    Signup as a rider
                  </CardDescription>
                  <CardTitle className={cn("text-[40px] font-bold text-white")}>
                    Ride with us
                  </CardTitle>
                  <Button
                    className={cn(
                      "mt-6 px-12 py-6 bg-orange-500 rounded-full hover:cursor-pointer",
                    )}
                  >
                    Get Started
                  </Button>
                </div>
                <div
                  className={cn(
                    "absolute left-15 top-0 px-5 py-2 font-bold bg-white rounded-b-md text-web-black",
                  )}
                >
                  Avail exclusive perks
                </div>
              </CardHeader>
              <CardContent className={cn("w-full p-0 overflow-hidden")}>
                <img
                  src="/partner-img/partner 2.png"
                  alt="partner 2.png"
                  className="w-full h-full object-cover"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
