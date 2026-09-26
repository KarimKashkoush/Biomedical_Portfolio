import type { Metadata } from 'next';
import './globals.css';
import './enhancements.css';
import { LocaleProvider } from './locale';
export const metadata: Metadata = { title: 'كريم قشقوش | مهندس أجهزة طبية', description: 'كريم قشقوش، مهندس أجهزة طبية ومطور برمجيات رعاية صحية. خبرة في التصوير الطبي والهندسة الإكلينيكية وتطوير أنظمة الويب. الطائف، السعودية.', icons: { icon: '/favicon.svg' } };
export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) { return <html lang="ar" dir="rtl"><body><LocaleProvider>{children}</LocaleProvider></body></html> }
