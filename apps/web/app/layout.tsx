import './globals.css';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { getDictionary, type Lang } from './i18n';
import { cookies } from 'next/headers';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies();
  const lang = (cookieStore.get('lang')?.value as Lang) ?? 'english';
  const dict = getDictionary(lang);
  return (
    <html lang="en">
      <body>
        <script src="/register-sw.js" />
        <header style={{ display: 'flex', justifyContent: 'space-between', padding: 12, borderBottom: '1px solid #eee' }}>
          <strong>{dict.title}</strong>
          {/* Hydration-safe language switcher using a simple POST form to set cookie */}
          <form action="/api/lang" method="post" style={{ display: 'inline' }}>
            <LanguageSwitcher value={lang} onChange={() => {}} />
            <noscript>
              <select name="lang" defaultValue={lang}>
                <option value="english">English</option>
                <option value="pidgin">Pidgin</option>
                <option value="hausa">Hausa</option>
                <option value="yoruba">Yoruba</option>
                <option value="igbo">Igbo</option>
              </select>
            </noscript>
          </form>
        </header>
        {children}
      </body>
    </html>
  );
}

