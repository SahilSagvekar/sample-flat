import { Button } from "@/components/ui/button";

export function CallToAction() {
  return (
    <section className="py-12 bg-white border-t text-center">
      <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to list your property?</h2>
      <p className="mb-6 text-gray-600">Start earning by listing your flat with SampleFlat.</p>
      <Button size="lg">Post a Property</Button>
    </section>
  );
}
    