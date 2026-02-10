import useStats from "@/hooks/useStats";

export default function StatsCounter() {
  const { data: stats, isLoading, error } = useStats();

  if (isLoading) return null;
  if (error)
    return (
      <section className="py-6 bg-gray-50">
        <div className="container mx-auto text-center text-red-500">
          Failed to load stats
        </div>
      </section>
    );

  return (
    <section className="mt-12 px-14">
      <div className="bg-[#FC8A06] py-10">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats?.map((stat, index) => (
              <div
                key={stat.id}
                className={`text-center text-white ${
                  index !== stats.length - 1
                    ? "md:border-r md:border-white/30"
                    : ""
                }`}
              >
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  {stat.value}
                </div>
                <div className="text-sm md:text-base font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
