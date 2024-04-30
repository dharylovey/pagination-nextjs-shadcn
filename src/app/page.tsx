import ClientPagination from "@/components/client-pagination";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center w-full p-4">
      <span className="text-4xl font-bold">Image Gallery</span>
      <ClientPagination />
    </main>
  );
}
