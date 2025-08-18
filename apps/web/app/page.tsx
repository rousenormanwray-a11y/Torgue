import { cookies } from 'next/headers';
import { getDictionary, type Lang } from './i18n';

export default function Page() {
  const cookieStore = cookies();
  const lang = (cookieStore.get('lang')?.value as Lang) ?? 'english';
  const dict = getDictionary(lang);
  return (
    <main style={{ padding: 16 }}>
      <h1>{dict.title}</h1>
      <p>Web PWA shell is running.</p>
    </main>
  );
}

