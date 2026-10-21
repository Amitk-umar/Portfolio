import { site } from '../data/siteConfig';
export default function Footer() {
  return (
    <footer className="pad mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-4 border-t border-line py-8 text-xs text-mute">
      <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
      <a href="#top" className="ulink inline-flex min-h-12 items-center tracking-[.12em]">BACK TO TOP ↑</a>
    </footer>
  );
}
