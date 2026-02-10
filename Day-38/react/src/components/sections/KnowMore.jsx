import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import useKnowMoreAboutUs from "@/hooks/useKnowMoreAboutUs";
import { cn } from "../../lib/utils";

export default function KnowMore() {
  const { data, isLoading, error } = useKnowMoreAboutUs();

  if (isLoading) {
    return (
      <div className="mt-23.5 bg-white min-h-screen">
        <div className="max-w-350 mx-auto bg-white rounded-md px-25 py-20 text-center">
          Loading...
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="py-6 bg-white">
        <div className="max-w-350 mx-auto bg-white rounded-md px-25 py-20 text-center text-red-600">
          Failed to load data
        </div>
      </div>
    );
  }

  const { tabs, frequentQuestions, orderSteps, description } = data;
  const defaultTab = tabs.find((tab) => tab.isDefault)?.id || tabs[0]?.id;

  return (
    <div className="mt-23.5 min-h-screen">
      <div className="max-w-350 mx-auto px-25 py-20 bg-gray-200">
        <Tabs defaultValue={defaultTab} className="w-full">
          <div className="flex items-center justify-between mb-15">
            <h2 className="font-bold text-[36px]">Know more about us!</h2>

            <TabsList className="bg-transparent flex gap-4">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className={cn(
                    "px-8 py-6 rounded-full hover:cursor-pointer",
                    "data-[state=active]:border-orange-500 data-[state=active]:text-black",
                  )}
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value="frequent-questions">
            <Tabs
              defaultValue={
                frequentQuestions.find((q) => q.isExpanded)?.id.toString() ||
                "1"
              }
            >
              <div className="bg-white rounded-xl shadow-sm p-10">
                <div className="grid grid-cols-[340px_1fr] gap-10 items-start">
                  <TabsList className="flex flex-col bg-transparent gap-5 mt-40">
                    {frequentQuestions.map((question) => (
                      <TabsTrigger
                        key={question.id}
                        value={question.id.toString()}
                        className={cn(
                          "w-full px-8 py-4 font-bold rounded-full",
                          "whitespace-normal h-auto text-center cursor-pointer",
                          "data-[state=active]:bg-orange-500 data-[state=active]:text-white",
                        )}
                      >
                        {question.question}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  <div className="flex-1">
                    {frequentQuestions.map((question) => (
                      <TabsContent
                        key={question.id}
                        value={question.id.toString()}
                        className="m-0 flex flex-col gap-6"
                      >
                        <div className="grid grid-cols-3 gap-4">
                          {orderSteps.map((step) => (
                            <Card
                              key={step.id}
                              className="p-5 bg-gray-200 transition-all duration-200 group hover:cursor-pointer hover:scale-105 group-hover:shadow-lg"
                            >
                              <CardHeader className="p-0 text-center mb-4">
                                <CardTitle className="font-bold text-lg">
                                  {step.title}
                                </CardTitle>
                              </CardHeader>

                              <CardContent className="p-0 flex justify-center mb-4">
                                <img
                                  src={step.img}
                                  alt={step.title}
                                  className="w-32 h-32 object-contain transition-all duration-200 
                                   "
                                />
                              </CardContent>

                              <CardFooter className="p-0">
                                <p className="text-center text-sm">
                                  {step.description}
                                </p>
                              </CardFooter>
                            </Card>
                          ))}
                        </div>

                        <p className="mt-6 text-center text-gray-600">
                          {description}
                        </p>
                      </TabsContent>
                    ))}
                  </div>
                </div>
              </div>
            </Tabs>
          </TabsContent>

          <TabsContent
            value="who-we-are"
            className="text-3xl font-bold text-orange-500"
          >
            Coming soon...
          </TabsContent>

          <TabsContent
            value="partner-program"
            className="text-3xl font-bold text-orange-500"
          >
            Coming soon...
          </TabsContent>

          <TabsContent
            value="help-support"
            className="text-3xl font-bold text-orange-500"
          >
            Coming soon...
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
