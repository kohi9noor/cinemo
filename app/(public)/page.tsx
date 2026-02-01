import { SearchInput } from "@/components/ui/search-input";
import { DiscoverySection } from "@/feature/discovery/components";

const Home = () => {
  return (
    <div className="min-h-screen w-full flex flex-col space-y-12">
      <main className="w-full p-4 max-w-4xl mx-auto py-24">
        <SearchInput placeholder="Search..." />
      </main>
      <DiscoverySection />
    </div>
  );
};

export default Home;
