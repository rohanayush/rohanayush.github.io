// Who this portfolio belongs to. Kept apart from the product catalogue so the
// About and Contact pages have one source of truth.

export const profile = {
  name: 'Rohan Ayush Singh',
  role: 'Senior Frontend Engineer',
  stack: ['Angular', 'Vue.js', 'TypeScript'],
  location: 'Gurugram, Delhi NCR, India',
  availability: 'Open to remote roles',
  email: 'rohanayush05@gmail.com',
  linkedin: { label: 'linkedin.com/in/rohanayush', url: 'https://linkedin.com/in/rohanayush' },
  github: { label: 'github.com/rohanayush', url: 'https://github.com/rohanayush' },

  summary: [
    'Frontend engineer with 6+ years building scalable enterprise applications in Angular and Vue.js. I have shipped production systems at Hughes Systique, Infosys and product companies across social services, telecom and enterprise HR — reusable component libraries, complex RxJS and NgRx state management, and SAP and REST API integration.',
    'What I keep coming back to is the same thing in every role: a component library other people can build on, state that stays predictable when the data flow gets complicated, and code that the next engineer can read.',
    'Off the clock I build for problems I actually feel. Sore eyes, hours I could not account for, a note that kept getting buried — each app on this site started as a real annoyance of mine and was designed outward from it. I am drawn to applications with some soul in them, ones a person opens because it feels good to be in, rather than another dashboard or another cart flow.',
  ],

  lookingFor:
    'A senior frontend role in a product-driven engineering team, where code quality and ownership are central.',

  // The one thing to read if you read nothing else on the page.
  ethos: {
    title: 'I build for problems I actually feel.',
    text:
      'Every app on this site started as something that bothered me. My eyes ached at the end of a day, so I wrote something that counts screen-on time and tells me to look away. I could never account for where my hours went, so I built a tracker I would actually use. A note I needed kept getting buried under other windows, so I made one that refuses to be. I design from the annoyance outward — and I would much rather make an application with some soul in it, something a person opens because it feels good to be in, than build another dashboard or another cart flow.',
  },

  // Traits, each tied to something actually shipped — the products on this
  // site are the evidence, so nothing here is a claim without a receipt.
  howIWork: [
    {
      title: 'I go to whatever layer the problem lives in',
      text:
        'Eye Rest Reminder counts screen-on time in a Kotlin foreground service because a webview cannot. Calculate what you do! runs its Wi-Fi sync server in Rust, which keeps Android’s cleartext-HTTP policy and the CSP out of the way. Sthir counts on the volume keys through a native plugin. Frontend is where I live, but I do not stop at its edge.',
    },
    {
      title: 'I pick up the stack the problem needs',
      text:
        'Angular is my primary and my day job. Everything on this site is something else — Vue 3, React 19, Tauri v2, Rust, Capacitor, Kotlin — learned because a specific idea needed it. The same instinct sent me through eight months of ML and data work and a Google Advanced Data Analytics certificate.',
    },
    {
      title: 'Every decision has a reason I can give you',
      text:
        'Counts fire on pointerdown, because waiting for click costs the tap its immediacy. Digits cross-roll past each other instead of translating a strip, because a strip snaps backwards under fast tapping. R8 minification stays off in one Android build, because Capacitor resolves plugins by reflection and shrinking breaks them silently at runtime. I write the why down while it is still fresh.',
    },
    {
      title: 'Privacy is a default, not a setting',
      text:
        'None of these apps has an account, a backend, or a network call at runtime. Your notes, your tasks and your counts stay on your device, and exports are plain JSON you can read. It is the same care I bring to handling data in enterprise work.',
    },
    {
      title: 'The small stuff is the product',
      text:
        'A macOS-style genie squeeze when a note tucks away. Five landscapes and five counters drawn entirely in CSS, with not one image, audio file or font shipped. prefers-reduced-motion honoured everywhere. Reset needs a deliberate 1.5s hold, because losing a count is the worst thing that app could do.',
    },
    {
      title: 'I finish things',
      text:
        'Eighteen Playwright end-to-end tests against a production build. Signed release APKs, Windows installers and MSIs. CI/CD that deploys on push. Side projects are easy to start — I care about the unglamorous last mile that turns them into something a stranger can install.',
    },
  ],

  beyondWork:
    'Most of what is on this site was built in evenings and weekends. Not to pad a portfolio — because a small daily annoyance turned out to be solvable, and building the fix properly is the part I enjoy.',

  skills: [
    {
      title: 'Core frontend',
      tint: 'yellow',
      items: ['Angular (primary)', 'Vue.js', 'TypeScript', 'JavaScript ES6+', 'HTML5', 'CSS3', 'SCSS', 'RxJS', 'NgRx', 'Vuex'],
    },
    {
      title: 'Backend & APIs',
      tint: 'mint',
      items: ['Node.js', 'Express.js', 'Flask (Python)', 'REST APIs', 'GraphQL', 'MongoDB'],
    },
    {
      title: 'Tools & process',
      tint: 'blue',
      items: ['Git', 'AWS', 'CI/CD', 'Agile/Scrum', 'Angular Material', 'Firebase'],
    },
    {
      title: 'Data',
      tint: 'pink',
      items: ['Python', 'Pandas', 'scikit-learn', 'SQL', 'Tableau'],
    },
  ] as const,

  // Reverse-chronological.
  experience: [
    {
      role: 'Senior Engineer',
      company: 'Hughes Systique Corporation (HSC)',
      place: 'Gurugram, India',
      period: 'Jun 2024 – Present',
      length: '2 yrs 3 mos',
      current: true,
      points: [
        'Angular — social services platform: built the reusable component library, managed complex async data flows with RxJS and NgRx, and integrated multiple REST APIs.',
        'Vue.js — land operations ticketing system: dynamic tables with hierarchical parent–child ticket selection, pagination state that persists across navigation, and real-time Vuex state management.',
        'Delivered features in Agile sprints alongside backend, QA and product.',
      ],
    },
    {
      role: 'ML & data science upskilling',
      company: 'Career development break',
      place: 'Self-directed · Remote',
      period: 'Oct 2023 – May 2024',
      length: '8 mos',
      aside: true,
      points: [
        'Earned the Google Advanced Data Analytics Professional Certificate (Coursera).',
        'Built ML projects in Python and scikit-learn, a Flask recommendation API, and Tableau dashboards.',
      ],
    },
    {
      role: 'Software Engineer',
      company: 'dcafé digital',
      place: 'Pune, India',
      period: 'Apr 2023 – Sep 2023',
      length: '6 mos',
      points: [
        'Angular UI development with responsive design, strong cross-browser compatibility and reusable components.',
        'Shipped client-facing product features quickly in a startup environment.',
      ],
    },
    {
      role: 'Software Development Engineer',
      company: 'TechUp Labs',
      place: 'Remote',
      period: 'Aug 2022 – Oct 2022',
      length: '3 mos',
      points: [
        'Angular development in a fully remote, async-first team — independent delivery with no in-person oversight.',
      ],
    },
    {
      role: 'Senior System Engineer',
      company: 'Infosys',
      place: 'Remote',
      period: 'Jul 2021 – May 2022',
      length: '11 mos',
      points: [
        'Work scheduling system (Poland): Angular + SAP APIs, serving the entire Infosys Poland workforce.',
        'Role-based access, leave management, and Excel upload/download for bulk scheduling.',
      ],
    },
    {
      role: 'System Engineer',
      company: 'Infosys',
      place: 'Remote',
      period: 'May 2019 – Jun 2021',
      length: '2 yrs 2 mos',
      points: [
        'Infosys Employee Desk: Angular + Flask + SAP APIs — an internal HR platform for employee onboarding and offboarding.',
        'Dynamic search with Angular Material, graphs for activity analysis, and real-time SAP data flow.',
        'Built the reusable component library, and progressed to Senior within two years on the same large-scale programme.',
      ],
    },
  ],

  education: [
    {
      title: 'B.Tech, Information Technology',
      org: 'NIST, Berhampur',
      period: '2015 – 2019',
      detail: 'CGPA 7.36',
    },
  ],

  certifications: [
    { title: 'Google Advanced Data Analytics Professional Certificate', org: 'Coursera', period: '2023' },
    { title: 'Google Data Analytics Professional Certificate', org: 'Coursera', period: '2021' },
  ],
};
