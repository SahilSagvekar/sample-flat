// components/landing/SearchFilters.tsx
import SearchForm from "@/components/forms/search-form";

export function SearchFilters() {
  return (
    <section className="py-8 bg-white border-b border-gray-100">
      <div className="max-w-5xl mx-auto px-4">
        <SearchForm />
      </div>
    </section>
  );
}
