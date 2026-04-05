export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-900 flex flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold text-gray-900">PrimeClean</h1>
      <p className="mt-4 text-lg text-gray-700">Professional Cleaning Services</p>
      <div className="mt-8 flex gap-4">
        <a href="/book" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Book Now
        </a>
        <a href="/services" className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-100">
          Our Services
        </a>
      </div>
    </main>
  );
}
