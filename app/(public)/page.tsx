import { DiscoverySection } from "@/features/discovery/components";

const Home = () => {
  return (
    <div className="min-h-screen w-full flex flex-col">
      <DiscoverySection />

      <div className="fixed bottom-0 left-0 right-0 h-20 bg-linear-to-t from-background via-background/60 to-transparent pointer-events-none"></div>
    </div>
  );
};

export default Home;
