export default function FeaturedIn() {
  return (
    <section className="py-10">
      <div className="max-w-4xl mx-auto text-center px-4">
        <p className="text-gray-500 font-medium tracking-wide mb-6">
          FEATURED IN
        </p>

        <div className="flex justify-center items-center gap-10 opacity-80">
          <img src="/youtube.svg" className="h-8" alt="YouTube" />
          <img src="/producthunt.svg" className="h-8" alt="Product Hunt" />
          <img src="/reddit.svg" className="h-8" alt="Reddit" />
        </div>
      </div>
    </section>
  );
}
