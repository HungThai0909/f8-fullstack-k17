import useRestaurants from "@/hooks/useRestaurants";

export default function PopularRestaurants() {
  const { data: restaurants, isLoading, error } = useRestaurants();

  if (isLoading) {
    return (
      <section className="py-6 bg-white">
        <div className="container mx-auto px-4 text-center">
          Loading restaurants...
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-6 bg-white">
        <div className="container mx-auto px-4 text-center text-red-600">
          Failed to load restaurants
        </div>
      </section>
    );
  }

  return (
    <section className="py-6 bg-white">
      <div className="container mx-auto px-14">
        <h2 className="text-3xl font-bold mb-8">Popular Restaurants</h2>

        <div className="grid grid-cols-6 gap-4">
          {restaurants?.map((restaurant) => (
            <div
              key={restaurant.id}
              className="bg-gray-50 rounded-2xl text-center hover:scale-105 transition-all duration-300 cursor-pointer shadow-md"
            >
              <div className="flex items-center justify-center w-full">
                <img
                  src={restaurant.logo}
                  alt={restaurant.name}
                  className="max-h-full object-contain"
                />
              </div>

              <h3 className="font-semibold text-lg bg-orange-500 py-2 text-white rounded-b-2xl">
                {restaurant.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
