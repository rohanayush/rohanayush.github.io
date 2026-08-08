// The product catalogue for the site.
//
// Every downloadable file lives on GitHub Releases (this repo), not in git —
// `scripts/stage-product-artifacts.ps1` copies the built binaries into
// release/<slug>/ with these exact names, ready to upload to `releaseTag`.
// Keep `file` here in sync with the names the script writes.

const REL = 'https://github.com/rohanayush/release-on-my-mind-note/releases/download';

export type Download = {
  /** Absolute URL (GitHub Releases asset) or a file name under public/downloads/. */
  file: string;
  label: string;
  /** Small line under the button — platform / format. */
  meta: string;
  size?: string;
  recommended?: boolean;
  /** One-liner describing what this particular file is for. */
  note: string;
};

export type Product = {
  slug: string;
  name: string;
  /** Sits under the name — keeps the old, searchable phrase visible. */
  subtitle?: string;
  eyebrow: string;
  tagline: string;
  /** Two or three paragraphs for the detail page. */
  body: string[];
  /** Short line for the catalogue card. */
  card: string;
  platforms: string[];
  /** Card + hero tint: one of the note colours. */
  tint: 'yellow' | 'pink' | 'mint' | 'blue';
  emoji: string;
  /** Screenshots, relative to public/. Cards use the first one. */
  shots?: { src: string; alt: string }[];
  /** How to frame the shots: tall phone captures or wide desktop ones. */
  shotShape?: 'phone' | 'wide';
  highlights: { title: string; text: string }[];
  /** Optional deep-dive on a headline feature (Sthir's Zen mode). */
  feature?: {
    eyebrow: string;
    title: string;
    lead: string;
    shots: { src: string; alt: string }[];
    /** The app's own breathing patterns, straight from domain/breathing.ts. */
    patterns: {
      name: string;
      rhythm: string;
      phases: string;
      hint: string;
      text: string;
      /** What people commonly use this rhythm for — wellbeing, not medical claims. */
      benefits: string[];
    }[];
    /** Shown under the pattern grid when the feature makes wellbeing claims. */
    note?: string;
  };
  releaseTag?: string;
  downloads: Download[];
  /** Set when the product has its own landing page instead of a generated one. */
  href?: string;
  /** Shown as a badge when it isn't a finished, downloadable build. */
  status?: string;
};

