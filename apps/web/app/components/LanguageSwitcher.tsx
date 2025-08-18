"use client";
import * as React from 'react';
import type { Lang } from '../i18n';

export function LanguageSwitcher({ value, onChange }: { value: Lang; onChange: (l: Lang) => void }) {
  return (
    <label style={{ display: 'inline-flex', gap: 8, alignItems: 'center' }}>
      <span>Language</span>
      <select value={value} onChange={(e) => onChange(e.target.value as Lang)}>
        <option value="english">English</option>
        <option value="pidgin">Pidgin</option>
        <option value="hausa">Hausa</option>
        <option value="yoruba">Yoruba</option>
        <option value="igbo">Igbo</option>
      </select>
    </label>
  );
}

