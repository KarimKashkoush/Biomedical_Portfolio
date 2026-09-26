'use client';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import arabic from './ar.json';
export type Locale = 'ar' | 'en';
const dictionary: Record<string,string> = arabic;
const LocaleContext = createContext({ locale: 'ar' as Locale, toggle: () => {}, t: (text:string) => dictionary[text] ?? text });
export function LocaleProvider({children}:{children:ReactNode}) {
  // Arabic is the initial language on every visit, including the server-rendered page.
  const [locale,setLocale] = useState<Locale>('ar');
  useEffect(() => {
    document.documentElement.lang=locale;
    document.documentElement.dir=locale==='ar'?'rtl':'ltr';
    document.title=locale==='ar'?'كريم قشقوش | مهندس أجهزة طبية':'Kareem Qashqoush | Biomedical Engineer';
  },[locale]);
  return <LocaleContext.Provider value={{locale,toggle:()=>setLocale(l=>l==='ar'?'en':'ar'),t:(text)=>locale==='ar'?(dictionary[text]??text):text}}>{children}</LocaleContext.Provider>;
}
export function useLocale(){return useContext(LocaleContext)}
