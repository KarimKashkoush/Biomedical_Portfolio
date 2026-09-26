# Kareem Qashqoush — Next.js Portfolio

A responsive, Arabic/English portfolio built with **Next.js App Router, React, TypeScript, and Lucide icons**. Arabic is the initial language on every page load. The language button switches the complete interface and the document direction between RTL and LTR without reloading. The layout follows the supplied purple-and-white reference, with content taken from the supplied CV.

## Run locally

Requires Node.js 20.9 or newer.

```sh
npm install
npm run dev
```

Open the local URL printed by Next.js.

## Check and export

```sh
npm run typecheck
npm run build
```

The project uses `output: 'export'`; the production website is generated in `out/`. Deploy that folder to any static host. The default `next start` command does not serve static exports; use the host's static preview or `npx serve out` instead.

## Editing

- `app/page.tsx`: content, navigation, training cards, and contact form.
- `app/ar.json` and `app/locale.tsx`: Arabic translations and the language switch.
- `app/experience.tsx`: the portrait, connected skill cards, initial loading screen, and scroll reveals.
- `app/enhancements.css`: bilingual layout, gallery, and animation styles.
- `app/training-media.json`: add one or several photos to each training entry.
- `app/training-gallery.tsx`: accessible manual slides, keyboard navigation, and mobile swipes.
- `app/globals.css`: responsive styling, color palette, and typography.
- `app/layout.tsx`: page metadata.
- `public/Kareem-Qashqoush-CV.pdf`: downloadable original CV.
- `public/favicon.svg`: personal favicon.

The owner-supplied portrait is saved as `public/kareem-portrait.jpg` and configured in `app/profile.ts`. Four connected skill cards float gently around it. No training photos were supplied, so the original training icons remain until images are added. No projects, clients, or testimonials are invented.

The loading screen waits for the portrait and fonts, with a 650 ms minimum and a 2.6 second maximum so a slow resource cannot block the site. Sections and cards reveal once on scroll. Reduced-motion preferences disable the decorative movement.

## إضافة صور التدريبات

ضع الصور داخل `public/training/` ثم عدّل `app/training-media.json`. كل تدريب له مفتاح مستقل:

| المفتاح | التدريب |
| --- | --- |
| `siemens` | سيمنز |
| `true-medical` | ترو ميديكال / مايندراي |
| `dar-al-fouad` | مستشفى دار الفؤاد |
| `childrens-hospital` | مستشفى الأطفال |
| `bahya-july` | بهية — يوليو 2023 |
| `bahya-january` | بهية — يناير 2023 |

مثال لمحتوى قائمة `siemens` بعد إضافة الصور بنفس الأسماء:

```json
[
  {"src":"/training/siemens-1.jpg","alt":"Siemens training","altAr":"تدريب سيمنز"},
  {"src":"/training/siemens-2.jpg","alt":"Imaging systems training","altAr":"التدريب على أنظمة التصوير"}
]
```

القائمة الفارغة تعرض أيقونة التدريب. صورة واحدة تظهر ثابتة دون أدوات تنقل. أكثر من صورة تظهر كسلايدر بأسهم ونقاط تنقل ودعم أسهم لوحة المفاتيح والسحب على الهاتف. لا تتحرك الصور تلقائيًا. أعد تشغيل `npm run build` بعد إضافة الصور لنشر نسخة جديدة.

The contact form validates required fields and opens the visitor's email application with a draft. It does not send messages or store personal data. Direct email, phone, and LinkedIn links are also available. Fonts load from Google Fonts with local Arial fallbacks.

The updated CV lists BM-Egypt from September 2025 to June 2026; both language versions reflect this.

## تصميم الموقع

تم استخدام بيانات السيرة الذاتية مع ألوان وتخطيط قريب من الصورة المرجعية. العربية هي لغة العرض الأولى، ويمكن التبديل إلى الإنجليزية. أول قسم يحتوي على تحميل السيرة الذاتية ورابط لينكدإن. نموذج التواصل يفتح برنامج البريد برسالة جاهزة، ولا يرسل البريد من الموقع مباشرة.
