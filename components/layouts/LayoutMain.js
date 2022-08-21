import Navbar from '../defaults/Navbar';

function LayoutMain({ children }) {
  return (
    <main className="bg-black relative h-screen">
      <Navbar />
      {children}
    </main>
  );
}

export default LayoutMain;
