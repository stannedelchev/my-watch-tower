import Navbar from "./Navbar";
import Header from "./Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="layout">
      <Header />
      <Navbar />
      <main>
        <div className="constrained-content">{children}</div>
      </main>
      <footer>
        <p>© 2025 My Watch Tower</p>
      </footer>
    </div>
  );
}
