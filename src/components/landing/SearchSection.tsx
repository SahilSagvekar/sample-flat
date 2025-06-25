// components/landing/SearchSection.tsx
import SearchForm from "@/components/forms/search-form";

export function SearchSection() {
  return (
    <section className="py-10 border-b">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-2xl font-semibold mb-4 text-center">Start Your Search</h2>
        <SearchForm />
      </div>
    </section>
  );
}
