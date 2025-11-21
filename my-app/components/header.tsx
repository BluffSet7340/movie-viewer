import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-card border-b border-border">
      <div className="container mx-auto px-4 py-4 md:py-6">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">🎬</span>
          </div>
          <span className="text-xl md:text-2xl font-bold text-foreground">CineDB</span>
        </Link>
      </div>
    </header>
  );
}
