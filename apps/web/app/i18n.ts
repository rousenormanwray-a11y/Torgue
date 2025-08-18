export type Lang = 'english' | 'pidgin' | 'hausa' | 'yoruba' | 'igbo';

type Dict = Record<string, string>;

const dictionaries: Record<Lang, Dict> = {
  english: {
    title: 'TORQUE – Nigeria-first Marketplace',
    offline: "You're offline. Core features are available in data-light mode.",
    switch_label: 'Language',
  },
  pidgin: {
    title: 'TORQUE – Naija-first Market',
    offline: 'Network no dey. Small data mode still dey work.',
    switch_label: 'Language',
  },
  hausa: {
    title: 'TORQUE – Kasuwar Najeriya',
    offline: 'Babu intanet. Ana aiki da yanayin karamin bayanai.',
    switch_label: 'Harshe',
  },
  yoruba: {
    title: 'TORQUE – Ọjà Naijiria',
    offline: 'Ko si intanẹẹti. Ipo data-kekere n ṣiṣẹ.',
    switch_label: 'Ede',
  },
  igbo: {
    title: 'TORQUE – Ahia Nigeria',
    offline: 'Enweghị ịntanetị. Ụdị data nta ka na-arụ ọrụ.',
    switch_label: 'Asụsụ',
  }
};

export function getDictionary(lang: Lang): Dict {
  return dictionaries[lang] ?? dictionaries.english;
}

