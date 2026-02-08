import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

export const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#education', label: 'Education' },
];

export const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/DwijSawant', icon: Github },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/dwijsawant/', icon: Linkedin },
    { name: 'Twitter', url: 'https://x.com/Ntstellar', icon: Twitter },
    { name: 'Email', url: 'mailto:dwijpramodsawant@gmail.com', icon: Mail },
]

export const experiences = [
  {
    role: 'Community Moderation',
    company: 'Mon-Studios',
    period: 'January 2024 – December 2025',
    details: [
      'Assisted community members with Web3, NFTs, and blockchain-related inquiries, offering guidance and information.',
      'Provided support to users by assisting in bug fixes and troubleshooting issues.',
      ' Moderated community forums , ensuring adherence to community guidelines.',
    ],
  },
  {
    role: 'Smart Contract Developer Intern',
    company: 'BlockSeBlock',
    period: 'May 2024 – July 2024',
    details: [
      'Developed insurance decentralized application (dApp) on Internet Computer Protocol (ICP) blockchain infrastructure.',
      'Implemented smart contract functionality and user interface components for insurance-related transactions and claims processing.',
      'Collaborated with development team to integrate Web3 technologies and optimize dApp performance on ICP network.',
    ],
  },
  {
    role: 'Content Creation',
    company: 'GC Chronicles',
    period: 'June 2024 – August 2024',
    details: [
      'Developed and executed promotional strategies for brands in the Web3 ecosystem, using expertise in blockchain to craft accurate and engaging content.',
      'Created educational content about blockchain technologies, DeFi protocols, and emerging Web3 trends for diverse audiences.',
      'Collaborated with marketing teams to produce compelling narratives that effectively communicated complex blockchain concepts to mainstream audiences.',
    ],
  },
];

export const projects = [
  {
    title: 'MediBlock',
    description: 'MediBlock is a blockchain-based platform designed to secure and manage medical data through decentralized storage and smart contracts.',
    tags: ['CSS', 'JavaScript','React.js','Tailwind','IPFS services(Pinata)', 'JSX', 'Solidity'],
    imageId: 'mediblock',
    githubUrl: 'https://github.com/DwijSawant/Medi_Block.git'
  },
  {
    title: 'Wine Quality Predictor',
    description: 'Developed a machine learning model to predict wine quality based on chemical attributes like acidity, alcohol, sulphates, and pH levels.',
    tags: ['Python', 'NumPy', 'Pandas', 'Scikit-learn', 'Matplotlib', 'Seaborn'],
    imageId: 'wine-quality',
    githubUrl: 'https://github.com/DwijSawant/wine_analysis'
  },
  {
    title: 'SecureLeap',
    description: 'SecureLeap is a decentralized insurance platform built on the Internet Computer Protocol (ICP), empowering users with transparent, trustless, and community-driven coverage.',
    tags: ['Rust', 'Next.js', 'Web3.js', 'Node.js', 'Evm compatible icp chain', 'Smart Contracts'],
    imageId: 'secureleap',
    githubUrl: 'https://github.com/DwijSawant/SecureLeap.git'
  },
];

export const skills = [
  {
    category: 'Languages',
    technologies: ['Python', 'Java', 'C++', 'HTML/CSS', 'JavaScript', 'JSX', 'Solidity', 'Yul'],
  },
  {
    category: 'Developer Tools',
    technologies: ['VS Code', 'Remix', 'Hardhat', 'Matlab', 'Ltspice', 'Docker', 'Foundry'],
  },
  {
    category: 'Frameworks & Libraries',
    technologies: ['React (JSX)', 'Node.js', 'Express.js', 'Next.js', 'Pandas', 'NumPy', 'Scikit-learn'],
  },
  {
    category: 'Tools & Platforms',
    technologies: ['Git', 'Docker', 'IPFS', 'The Graph', 'Chainlink', 'Alchemy', 'Infura'],
  },
];

export const education = [
  {
    degree: 'B.Tech in Computer Engineering',
    institution: 'VJTI, Mumbai',
    period: '2021 - 2026',
  },
  {
    degree: 'HSC',
    institution: 'Kamaladevi College, Mumbai',
    period: '2017 - 2021',
  },
  {
    degree: 'ICSE',
    institution: 'Poddar International School',
    period: '2015-2020',
  },
  {
    degree: 'Primary Education',
    institution: 'Indian School Sur',
    period: '2010 - 2015',
  },
];

export const resumeContent = `

`;
