export type LinkItem = { label: string; url: string };
export type Project = {
    id: string;
    title: string;
    summary: string;
    tags: string[];
    links: LinkItem[];
    image?: { src: string; alt: string };
};

export const whoami = {
    name: 'Andrea Pallotta',
    tagline: 'Production engineering for the equities & futures desk with an emphasis in Python automation. Pragmatic code, healthy systems.',
    resumeUrl: 'https://drive.google.com/file/d/1dUc3GMAsi6v-EtoknBvVtK8vUQSEQhgh/view?usp=drive_link',
    profileImage: '/assets/profile.jpg',
};

export const experience = [
    {
        company: 'Susquehanna International Group (SIG)',
        role: 'Production Engineer — Equities & Futures Desk',
        when: 'Jan 2025 - Present',
        bullets: [
            'Python-first automation for desk workflows and production processes',
            'Troubleshooting and stabilizing production apps in partnership with trading, dev, and infra',
            'Built internal tooling, including a small full-stack app (auth, dashboards, job control)',
            'Environment hygiene, rollouts, observability improvements',
        ],
    },
    {
        company: 'Susquehanna International Group (SIG)',
        role: 'Systems Engineer',
        when: 'Aug 2023 - Dec 2024',
        bullets: [
            'Linux/Windows fleet care, scripting, and incident response',
            'Automation to reduce toil (Python/Bash) and unblock releases',
            'Improved runbooks and small utilities/dashboards used by teams',
        ],
    },
    {
        company: 'Council Rock',
        role: 'Software Engineer Intern',
        when: 'Jan 2022 - July 2022',
        bullets: [
            'Modified existing software to correct errors, upgrade interfaces, and improved performance.',
            'Consulted with customers on project status and technical issues',
            'Leveraged mastery of React and TypeScript to build top-quality code for diverse projects',
            'Gained knowledge in Linux development, networking, and security',
        ],
    },
];

export const skills = {
    languages: ['Python', 'Bash', 'PowerShell', 'JS/TS', 'React', 'Node.js', 'C++', 'Go (some)'],
    dataTasks: ['Pandas', 'batch automation', 'scripting pipelines'],
    frontend: ['React', 'Vite', 'Tailwind', 'Vue', 'Svelte'],
    practices: ['Observability', 'SLO/Critical thinking', 'runbooks', 'automate the boring stuff'],
};

export const socials: LinkItem[] = [
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/andreapallotta9' },
    { label: 'GitHub', url: 'https://github.com/AndreaPallotta' },
    { label: 'Dot', url: 'https://dot.cards/apdev' },
    { label: 'HackerRank', url: 'https://www.hackerrank.com/andreapallotta_1' },
    { label: 'TryHackMe', url: 'https://tryhackme.com/p/andreapallotta.d' },
];

export const contact = {
    email: 'andreapallotta.dev@gmail.com',
    dot: 'https://dot.cards/apdev',
};

export const projects: Project[] = [
    {
        id: 'sudoku_solver',
        title: 'sudoku_solver',
        summary: 'Python tool that solves Sudoku from files/images; parsing + algorithmic solver, CLI-friendly.',
        tags: ['Python', 'CLI', 'Algorithms', 'Automation'],
        links: [{ label: 'GitHub', url: 'https://github.com/AndreaPallotta/sudoku_solver' }],
        image: { src: '/assets/sudoku.png', alt: 'Sudoku Solver' },
    },
    {
        id: 'qr_reader',
        title: 'qr_reader',
        summary: 'Lightweight Python QR reader utility for quick pipelines and scripts.',
        tags: ['Python', 'CLI', 'Automation'],
        links: [{ label: 'GitHub', url: 'https://github.com/AndreaPallotta/qr_reader' }],
        image: { src: '/assets/qr.png', alt: 'QR Reader' },
    },
    {
        id: 'qlego',
        title: 'qlego',
        summary: 'Playful utility project; showcases practical problem-solving and tooling.',
        tags: ['Python'],
        links: [{ label: 'GitHub', url: 'https://github.com/AndreaPallotta/qlego' }],
        image: { src: '/assets/qlego.png', alt: 'qlego' },
    },
    {
        id: 'confignition',
        title: 'Confignition',
        summary: 'Flexible Node/TS config loader: multiple formats, remote sources, hot reload, strict parsing.',
        tags: ['TypeScript', 'Node', 'Config'],
        links: [
            { label: 'NPM', url: 'https://www.npmjs.com/package/confignition' },
            { label: 'GitHub', url: 'https://www.github.com/AndreaPallotta/confignition#readme' },
        ],
        image: { src: '/assets/confignition_logo.svg', alt: 'Confignition Logo' },
    },
    {
        id: 'ez-templates',
        title: 'Ez-templates',
        summary: 'NPX scaffolder to spin up web templates fast; skip boilerplate and start building.',
        tags: ['TypeScript', 'Node', 'CLI', 'Scaffolding'],
        links: [
            { label: 'NPM', url: 'https://www.npmjs.com/package/ez-templates' },
            { label: 'GitHub', url: 'https://www.github.com/AndreaPallotta/EzWebTemplate#readme' },
        ],
        image: { src: '/assets/ezt_logo.svg', alt: 'Ez-templates Logo' },
    },
];