export const products: Product[] = [
  {
    slug: 'on-my-mind',
    name: 'on my mind',
    eyebrow: 'Windows',
    tagline: 'The note app that actually sticks — on top of every app.',
    card: 'Fully dynamic markdown notes that float above everything on your screen.',
    body: [],
    platforms: ['Windows'],
    tint: 'yellow',
    emoji: '📝',
    shotShape: 'wide',
    shots: [
      { src: 'images/note-view.webp', alt: 'A markdown travel-journal note with an image and a table' },
      { src: 'images/code-view.webp', alt: 'A note rendering Java, Python and SQL code blocks' },
      { src: 'images/home.webp', alt: 'The on my mind home manager: a board of colourful notes' },
    ],
    highlights: [],
    href: '/',
    downloads: [],
  },

  {
    slug: 'calculate-what-you-do',
    name: 'Calculate what you do!',
    eyebrow: 'Windows · Android',
    tagline: 'A minimal time tracker that shows where the hours actually went.',
    card: 'Start a task, scroll to an end time, stop. Then see the week broken down by task and day.',
    body: [
      'Start a task with a title, stop it by scrolling to an end time, and the app does the rest. No edit modes, no dialogs — running tasks sit at the top, finished ones group by day with a per-day total underneath.',
      'The Analyse tab turns that log into something readable: total tracked time, your per-active-day average, the busiest day, hours per task, and a day-by-day stack split by task — filtered to 7 days, 30 days or all time.',
      'One Tauri v2 + Vue 3 codebase builds both the Windows app and the Android APK, so the same tracker follows you between desk and phone.',
    ],
    platforms: ['Windows', 'Android'],
    tint: 'mint',
    emoji: '⏱️',
    highlights: [
      {
        title: 'Sync over Wi-Fi',
        text: 'Both devices on one network: share from one, enter the 6-digit code on the other, and the two task lists merge in a single exchange. Discovery runs over UDP broadcast, so there are no addresses to type.',
      },
      {
        title: 'Merge that never duplicates',
        text: 'Import, export and sync all run the same merge by task id — a finished copy always wins over an unfinished one. Sync either direction, or twice in a row, and you land on the same set.',
      },
      {
        title: 'Networking in Rust, not the webview',
        text: 'The sync server lives in src-tauri, which keeps Android’s cleartext-HTTP policy and the CSP out of the way. It is plain HTTP on the LAN — convenience on a network you trust, and off entirely unless you are sharing.',
      },
      {
        title: 'JSON in, JSON out',
        text: 'Export writes a plain JSON file you own and can read. No account, no cloud, nothing leaves the device unless you send it.',
      },
    ],
    releaseTag: 'calculate-what-you-do',
    downloads: [
      {
        file: `${REL}/calculate-what-you-do/CalculateWhatYouDo-Setup.exe`,
        label: '↓ Download Setup',
        meta: 'Windows · .exe (NSIS)',
        size: '1.3 MB',
        recommended: true,
        note: 'One-click install with a Start-menu shortcut.',
      },
      {
        file: `${REL}/calculate-what-you-do/CalculateWhatYouDo.msi`,
        label: '↓ Download MSI',
        meta: 'Windows · .msi',
        size: '1.9 MB',
        note: 'For managed deployment via Group Policy or Intune.',
      },
      {
        file: `${REL}/calculate-what-you-do/CalculateWhatYouDo.apk`,
        label: '↓ Download APK',
        meta: 'Android · universal .apk',
        size: '20.7 MB',
        note: 'Signed release build. Allow installs from unknown sources first.',
      },
    ],
  },

  {
    slug: 'sthir',
    name: 'Sthir',
    subtitle: 'naam jaap & breathwork',
    eyebrow: 'Android · Web',
    tagline: 'Steady the count. Steady the breath.',
    card: 'Tap to count your naam, or drop into Zen mode for guided breathing. Five landscapes, five counters, all drawn in CSS.',
    body: [
      'Sthir takes its name from sthira — steady, settled, unshaken. It is a naam jaap counter with nothing else attached. Pick one of five environments, pick a counter skin, and tap. The naam sits below the heading and pulses once per repetition, because the naam is what you are actually doing — not the digits.',
      'It is not only for chanting. Zen mode turns the same calm screen into a guided breathing exercise for stress relief: a ring that expands and contracts while you follow it, with four patterns to pick from — Calm (4·4·4·4), Balance (5·5), Unwind (4·7·8) and Deep (6·2·6). If you never chant a single naam but you do believe in breathwork, the app earns its place on that alone.',
      'Everything stays on the device. No account, no backend, no network calls at runtime. The whole visual experience ships without a single image, audio file or font — the five landscapes and five counters are CSS and a little inline SVG.',
      'It installs as an offline PWA in the browser and as a real APK on Android, where the volume keys count for you — the one thing a browser genuinely cannot do.',
    ],
    platforms: ['Android', 'Web (PWA)'],
    tint: 'pink',
    emoji: '📿',
    shotShape: 'phone',
    shots: [
      { src: 'images/sthir/first-launch.webp', alt: 'The mechanical counter at zero over a dusk mountain landscape, waiting for the first tap' },
      { src: 'images/sthir/mala-flourish.webp', alt: 'The counter reading 00108 as it completes Mala 1' },
      { src: 'images/sthir/naam-picker.webp', alt: 'The naam picker, offering names across traditions' },
      { src: 'images/sthir/zen-patterns.webp', alt: 'Zen mode counting down to a 4-7-8 breathing pattern' },
    ],
    highlights: [
      {
        title: 'Zen mode — breathing, not counting',
        text: 'A guided breathing exercise built into the same app, for winding down or steadying yourself mid-day. Follow the ring through Calm, Balance, Unwind or Deep; the 4·7·8 long exhale is the one for settling before sleep. Hold to close when you are done.',
      },
      {
        title: 'The count survives everything',
        text: 'Reload, backgrounding, force-quit. State is written on a 400 ms debounce and flushed on visibilitychange and pagehide. Losing a count is the worst thing this app could do.',
      },
      {
        title: 'Counts fire on pointerdown',
        text: 'Waiting for a click costs the tap its immediacy, which is the whole feel of a tally counter. Digits cross-roll past each other rather than translating a strip, so they stay correct under fast tapping.',
      },
      {
        title: 'Reset you have to mean',
        text: 'A 1.5 s hold with a filling ring, and an Undo that stays for eight seconds afterwards.',
      },
      {
        title: 'No gamification',
        text: 'No streaks, points, badges or leaderboards. Progress is a number and a 2px line. prefers-reduced-motion turns off every atmospheric animation.',
      },
    ],
    feature: {
      eyebrow: 'Not just for chanting',
      title: 'Zen mode — four ways to breathe.',
      lead:
        'Zen mode is a guided breathing exercise living inside the same calm screen. A ring fills as you inhale and empties as you exhale, an orb swells and settles with it, and the phase you are in — Inhale, Hold, Exhale, Rest — is named in the middle with a countdown. Pick the rhythm that suits the moment; hold the button to close when you are done.',
      shots: [
        { src: 'images/sthir/zen-inhale.webp', alt: 'Zen mode mid-inhale: the ring three-quarters filled, the orb small, counting 4' },
        { src: 'images/sthir/zen-hold.webp', alt: 'Zen mode holding the breath: the orb expanded and glowing, counting 3' },
        { src: 'images/sthir/zen-patterns.webp', alt: 'The pattern picker with Calm, Balance, Unwind and Deep, counting into a session' },
      ],
      patterns: [
        {
          name: 'Calm',
          rhythm: '4·4·4·4',
          phases: 'Inhale 4 · Hold 4 · Exhale 4 · Rest 4',
          hint: 'Box breathing. Even on all four sides.',
          text: 'The square. Every side of the breath lasts the same four seconds, including the pause after the exhale, so there is nothing to anticipate — useful when you want a steady rhythm to hold on to rather than a wind-down.',
          benefits: [
            'Steadies nerves before something demanding — a talk, an exam, a hard conversation',
            'Pulls scattered attention back to one thing',
            'Easy to remember without the app once you know it',
            'Leaves you alert rather than sleepy',
          ],
        },
        {
          name: 'Balance',
          rhythm: '5·5',
          phases: 'Inhale 5 · Exhale 5',
          hint: 'Equal breathing. The simplest place to start.',
          text: 'In and out, five apiece, with no holds at all. The easiest one to follow if you have never done this before, and the one to fall back on if holding your breath feels like effort.',
          benefits: [
            'Gentlest entry point — nothing to hold, nothing to brace against',
            'Lands near six breaths a minute, the pace most slow-breathing practice aims for',
            'Comfortable to keep up for ten minutes or more',
            'Safe fallback if the holds in other patterns make you tense',
          ],
        },
        {
          name: 'Unwind',
          rhythm: '4·7·8',
          phases: 'Inhale 4 · Hold 7 · Exhale 8',
          hint: 'A long exhale. Good for settling before sleep.',
          text: 'The exhale is twice the inhale, which is what makes this one feel like letting go. The long hold in the middle slows the whole cycle right down — the pattern to reach for at night, or after something has wound you up.',
          benefits: [
            'The wind-down pattern — lying in bed, waiting for sleep',
            'A long exhale is the part that tips you toward "rest", not "react"',
            'Takes the edge off after a spike of stress or anger',
            'Only a few rounds needed; it is slow by design',
          ],
        },
        {
          name: 'Deep',
          rhythm: '6·2·6',
          phases: 'Inhale 6 · Hold 2 · Exhale 6',
          hint: 'Slow and full, with a short pause at the top.',
          text: 'Long, even breaths with only a brief pause at the top of the inhale. Fewer breaths per minute than the others without the long hold of Unwind — a slow, full rhythm you can sit in for a while.',
          benefits: [
            'Encourages full, belly-deep breaths instead of shallow chest ones',
            'Roughly four breaths a minute — the slowest of the four',
            'Built for longer sits, when you want to stay somewhere calm',
            'Pairs well with japa: settle here first, then start counting',
          ],
        },
      ],
      note: 'These are the everyday reasons people reach for each rhythm, not medical advice. Breathwork is not a treatment — if you are pregnant, or you have a heart or respiratory condition, check with a doctor first, and skip the holds if any pattern leaves you light-headed.',
    },
    releaseTag: 'sthir',
    downloads: [
      {
        file: `${REL}/sthir/Sthir.apk`,
        label: '↓ Download APK',
        meta: 'Android · signed .apk',
        size: '3.1 MB',
        recommended: true,
        note: 'Release build with the native volume-key counter. Allow installs from unknown sources first.',
      },
    ],
  },

  {
    slug: 'eye-rest-reminder',
    name: 'Eye Rest Reminder',
    eyebrow: 'Android',
    tagline: 'Tells you to look away, without you having to remember.',
    card: 'A background screen-time timer that nudges you to rest your eyes — plus one note that stays put.',
    body: [
      'Eye Rest Reminder counts continuous screen-on time from the moment your screen lights up, and reminds you to look away once you cross the threshold. The counting and the reminders run in a native Android foreground service, so they keep working whether or not the app is open.',
      'The app screen itself is deliberately small: a status panel showing what the timer is doing, and one editable note that stays saved between launches.',
      'Built with Tauri v2 + Vue on the web side, with the timer, reset logic and notifications written natively in Kotlin.',
    ],
    platforms: ['Android'],
    tint: 'blue',
    emoji: '👁️',
    highlights: [
      {
        title: 'Runs in the background',
        text: 'A foreground service does the tracking, so reminders arrive whether or not the app is on screen.',
      },
      {
        title: 'Starts when your screen does',
        text: 'Counting begins the moment the screen turns on and resets when you actually give your eyes a break.',
      },
      {
        title: 'One persistent note',
        text: 'A single editable note on the status screen, saved locally — no lists, no folders, nothing to manage.',
      },
    ],
    releaseTag: 'eye-rest-reminder',
    downloads: [
      {
        file: `${REL}/eye-rest-reminder/EyeRestReminder.apk`,
        label: '↓ Download APK',
        meta: 'Android · .apk',
        size: '117.6 MB',
        recommended: true,
        note: 'Unstripped build — large, but it installs and runs as-is. Allow installs from unknown sources first.',
      },
    ],
  },
];

/** Everything except the flagship, which has the home page to itself. */
export const otherProducts = products.filter((p) => p.slug !== 'on-my-mind');

export const bySlug = (slug: string) => products.find((p) => p.slug === slug);
