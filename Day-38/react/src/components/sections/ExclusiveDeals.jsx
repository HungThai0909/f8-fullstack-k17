import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import useExclusiveDeals from "@/hooks/useExclusiveDeals";

export default function ExclusiveDeals() {
  const { data: deals, isLoading, error } = useExclusiveDeals();

  if (isLoading) {
    return (
      <section className="py-6 bg-white">
        <div className="container mx-auto px-4 text-center">
          Loading deals...
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-6 bg-white">
        <div className="container mx-auto px-4 text-center text-red-600">
          Failed to load deals
        </div>
      </section>
    );
  }

  const categories = [
    { value: "vegan", label: "Vegan" },
    { value: "sushi", label: "Sushi" },
    { value: "pizza", label: "Pizza & Fast food" },
    { value: "others", label: "Others" },
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-14">
        <Tabs defaultValue="pizza">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Up to -40% 🎊 Order.uk exclusive deals
            </h2>

            <TabsList className="bg-transparent gap-2 h-auto p-0">
              {categories.map((cat) => (
                <TabsTrigger
                  key={cat.value}
                  value={cat.value}
                  className="rounded-full px-6 py-2 border border-input text-sm font-medium
                             data-[state=active]:bg-orange-500 data-[state=active]:text-white
                             data-[state=active]:border-orange-500
                             data-[state=inactive]:bg-white data-[state=inactive]:text-gray-700
                             hover:bg-orange-50 transition-colors cursor-pointer
                             after:hidden"
                >
                  {cat.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {categories.map((cat) => (
            <TabsContent key={cat.value} value={cat.value}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {deals?.[cat.value]?.map((deal) => (
                  <div
                    key={deal.id}
                    className="relative bg-white rounded-2xl overflow-hidden
                               hover:shadow-xl transition-all duration-300
                               cursor-pointer group h-[320px]"
                  >
                    <img
                      src={deal.image}
                      alt={deal.name}
                      className="absolute inset-0 w-full h-full object-cover
                                 group-hover:scale-110 transition-transform duration-300"
                    />

                    <div className="absolute inset-0 bg-black/25" />

                    <div
                      className="absolute top-0 right-5 bg-gray-900 text-white px-4 py-4
                                 rounded-b-lg rounded-t-none text-sm font-bold z-10"
                    >
                      {deal.discount}
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                      <p className="text-sm text-orange-400 mb-1">Restaurant</p>
                      <h3 className="font-bold text-lg text-white">{deal.name}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}