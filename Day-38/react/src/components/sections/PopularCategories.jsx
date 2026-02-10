import useCategories from "@/hooks/useCategories";

export default function PopularCategories() {
  const { data: categories, isLoading, error } = useCategories();

  if (isLoading) {
    return (
      <section className="py-6 bg-gray-50">
        <div className="container mx-auto text-center">
          Loading categories...
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-6 bg-gray-50 px-14">
        <div className="container mx-auto text-center text-red-500">
          Failed to load categories
        </div>
      </section>
    );
  }

  return (
    <section className="py-6 bg-white">
      <div className="container mx-auto px-14">
        <h2 className="text-3xl font-bold mb-8">
          Order.uk Popular Categories 🤩
        </h2>

        <div className="grid grid-cols-6 gap-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-gray-100 rounded-2xl text-center cursor-pointer 
                         hover:shadow-xl transition-all duration-300 group"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full mx-auto mb-4 object-contain 
                            transition-transform"
              />

              <div className="pl-5 text-left mb-3">
                <h3 className="font-bold text-md mb-1">{category.name}</h3>
                <p className="text-red-500 text-sm">
                  {category.count} Restaurants
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
