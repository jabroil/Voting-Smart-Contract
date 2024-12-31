import Link from "next/link";

const Home = () => {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/bg_cs2.jpg')" }}
    >
      <div className="bg-white bg-opacity-80 p-8 rounded-md shadow-md text-center">
        <h1 className="text-4xl font-bold mb-4 text-black">
          Добро пожаловать!
        </h1>
        <p className="text-lg font-bold text-gray-700 mb-8 bg-white p-4 rounded-md shadow-md">
          Выбери лучшего игрока 2024 года по игре Counter-Strike 2
        </p>
        <nav className="flex space-x-6 justify-center">
          <Link href="/vote" className="btn btn-primary">
            Проголосовать
          </Link>
          <Link href="/results" className="btn btn-secondary">
            Смотреть результаты
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Home;
