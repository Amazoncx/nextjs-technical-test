"use client";

import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const navigateToSearch = () => {
    router.push("/searchBar"); // Redirige a la barra de búsqueda
  };

  return (
    <main className="bg-gradient-to-b from-indigo-50 to-white h-screen flex flex-col">
      <header className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-8 shadow-lg">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-extrabold tracking-wide">AmazonCx Technical Test</h1>
          <p className="mt-4 text-xl font-light">
            Showcase your skills with <strong>Next.js 14</strong>, <strong>DaisyUI</strong>, and database fetching.
          </p>
        </div>
      </header>

      <section className="container mx-auto px-8 py-8 bg-white rounded-lg shadow-lg my-10">
        <h2 className="text-3xl font-bold mb-6 text-indigo-700 text-center">
          Tu desafío
        </h2>
        <div className="text-center space-y-4">
          <button
            onClick={navigateToSearch}
            className="btn btn-primary px-10 py-3 text-lg font-semibold rounded-lg shadow-md"
          >
            Buscar Productos
          </button>
        </div>
      </section>
    </main>
  );
}
