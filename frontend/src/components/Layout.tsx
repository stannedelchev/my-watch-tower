export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="layout">
      <header>
        <h1>My Watch Tower</h1>
      </header>
      <nav>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/stations">Ground Stations</a>
          </li>
        </ul>
      </nav>
      <main>{children}</main>
      <footer>
        <p>© 2025 My Watch Tower</p>
      </footer>
    </div>
  );
}
