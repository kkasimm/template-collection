export default function Grey() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="bg-white p-10 rounded-xl shadow-lg text-center">
        <i className="fa-solid fa-circle-check text-green-500 text-6xl mb-6"></i>

        <h1 className="text-5xl font-bold text-gray-800 mb-4">
          Grey Page
        </h1>

        <p className="text-gray-600">
          🎉 Jika halaman ini muncul, Font Awesome & Tailwind berhasil digunakan.
        </p>
      </div>
    </div>
  );
}