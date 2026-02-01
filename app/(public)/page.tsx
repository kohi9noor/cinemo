import { SearchInput } from "@/components/ui/search-input";
import { DiscoverySection } from "@/feature/discovery/components";

const Home = () => {
  return (
    <div className="min-h-screen w-full flex flex-col space-y-12">
      <main className="w-full p-4 max-w-4xl mx-auto py-12">
        <SearchInput placeholder="Search..." />
      </main>
      <DiscoverySection />

      <div className="fixed bottom-0 left-0 right-0 h-20 bg-linear-to-t from-black/40 from-0% via-black/60 to-transparent pointer-events-none"></div>
    </div>
  );
};

export default Home;
