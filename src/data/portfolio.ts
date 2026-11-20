export interface IconItem {
  name: string;
  color: string;
  viewBox: string;
  svgInner: string;
  tech?: string;
}

export interface SocialItem {
  name: string;
  href: string;
  color: string;
  cursor: string;
  viewBox: string;
  svgInner: string;
}

export interface ExperienceItem {
  num: string;
  title: string;
  description: string;
  date: string;
}

export interface ProjectItem {
  title: string;
  description: string;
  cover: string;
  alt: string;
  href: string;
}

export interface WritingItem {
  title: string;
  date: string;
  href: string;
}

export interface GhCell {
  level: number;
  title: string;
}

export const HERO_LOGOS: IconItem[] = [
  {
    tech: "Py",
    color: "#3776ab",
    viewBox: "0 0 24 24",
    svgInner:
      '<path d="M11.858 0c-.978.005-1.913.088-2.736.234C6.7.662 6.26 1.558 6.26 3.21v2.182h5.725v.727H4.111c-1.664 0-3.121 1-3.577 2.903-.526 2.181-.549 3.542 0 5.82.407 1.694 1.379 2.902 3.043 2.902h1.969v-2.616c0-1.89 1.635-3.557 3.576-3.557h5.72c1.591 0 2.862-1.31 2.862-2.91v-5.45c0-1.553-1.309-2.718-2.863-2.977A18 18 0 0 0 11.858 0M8.762 1.755c.591 0 1.074.491 1.074 1.095 0 .601-.483 1.087-1.074 1.087A1.08 1.08 0 0 1 7.688 2.85c0-.604.48-1.095 1.074-1.095m9.656 4.364v2.543c0 1.971-1.671 3.63-3.577 3.63H9.122c-1.566 0-2.862 1.34-2.862 2.91v5.452c0 1.551 1.349 2.464 2.862 2.91 1.813.532 3.55.628 5.72 0 1.44-.418 2.862-1.258 2.862-2.91V18.47h-5.719v-.727h8.582c1.664 0 2.284-1.16 2.862-2.903.598-1.793.573-3.518 0-5.819-.41-1.656-1.196-2.903-2.862-2.903zm-3.216 13.807a1.08 1.08 0 0 1 1.074 1.088c0 .604-.48 1.094-1.074 1.094-.592 0-1.075-.49-1.075-1.094 0-.601.483-1.088 1.075-1.088"></path>',
    name: "Python",
  },
  {
    tech: "Go",
    color: "#00add8",
    viewBox: "0 0 24 24",
    svgInner:
      '<path d="M1.811 10.231c-.047 0-.058-.023-.035-.059l.246-.315c.023-.035.081-.058.128-.058h4.172c.046 0 .058.035.035.07l-.199.303c-.023.036-.082.07-.117.07zM.047 11.306c-.047 0-.059-.023-.035-.058l.245-.316c.023-.035.082-.058.129-.058h5.328c.047 0 .07.035.058.07l-.093.28c-.012.047-.058.07-.105.07zm2.828 1.075c-.047 0-.059-.035-.035-.07l.163-.292c.023-.035.07-.07.117-.07h2.337c.047 0 .07.035.07.082l-.023.28c0 .047-.047.082-.082.082zm12.129-2.36c-.736.187-1.239.327-1.963.514-.176.046-.187.058-.34-.117-.174-.199-.303-.327-.548-.444-.737-.362-1.45-.257-2.115.175-.795.514-1.204 1.274-1.192 2.22.011.935.654 1.706 1.577 1.835.795.105 1.46-.175 1.987-.77.105-.13.198-.27.315-.434H10.47c-.245 0-.304-.152-.222-.35.152-.362.432-.97.596-1.274a.315.315 0 01.292-.187h4.253c-.023.316-.023.631-.07.947a4.983 4.983 0 01-.958 2.29c-.841 1.11-1.94 1.8-3.33 1.986-1.145.152-2.209-.07-3.143-.77-.865-.655-1.356-1.52-1.484-2.595-.152-1.274.222-2.419.993-3.424.83-1.086 1.928-1.776 3.272-2.02 1.098-.2 2.15-.07 3.096.571.62.41 1.063.97 1.356 1.648.07.105.023.164-.117.2m3.868 6.461c-1.064-.024-2.034-.328-2.852-1.029a3.665 3.665 0 01-1.262-2.255c-.21-1.32.152-2.489.947-3.529.853-1.122 1.881-1.706 3.272-1.95 1.192-.21 2.314-.095 3.33.595.923.63 1.496 1.484 1.648 2.605.198 1.578-.257 2.863-1.344 3.962-.771.783-1.718 1.273-2.805 1.495-.315.06-.63.07-.934.106zm2.78-4.72c-.011-.153-.011-.27-.034-.387-.21-1.157-1.274-1.81-2.384-1.554-1.087.245-1.788.935-2.045 2.033-.21.912.234 1.835 1.075 2.21.643.28 1.285.244 1.905-.07.923-.48 1.425-1.228 1.484-2.233z"></path>',
    name: "Go",
  },
  {
    tech: "JS",
    color: "#5FA04E",
    viewBox: "0 0 24 24",
    svgInner:
      '<path d="M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383 c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0l8.795-5.076 c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.189-0.047-0.271,0 L3.075,6.68C2.99,6.729,2.936,6.825,2.936,6.921v10.15c0,0.097,0.054,0.189,0.139,0.235l2.409,1.392 c1.307,0.654,2.108-0.116,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021 c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L2.28,18.675c-0.57-0.329-0.922-0.945-0.922-1.604V6.921 c0-0.659,0.353-1.275,0.922-1.603l8.795-5.082c0.557-0.315,1.296-0.315,1.848,0l8.794,5.082c0.57,0.329,0.924,0.944,0.924,1.603 v10.15c0,0.659-0.354,1.273-0.924,1.604l-8.794,5.078C12.643,23.916,12.324,24,11.998,24z M19.099,13.993 c0-1.9-1.284-2.406-3.987-2.763c-2.731-0.361-3.009-0.548-3.009-1.187c0-0.528,0.235-1.233,2.258-1.233 c1.807,0,2.473,0.389,2.747,1.607c0.024,0.115,0.129,0.199,0.247,0.199h1.141c0.071,0,0.138-0.031,0.186-0.081 c0.048-0.054,0.074-0.123,0.067-0.196c-0.177-2.098-1.571-3.076-4.388-3.076c-2.508,0-4.004,1.058-4.004,2.833 c0,1.925,1.488,2.457,3.895,2.695c2.88,0.282,3.103,0.703,3.103,1.269c0,0.983-0.789,1.402-2.642,1.402 c-2.327,0-2.839-0.584-3.011-1.742c-0.02-0.124-0.126-0.215-0.253-0.215h-1.137c-0.141,0-0.254,0.112-0.254,0.253 c0,1.482,0.806,3.248,4.655,3.248C17.501,17.007,19.099,15.91,19.099,13.993z"></path>',
    name: "Node.js",
  },
  {
    tech: "Java",
    color: "#f89820",
    viewBox: "0 0 24 24",
    svgInner:
      '<path d="M8.851 18.56s-.917.534.653.714c1.902.218 2.874.187 4.969-.211 0 0 .552.346 1.321.646-4.699 2.013-10.633-.118-6.943-1.149m-.575-2.626s-1.028.761.542.924c2.032.209 3.636.227 6.413-.308 0 0 .384.389.987.602-5.679 1.661-12.007.13-7.942-1.218m4.84-4.45c1.158 1.333-.304 2.533-.304 2.533s2.939-1.518 1.589-3.418c-1.261-1.772-2.228-2.652 3.007-5.688 0-.001-8.216 2.051-4.292 6.573m6.214 9.02s.679.559-.747.991c-2.712.822-11.288 1.069-13.669.033-.856-.373.75-.89 1.254-.998.527-.114.828-.093.828-.093-.953-.671-6.156 1.317-2.643 1.887 9.58 1.553 17.462-.7 14.977-1.82M9.292 13.21s-4.362 1.036-1.544 1.412c1.189.159 3.561.123 5.77-.062 1.806-.152 3.618-.477 3.618-.477s-.637.272-1.098.587c-4.429 1.165-12.986.623-10.522-.568 2.082-1.006 3.776-.892 3.776-.892m7.824 4.374c4.503-2.34 2.421-4.589.968-4.285-.355.074-.515.138-.515.138s.132-.207.385-.297c2.875-1.011 5.086 2.981-.928 4.562 0-.001.07-.062.09-.118m-2.712-17.584s2.495 2.495-2.365 6.331c-3.896 3.077-.888 4.832-.001 6.836-2.274-2.053-3.943-3.858-2.824-5.539 1.644-2.469 6.197-3.665 5.19-7.628m-4.67 23.811c4.323.277 10.959-.154 11.116-2.198 0 0-.302.775-3.572 1.391-3.688.694-8.239.613-10.937.168 0-.001.553.457 3.393.639"></path>',
    name: "Java",
  },
  {
    tech: "Db",
    color: "#47A248",
    viewBox: "0 0 24 24",
    svgInner:
      '<path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0111.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 003.639-8.464c.01-.814-.103-1.662-.197-2.218zm-5.336 8.195s0-8.291.275-8.29c.213 0 .49 10.695.49 10.695-.381-.045-.765-1.76-.765-2.405z"></path>',
    name: "MongoDB",
  },
];

export const SOCIALS: SocialItem[] = [
  {
    href: "https://www.linkedin.com/in/geek-himanshujain",
    color: "#0a66c2",
    cursor: "Connect",
    viewBox: "0 0 24 24",
    svgInner:
      '<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path>',
    name: "LinkedIn",
  },
  {
    href: "https://autoplaced.ai",
    color: "#e11d48",
    cursor: "Visit",
    viewBox: "0 0 24 24",
    svgInner:
      '<path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2Zm7.93 9h-3.17a15.3 15.3 0 0 0-1.15-5.02A8.026 8.026 0 0 1 19.93 11ZM12 4.04c.83 1.2 1.98 3.64 2.34 6.96H9.66C10.02 7.68 11.17 5.24 12 4.04ZM4.26 14a8.18 8.18 0 0 1 0-4h3.38a16.82 16.82 0 0 0 0 4Zm.81 2h3.17a15.3 15.3 0 0 0 1.15 5.02A8.026 8.026 0 0 1 5.07 16Zm3.17-8H5.07a8.026 8.026 0 0 1 4.32-5.02A15.3 15.3 0 0 0 8.24 8ZM12 19.96c-.83-1.2-1.98-3.64-2.34-6.96h4.68c-.36 3.32-1.51 5.76-2.34 6.96Zm2.61 1.06A15.3 15.3 0 0 0 15.76 16h3.17a8.026 8.026 0 0 1-4.32 5.02ZM16.36 14a16.82 16.82 0 0 0 0-4h3.38a8.18 8.18 0 0 1 0 4Z"></path>',
    name: "autoplaced.ai",
  },
  {
    href: "mailto:manshujain2020@gmail.com",
    color: "#ea4335",
    cursor: "Email",
    viewBox: "0 0 24 24",
    svgInner:
      '<path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2Zm0 4-8 5-8-5V6l8 5 8-5v2Z"></path>',
    name: "manshujain2020@gmail.com",
  },
  {
    href: "tel:+918319050525",
    color: "#16a34a",
    cursor: "Call",
    viewBox: "0 0 24 24",
    svgInner:
      '<path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24 11.4 11.4 0 0 0 3.58.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .57 3.58 1 1 0 0 1-.25 1.01l-2.2 2.2Z"></path>',
    name: "+91 83190 50525",
  },
  {
    href: "/assets/aistudio/Profile__5__e07fcfa8.pdf",
    color: "#7c3aed",
    cursor: "Resume",
    viewBox: "0 0 24 24",
    svgInner:
      '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Zm0 2.5L17.5 8H14V4.5ZM8 12h8v1.5H8V12Zm0 3.5h8V17H8v-1.5Zm0-7h3.5V10H8V8.5Z"></path>',
    name: "Resume PDF",
  },
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    num: "01",
    title: "AutoPlaced.ai · Founder",
    description:
      "Bengaluru · Product ideation & strategy, competitive positioning, GTM execution & cross-functional AI career ecosystem workflows",
    date: "Sep 2026 — Present",
  },
  {
    num: "02",
    title: "Reputation · Senior Software Engineer",
    description:
      "Hyderabad, Telangana · Scalable backend systems, distributed microservices, API optimization & enterprise reliability",
    date: "Sep 2024 — Aug 2026",
  },
  {
    num: "03",
    title: "Turing · AI Engineer",
    description:
      "India · AI engineering, LLM-powered workflows & intelligent automation systems",
    date: "Aug 2024",
  },
  {
    num: "04",
    title: "Simpl · SDE-2",
    description:
      "India · Event-driven architectures, asynchronous processing & high-throughput distributed services",
    date: "Dec 2023 — May 2024",
  },
  {
    num: "05",
    title: "Vymo · Member of Technical Staff",
    description:
      "Karnataka · Enterprise backend engineering, database design, query optimization & REST APIs",
    date: "Sep 2022 — Oct 2023",
  },
  {
    num: "06",
    title: "Park+ · Software Engineer",
    description:
      "Gurugram, Haryana · Low-latency backend services, scalable API development & core platform infrastructure",
    date: "Jul 2021 — Dec 2021",
  },
  {
    num: "07",
    title: "Technocrats Institute Of Technology · B.E. CSE",
    description:
      "Bachelor's degree in Computer Science and Engineering",
    date: "Jun 2017 — Jun 2021",
  },
];

export const SKILLS: IconItem[] = [
  {
    name: "Python",
    color: "#3776AB",
    viewBox: "0 0 24 24",
    svgInner:
      '<path d="M11.858 0c-.978.005-1.913.088-2.736.234C6.7.662 6.26 1.558 6.26 3.21v2.182h5.725v.727H4.111c-1.664 0-3.121 1-3.577 2.903-.526 2.181-.549 3.542 0 5.82.407 1.694 1.379 2.902 3.043 2.902h1.969v-2.616c0-1.89 1.635-3.557 3.576-3.557h5.72c1.591 0 2.862-1.31 2.862-2.91v-5.45c0-1.553-1.309-2.718-2.863-2.977A18 18 0 0 0 11.858 0M8.762 1.755c.591 0 1.074.491 1.074 1.095 0 .601-.483 1.087-1.074 1.087A1.08 1.08 0 0 1 7.688 2.85c0-.604.48-1.095 1.074-1.095m9.656 4.364v2.543c0 1.971-1.671 3.63-3.577 3.63H9.122c-1.566 0-2.862 1.34-2.862 2.91v5.452c0 1.551 1.349 2.464 2.862 2.91 1.813.532 3.55.628 5.72 0 1.44-.418 2.862-1.258 2.862-2.91V18.47h-5.719v-.727h8.582c1.664 0 2.284-1.16 2.862-2.903.598-1.793.573-3.518 0-5.819-.41-1.656-1.196-2.903-2.862-2.903zm-3.216 13.807a1.08 1.08 0 0 1 1.074 1.088c0 .604-.48 1.094-1.074 1.094-.592 0-1.075-.49-1.075-1.094 0-.601.483-1.088 1.075-1.088" />',
  },
  {
    name: "Go",
    color: "#00ADD8",
    viewBox: "0 0 24 24",
    svgInner:
      '<path d="M1.811 10.231c-.047 0-.058-.023-.035-.059l.246-.315c.023-.035.081-.058.128-.058h4.172c.046 0 .058.035.035.07l-.199.303c-.023.036-.082.07-.117.07zM.047 11.306c-.047 0-.059-.023-.035-.058l.245-.316c.023-.035.082-.058.129-.058h5.328c.047 0 .07.035.058.07l-.093.28c-.012.047-.058.07-.105.07zm2.828 1.075c-.047 0-.059-.035-.035-.07l.163-.292c.023-.035.07-.07.117-.07h2.337c.047 0 .07.035.07.082l-.023.28c0 .047-.047.082-.082.082zm12.129-2.36c-.736.187-1.239.327-1.963.514-.176.046-.187.058-.34-.117-.174-.199-.303-.327-.548-.444-.737-.362-1.45-.257-2.115.175-.795.514-1.204 1.274-1.192 2.22.011.935.654 1.706 1.577 1.835.795.105 1.46-.175 1.987-.77.105-.13.198-.27.315-.434H10.47c-.245 0-.304-.152-.222-.35.152-.362.432-.97.596-1.274a.315.315 0 01.292-.187h4.253c-.023.316-.023.631-.07.947a4.983 4.983 0 01-.958 2.29c-.841 1.11-1.94 1.8-3.33 1.986-1.145.152-2.209-.07-3.143-.77-.865-.655-1.356-1.52-1.484-2.595-.152-1.274.222-2.419.993-3.424.83-1.086 1.928-1.776 3.272-2.02 1.098-.2 2.15-.07 3.096.571.62.41 1.063.97 1.356 1.648.07.105.023.164-.117.2m3.868 6.461c-1.064-.024-2.034-.328-2.852-1.029a3.665 3.665 0 01-1.262-2.255c-.21-1.32.152-2.489.947-3.529.853-1.122 1.881-1.706 3.272-1.95 1.192-.21 2.314-.095 3.33.595.923.63 1.496 1.484 1.648 2.605.198 1.578-.257 2.863-1.344 3.962-.771.783-1.718 1.273-2.805 1.495-.315.06-.63.07-.934.106zm2.78-4.72c-.011-.153-.011-.27-.034-.387-.21-1.157-1.274-1.81-2.384-1.554-1.087.245-1.788.935-2.045 2.033-.21.912.234 1.835 1.075 2.21.643.28 1.285.244 1.905-.07.923-.48 1.425-1.228 1.484-2.233z" />',
  },
  {
    name: "Node.js",
    color: "#5FA04E",
    viewBox: "0 0 24 24",
    svgInner:
      '<path d="M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383 c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0l8.795-5.076 c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.189-0.047-0.271,0 L3.075,6.68C2.99,6.729,2.936,6.825,2.936,6.921v10.15c0,0.097,0.054,0.189,0.139,0.235l2.409,1.392 c1.307,0.654,2.108-0.116,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021 c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L2.28,18.675c-0.57-0.329-0.922-0.945-0.922-1.604V6.921 c0-0.659,0.353-1.275,0.922-1.603l8.795-5.082c0.557-0.315,1.296-0.315,1.848,0l8.794,5.082c0.57,0.329,0.924,0.944,0.924,1.603 v10.15c0,0.659-0.354,1.273-0.924,1.604l-8.794,5.078C12.643,23.916,12.324,24,11.998,24z M19.099,13.993 c0-1.9-1.284-2.406-3.987-2.763c-2.731-0.361-3.009-0.548-3.009-1.187c0-0.528,0.235-1.233,2.258-1.233 c1.807,0,2.473,0.389,2.747,1.607c0.024,0.115,0.129,0.199,0.247,0.199h1.141c0.071,0,0.138-0.031,0.186-0.081 c0.048-0.054,0.074-0.123,0.067-0.196c-0.177-2.098-1.571-3.076-4.388-3.076c-2.508,0-4.004,1.058-4.004,2.833 c0,1.925,1.488,2.457,3.895,2.695c2.88,0.282,3.103,0.703,3.103,1.269c0,0.983-0.789,1.402-2.642,1.402 c-2.327,0-2.839-0.584-3.011-1.742c-0.02-0.124-0.126-0.215-0.253-0.215h-1.137c-0.141,0-0.254,0.112-0.254,0.253 c0,1.482,0.806,3.248,4.655,3.248C17.501,17.007,19.099,15.91,19.099,13.993z" />',
  },
  {
    name: "Java",
    color: "#F89820",
    viewBox: "0 0 24 24",
    svgInner:
      '<path d="M8.851 18.56s-.917.534.653.714c1.902.218 2.874.187 4.969-.211 0 0 .552.346 1.321.646-4.699 2.013-10.633-.118-6.943-1.149m-.575-2.626s-1.028.761.542.924c2.032.209 3.636.227 6.413-.308 0 0 .384.389.987.602-5.679 1.661-12.007.13-7.942-1.218m4.84-4.45c1.158 1.333-.304 2.533-.304 2.533s2.939-1.518 1.589-3.418c-1.261-1.772-2.228-2.652 3.007-5.688 0-.001-8.216 2.051-4.292 6.573m6.214 9.02s.679.559-.747.991c-2.712.822-11.288 1.069-13.669.033-.856-.373.75-.89 1.254-.998.527-.114.828-.093.828-.093-.953-.671-6.156 1.317-2.643 1.887 9.58 1.553 17.462-.7 14.977-1.82M9.292 13.21s-4.362 1.036-1.544 1.412c1.189.159 3.561.123 5.77-.062 1.806-.152 3.618-.477 3.618-.477s-.637.272-1.098.587c-4.429 1.165-12.986.623-10.522-.568 2.082-1.006 3.776-.892 3.776-.892m7.824 4.374c4.503-2.34 2.421-4.589.968-4.285-.355.074-.515.138-.515.138s.132-.207.385-.297c2.875-1.011 5.086 2.981-.928 4.562 0-.001.07-.062.09-.118m-2.712-17.584s2.495 2.495-2.365 6.331c-3.896 3.077-.888 4.832-.001 6.836-2.274-2.053-3.943-3.858-2.824-5.539 1.644-2.469 6.197-3.665 5.19-7.628m-4.67 23.811c4.323.277 10.959-.154 11.116-2.198 0 0-.302.775-3.572 1.391-3.688.694-8.239.613-10.937.168 0-.001.553.457 3.393.639" />',
  },
  {
    name: "C",
    color: "#A8B9CC",
    viewBox: "0 0 24 24",
    svgInner:
      '<path d="M22.394 6c-.167-.29-.398-.543-.652-.69L12.926.22c-.509-.294-1.34-.294-1.848 0L2.26 5.31c-.508.293-.923 1.013-.923 1.6v10.18c0 .294.104.62.271.91.167.29.398.543.652.69l8.816 5.09c.508.293 1.34.293 1.848 0l8.816-5.09c.254-.147.485-.4.652-.69.167-.29.27-.616.27-.91V6.91c.002-.294-.101-.62-.268-.91zM12 19.11a7.11 7.11 0 1 1 6.16-10.66l-3.09 1.78A3.555 3.555 0 1 0 15.07 13.77l3.09 1.78A7.11 7.11 0 0 1 12 19.11z" />',
  },
  {
    name: "MongoDB",
    color: "#47A248",
    viewBox: "0 0 24 24",
    svgInner:
      '<path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0111.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 003.639-8.464c.01-.814-.103-1.662-.197-2.218zm-5.336 8.195s0-8.291.275-8.29c.213 0 .49 10.695.49 10.695-.381-.045-.765-1.76-.765-2.405z" />',
  },
  {
    name: "Elasticsearch",
    color: "#005571",
    viewBox: "0 0 24 24",
    svgInner:
      '<path d="M17.34 14.375H2.893a9.107 9.107 0 0 0 16.013 3.437l-1.566-3.437ZM2.893 9.625H17.34l1.566-3.437A9.107 9.107 0 0 0 2.893 9.625Zm15.55 2.375a1.5 1.5 0 0 0-1.5-1.5H2.1a9.16 9.16 0 0 0 0 3h14.843a1.5 1.5 0 0 0 1.5-1.5Z" />',
  },
  {
    name: "RabbitMQ",
    color: "#FF6600",
    viewBox: "0 0 24 24",
    svgInner:
      '<path d="M22.87 9.6h-6.83V2.25A1.13 1.13 0 0 0 14.9 1.13h-2.18a1.13 1.13 0 0 0-1.12 1.12V9.6H9.26V2.25A1.13 1.13 0 0 0 8.13 1.13H5.95A1.13 1.13 0 0 0 4.82 2.25V9.6H2.25A1.13 1.13 0 0 0 1.13 10.73v11.02A1.13 1.13 0 0 0 2.25 22.87h20.62A1.13 1.13 0 0 0 24 21.75V10.73A1.13 1.13 0 0 0 22.87 9.6Zm-5.17 8.47a1.5 1.5 0 1 1 1.5-1.5 1.5 1.5 0 0 1-1.5 1.5Z" />',
  },
  {
    name: "Google Pub/Sub",
    color: "#4285F4",
    viewBox: "0 0 24 24",
    svgInner:
      '<path d="M12 9.5a2.5 2.5 0 1 0 2.5 2.5A2.5 2.5 0 0 0 12 9.5Zm0-7a2 2 0 1 0 2 2 2 2 0 0 0-2-2Zm0 15a2 2 0 1 0 2 2 2 2 0 0 0-2-2Zm6.5-11.25a2 2 0 1 0 2 2 2 2 0 0 0-2-2Zm0 7.5a2 2 0 1 0 2 2 2 2 0 0 0-2-2Zm-13-7.5a2 2 0 1 0 2 2 2 2 0 0 0-2-2Zm0 7.5a2 2 0 1 0 2 2 2 2 0 0 0-2-2Z" />',
  },
  {
    name: "SQL",
    color: "#336791",
    viewBox: "0 0 24 24",
    svgInner:
      '<path d="M12 2C6.48 2 2 3.79 2 6v12c0 2.21 4.48 4 10 4s10-1.79 10-4V6c0-2.21-4.48-4-10-4Zm0 2c4.42 0 8 1.12 8 2.5S16.42 9 12 9 4 7.88 4 6.5 7.58 4 12 4Zm0 16c-4.42 0-8-1.12-8-2.5v-2.64C5.86 15.86 8.76 16.5 12 16.5s6.14-.64 8-1.64v2.64c0 1.38-3.58 2.5-8 2.5Zm0-5.5c-4.42 0-8-1.12-8-2.5V9.36C5.86 10.36 8.76 11 12 11s6.14-.64 8-1.64V12c0 1.38-3.58 2.5-8 2.5Z" />',
  },
  {
    name: "REST APIs",
    color: "#38BDF8",
    viewBox: "0 0 24 24",
    svgInner:
      '<path d="M7.5 7.5 3 12l4.5 4.5-1.4 1.4L.2 12l5.9-5.9 1.4 1.4Zm9 0L21 12l-4.5 4.5 1.4 1.4 5.9-5.9-5.9-5.9-1.4 1.4Zm-3.1-2-4.8 13 1.9.7 4.8-13-1.9-.7Z" />',
  },
  {
    name: "Microservices",
    color: "#FB7185",
    viewBox: "0 0 24 24",
    svgInner:
      '<path d="M3 3h7v7H3V3Zm11 0h7v7h-7V3ZM3 14h7v7H3v-7Zm11 3.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0Z" />',
  },
  {
    name: "Distributed Systems",
    color: "#A78BFA",
    viewBox: "0 0 24 24",
    svgInner:
      '<path d="M12 2a3 3 0 1 0 3 3 3 3 0 0 0-3-3Zm-7 13a3 3 0 1 0 3 3 3 3 0 0 0-3-3Zm14 0a3 3 0 1 0 3 3 3 3 0 0 0-3-3ZM11 8.83v3.59l-4.45 2.57 1 1.73L12 14.15l4.45 2.57 1-1.73L13 12.42V8.83h-2Z" />',
  },
  {
    name: "Event-Driven",
    color: "#F59E0B",
    viewBox: "0 0 24 24",
    svgInner:
      '<path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />',
  },
  {
    name: "High-Level Design",
    color: "#34D399",
    viewBox: "0 0 24 24",
    svgInner:
      '<path d="M4 4h16v4H4V4Zm0 6h7v10H4V10Zm9 0h7v4h-7v-4Zm0 6h7v4h-7v-4Z" />',
  },
  {
    name: "API Optimization",
    color: "#F43F5E",
    viewBox: "0 0 24 24",
    svgInner:
      '<path d="M12 4a9 9 0 0 0-9 9c0 2.75 1.24 5.21 3.19 6.86l1.42-1.42A7 7 0 1 1 19 13h-3l4 4 4-4h-3a9 9 0 0 0-9-9Zm-.5 4v5.5l4 2.4.75-1.23-3.25-1.92V8h-1.5Z" />',
  },
  {
    name: "Java Development",
    color: "#EA580C",
    viewBox: "0 0 24 24",
    svgInner:
      '<path d="M9.4 16.6 4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4Zm5.2 0 4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4Z" />',
  },
  {
    name: "Software Construction",
    color: "#E5E5E5",
    viewBox: "0 0 24 24",
    svgInner:
      '<path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4Z" />',
  },
  {
    name: "Program Creation",
    color: "#60A5FA",
    viewBox: "0 0 24 24",
    svgInner:
      '<path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2Zm-9 14-5-5 1.4-1.4L10 14.2l7.6-7.6L19 8l-9 9Z" />',
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    title: "AutoPlaced.ai",
    description:
      "AI-powered job search platform transforming how candidates discover opportunities, apply for roles, and prepare for interviews. Leading product strategy, competitive positioning, GTM execution, and UX engineering.",
    cover: "/projects/hm-autoplaced.svg",
    alt: "AutoPlaced.ai platform architecture cover",
    href: "https://autoplaced.ai",
  },
  {
    title: "Distributed Microservices",
    description:
      "Scalable backend services and asynchronous event-driven pipelines engineered with RabbitMQ, Google Pub/Sub, Python, Go, Node.js, and Java across Reputation, Simpl, Vymo, and Park+.",
    cover: "/projects/hm-distributed.svg",
    alt: "Distributed microservices event bus architecture cover",
    href: "https://www.linkedin.com/in/geek-himanshujain",
  },
  {
    title: "Low-Latency Search & APIs",
    description:
      "High-availability REST APIs backed by MongoDB and Elasticsearch with database design, query optimization, High-Level Design (HLD), and fault-tolerant enterprise reliability.",
    cover: "/projects/hm-search.svg",
    alt: "MongoDB and Elasticsearch low-latency pipeline cover",
    href: "https://www.linkedin.com/in/geek-himanshujain",
  },
  {
    title: "Career Dossier (PDF)",
    description:
      "Full LinkedIn profile PDF featuring 5+ years of backend & AI experience, B.E. CSE from Technocrats Institute Of Technology, HackerRank certifications, and direct contact info.",
    cover: "/projects/hm-dossier.svg",
    alt: "Himanshu Jain LinkedIn profile dossier cover",
    href: "/assets/aistudio/Profile__5__e07fcfa8.pdf",
  },
];

export const WRITINGS: WritingItem[] = [
  {
    title: "Problem Solving (Intermediate)",
    date: "HackerRank",
    href: "https://www.linkedin.com/in/geek-himanshujain",
  },
  {
    title: "Problem Solving (Basic)",
    date: "HackerRank",
    href: "https://www.linkedin.com/in/geek-himanshujain",
  },
  {
    title: "Programming in C (Intermediate)",
    date: "HackerRank",
    href: "https://www.linkedin.com/in/geek-himanshujain",
  },
  {
    title: "Programming in C (Basic)",
    date: "HackerRank",
    href: "https://www.linkedin.com/in/geek-himanshujain",
  },
  {
    title: "SQL Certified by HackerRank",
    date: "HackerRank",
    href: "https://www.linkedin.com/in/geek-himanshujain",
  },
];

export const GITHUB_CELLS: GhCell[] = [
  {
    "level": 0,
    "title": "0 contributions on 2025-11-16"
  },
  {
    "level": 0,
    "title": "0 contributions on 2025-11-17"
  },
  {
    "level": 0,
    "title": "0 contributions on 2025-11-18"
  },
  {
    "level": 0,
    "title": "0 contributions on 2025-11-19"
  },
  {
    "level": 0,
    "title": "0 contributions on 2025-11-20"
  },
  {
    "level": 0,
    "title": "0 contributions on 2025-11-21"
  },
  {
    "level": 0,
    "title": "0 contributions on 2025-11-22"
  },
  {
    "level": 0,
    "title": "0 contributions on 2025-11-23"
  },
  {
    "level": 0,
    "title": "0 contributions on 2025-11-24"
  },
  {
    "level": 0,
    "title": "0 contributions on 2025-11-25"
  },
  {
    "level": 0,
    "title": "0 contributions on 2025-11-26"
  },
  {
    "level": 0,
    "title": "0 contributions on 2025-11-27"
  },
  {
    "level": 0,
    "title": "0 contributions on 2025-11-28"
  },
  {
    "level": 0,
    "title": "0 contributions on 2025-11-29"
  },
  {
    "level": 0,
    "title": "0 contributions on 2025-11-30"
  },
  {
    "level": 0,
    "title": "0 contributions on 2025-12-01"
  },
  {
    "level": 0,
    "title": "0 contributions on 2025-12-02"
  },
  {
    "level": 0,
    "title": "0 contributions on 2025-12-03"
  },
  {
    "level": 0,
    "title": "0 contributions on 2025-12-04"
  },
  {
    "level": 0,
    "title": "0 contributions on 2025-12-05"
  },
  {
    "level": 0,
    "title": "0 contributions on 2025-12-06"
  },
  {
    "level": 0,
    "title": "0 contributions on 2025-12-07"
  },
  {
    "level": 0,
    "title": "0 contributions on 2025-12-08"
  },
  {
    "level": 0,
    "title": "0 contributions on 2025-12-09"
  },
  {
    "level": 0,
    "title": "0 contributions on 2025-12-10"
  },
  {
    "level": 0,
    "title": "0 contributions on 2025-12-11"
  },
  {
    "level": 0,
    "title": "0 contributions on 2025-12-12"
  },
  {
    "level": 0,
    "title": "0 contributions on 2025-12-13"
  },
  {
    "level": 0,
    "title": "0 contributions on 2025-12-14"
  },
  {
    "level": 0,
    "title": "0 contributions on 2025-12-15"
  },
  {
    "level": 0,
    "title": "0 contributions on 2025-12-16"
  },
  {
    "level": 0,
    "title": "0 contributions on 2025-12-17"
  },
  {
    "level": 0,
    "title": "0 contributions on 2025-12-18"
  },
  {
    "level": 0,
    "title": "0 contributions on 2025-12-19"
  },
  {
    "level": 0,
    "title": "0 contributions on 2025-12-20"
  },
  {
    "level": 0,
    "title": "0 contributions on 2025-12-21"
  },
  {
    "level": 0,
    "title": "0 contributions on 2025-12-22"
  },
  {
    "level": 0,
    "title": "0 contributions on 2025-12-23"
  },
  {
    "level": 0,
    "title": "0 contributions on 2025-12-24"
  },
  {
    "level": 0,
    "title": "0 contributions on 2025-12-25"
  },
  {
    "level": 0,
    "title": "0 contributions on 2025-12-26"
  },
  {
    "level": 0,
    "title": "0 contributions on 2025-12-27"
  },
  {
    "level": 0,
    "title": "0 contributions on 2025-12-28"
  },
  {
    "level": 0,
    "title": "0 contributions on 2025-12-29"
  },
  {
    "level": 0,
    "title": "0 contributions on 2025-12-30"
  },
  {
    "level": 0,
    "title": "0 contributions on 2025-12-31"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-01-01"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-01-02"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-01-03"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-01-04"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-01-05"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-01-06"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-01-07"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-01-08"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-01-09"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-01-10"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-01-11"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-01-12"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-01-13"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-01-14"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-01-15"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-01-16"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-01-17"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-01-18"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-01-19"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-01-20"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-01-21"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-01-22"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-01-23"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-01-24"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-01-25"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-01-26"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-01-27"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-01-28"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-01-29"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-01-30"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-01-31"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-02-01"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-02-02"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-02-03"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-02-04"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-02-05"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-02-06"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-02-07"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-02-08"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-02-09"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-02-10"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-02-11"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-02-12"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-02-13"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-02-14"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-02-15"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-02-16"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-02-17"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-02-18"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-02-19"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-02-20"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-02-21"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-02-22"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-02-23"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-02-24"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-02-25"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-02-26"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-02-27"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-02-28"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-03-01"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-03-02"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-03-03"
  },
  {
    "level": 4,
    "title": "8 contributions on 2026-03-04"
  },
  {
    "level": 4,
    "title": "11 contributions on 2026-03-05"
  },
  {
    "level": 2,
    "title": "5 contributions on 2026-03-06"
  },
  {
    "level": 2,
    "title": "5 contributions on 2026-03-07"
  },
  {
    "level": 2,
    "title": "3 contributions on 2026-03-08"
  },
  {
    "level": 2,
    "title": "5 contributions on 2026-03-09"
  },
  {
    "level": 2,
    "title": "5 contributions on 2026-03-10"
  },
  {
    "level": 3,
    "title": "6 contributions on 2026-03-11"
  },
  {
    "level": 2,
    "title": "3 contributions on 2026-03-12"
  },
  {
    "level": 2,
    "title": "3 contributions on 2026-03-13"
  },
  {
    "level": 3,
    "title": "6 contributions on 2026-03-14"
  },
  {
    "level": 2,
    "title": "5 contributions on 2026-03-15"
  },
  {
    "level": 1,
    "title": "2 contributions on 2026-03-16"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-03-17"
  },
  {
    "level": 2,
    "title": "3 contributions on 2026-03-18"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-03-19"
  },
  {
    "level": 2,
    "title": "3 contributions on 2026-03-20"
  },
  {
    "level": 2,
    "title": "3 contributions on 2026-03-21"
  },
  {
    "level": 1,
    "title": "1 contributions on 2026-03-22"
  },
  {
    "level": 2,
    "title": "4 contributions on 2026-03-23"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-03-24"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-03-25"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-03-26"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-03-27"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-03-28"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-03-29"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-03-30"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-03-31"
  },
  {
    "level": 1,
    "title": "1 contributions on 2026-04-01"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-04-02"
  },
  {
    "level": 2,
    "title": "3 contributions on 2026-04-03"
  },
  {
    "level": 2,
    "title": "3 contributions on 2026-04-04"
  },
  {
    "level": 1,
    "title": "2 contributions on 2026-04-05"
  },
  {
    "level": 1,
    "title": "1 contributions on 2026-04-06"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-04-07"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-04-08"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-04-09"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-04-10"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-04-11"
  },
  {
    "level": 1,
    "title": "2 contributions on 2026-04-12"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-04-13"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-04-14"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-04-15"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-04-16"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-04-17"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-04-18"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-04-19"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-04-20"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-04-21"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-04-22"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-04-23"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-04-24"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-04-25"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-04-26"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-04-27"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-04-28"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-04-29"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-04-30"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-05-01"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-05-02"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-05-03"
  },
  {
    "level": 2,
    "title": "5 contributions on 2026-05-04"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-05-05"
  },
  {
    "level": 2,
    "title": "3 contributions on 2026-05-06"
  },
  {
    "level": 1,
    "title": "1 contributions on 2026-05-07"
  },
  {
    "level": 1,
    "title": "2 contributions on 2026-05-08"
  },
  {
    "level": 1,
    "title": "2 contributions on 2026-05-09"
  },
  {
    "level": 1,
    "title": "1 contributions on 2026-05-10"
  },
  {
    "level": 1,
    "title": "1 contributions on 2026-05-11"
  },
  {
    "level": 1,
    "title": "1 contributions on 2026-05-12"
  },
  {
    "level": 1,
    "title": "1 contributions on 2026-05-13"
  },
  {
    "level": 1,
    "title": "1 contributions on 2026-05-14"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-05-15"
  },
  {
    "level": 1,
    "title": "2 contributions on 2026-05-16"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-05-17"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-05-18"
  },
  {
    "level": 1,
    "title": "1 contributions on 2026-05-19"
  },
  {
    "level": 2,
    "title": "3 contributions on 2026-05-20"
  },
  {
    "level": 1,
    "title": "1 contributions on 2026-05-21"
  },
  {
    "level": 1,
    "title": "1 contributions on 2026-05-22"
  },
  {
    "level": 1,
    "title": "1 contributions on 2026-05-23"
  },
  {
    "level": 1,
    "title": "1 contributions on 2026-05-24"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-05-25"
  },
  {
    "level": 1,
    "title": "1 contributions on 2026-05-26"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-05-27"
  },
  {
    "level": 1,
    "title": "1 contributions on 2026-05-28"
  },
  {
    "level": 3,
    "title": "6 contributions on 2026-05-29"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-05-30"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-05-31"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-06-01"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-06-02"
  },
  {
    "level": 1,
    "title": "1 contributions on 2026-06-03"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-06-04"
  },
  {
    "level": 1,
    "title": "1 contributions on 2026-06-05"
  },
  {
    "level": 1,
    "title": "1 contributions on 2026-06-06"
  },
  {
    "level": 1,
    "title": "1 contributions on 2026-06-07"
  },
  {
    "level": 1,
    "title": "2 contributions on 2026-06-08"
  },
  {
    "level": 1,
    "title": "2 contributions on 2026-06-09"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-06-10"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-06-11"
  },
  {
    "level": 1,
    "title": "2 contributions on 2026-06-12"
  },
  {
    "level": 1,
    "title": "2 contributions on 2026-06-13"
  },
  {
    "level": 1,
    "title": "1 contributions on 2026-06-14"
  },
  {
    "level": 1,
    "title": "1 contributions on 2026-06-15"
  },
  {
    "level": 2,
    "title": "4 contributions on 2026-06-16"
  },
  {
    "level": 1,
    "title": "2 contributions on 2026-06-17"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-06-18"
  },
  {
    "level": 2,
    "title": "3 contributions on 2026-06-19"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-06-20"
  },
  {
    "level": 1,
    "title": "2 contributions on 2026-06-21"
  },
  {
    "level": 2,
    "title": "4 contributions on 2026-06-22"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-06-23"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-06-24"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-06-25"
  },
  {
    "level": 1,
    "title": "2 contributions on 2026-06-26"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-06-27"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-06-28"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-06-29"
  },
  {
    "level": 1,
    "title": "2 contributions on 2026-06-30"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-07-01"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-07-02"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-07-03"
  },
  {
    "level": 3,
    "title": "6 contributions on 2026-07-04"
  },
  {
    "level": 1,
    "title": "2 contributions on 2026-07-05"
  },
  {
    "level": 2,
    "title": "3 contributions on 2026-07-06"
  },
  {
    "level": 2,
    "title": "3 contributions on 2026-07-07"
  },
  {
    "level": 2,
    "title": "3 contributions on 2026-07-08"
  },
  {
    "level": 1,
    "title": "2 contributions on 2026-07-09"
  },
  {
    "level": 1,
    "title": "2 contributions on 2026-07-10"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-07-11"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-07-12"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-07-13"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-07-14"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-07-15"
  },
  {
    "level": 1,
    "title": "2 contributions on 2026-07-16"
  },
  {
    "level": 1,
    "title": "1 contributions on 2026-07-17"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-07-18"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-07-19"
  },
  {
    "level": 1,
    "title": "1 contributions on 2026-07-20"
  },
  {
    "level": 1,
    "title": "2 contributions on 2026-07-21"
  },
  {
    "level": 1,
    "title": "2 contributions on 2026-07-22"
  },
  {
    "level": 3,
    "title": "6 contributions on 2026-07-23"
  },
  {
    "level": 2,
    "title": "5 contributions on 2026-07-24"
  },
  {
    "level": 1,
    "title": "2 contributions on 2026-07-25"
  },
  {
    "level": 3,
    "title": "7 contributions on 2026-07-26"
  },
  {
    "level": 2,
    "title": "3 contributions on 2026-07-27"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-07-28"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-07-29"
  },
  {
    "level": 2,
    "title": "5 contributions on 2026-07-30"
  },
  {
    "level": 1,
    "title": "1 contributions on 2026-07-31"
  },
  {
    "level": 1,
    "title": "1 contributions on 2026-08-01"
  },
  {
    "level": 1,
    "title": "2 contributions on 2026-08-02"
  },
  {
    "level": 2,
    "title": "4 contributions on 2026-08-03"
  },
  {
    "level": 1,
    "title": "2 contributions on 2026-08-04"
  },
  {
    "level": 2,
    "title": "5 contributions on 2026-08-05"
  },
  {
    "level": 2,
    "title": "5 contributions on 2026-08-06"
  },
  {
    "level": 4,
    "title": "9 contributions on 2026-08-07"
  },
  {
    "level": 4,
    "title": "10 contributions on 2026-08-08"
  },
  {
    "level": 3,
    "title": "6 contributions on 2026-08-09"
  },
  {
    "level": 1,
    "title": "1 contributions on 2026-08-10"
  },
  {
    "level": 2,
    "title": "4 contributions on 2026-08-11"
  },
  {
    "level": 1,
    "title": "2 contributions on 2026-08-12"
  },
  {
    "level": 1,
    "title": "2 contributions on 2026-08-13"
  },
  {
    "level": 1,
    "title": "2 contributions on 2026-08-14"
  },
  {
    "level": 1,
    "title": "1 contributions on 2026-08-15"
  },
  {
    "level": 2,
    "title": "4 contributions on 2026-08-16"
  },
  {
    "level": 2,
    "title": "5 contributions on 2026-08-17"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-08-18"
  },
  {
    "level": 2,
    "title": "4 contributions on 2026-08-19"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-08-20"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-08-21"
  },
  {
    "level": 4,
    "title": "15 contributions on 2026-08-22"
  },
  {
    "level": 2,
    "title": "5 contributions on 2026-08-23"
  },
  {
    "level": 2,
    "title": "3 contributions on 2026-08-24"
  },
  {
    "level": 2,
    "title": "4 contributions on 2026-08-25"
  },
  {
    "level": 3,
    "title": "6 contributions on 2026-08-26"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-08-27"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-08-28"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-08-29"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-08-30"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-08-31"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-09-01"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-09-02"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-09-03"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-09-04"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-09-05"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-09-06"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-09-07"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-09-08"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-09-09"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-09-10"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-09-11"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-09-12"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-09-13"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-09-14"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-09-15"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-09-16"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-09-17"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-09-18"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-09-19"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-09-20"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-09-21"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-09-22"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-09-23"
  },
  {
    "level": 1,
    "title": "1 contributions on 2026-09-24"
  },
  {
    "level": 2,
    "title": "3 contributions on 2026-09-25"
  },
  {
    "level": 4,
    "title": "10 contributions on 2026-09-26"
  },
  {
    "level": 2,
    "title": "4 contributions on 2026-09-27"
  },
  {
    "level": 3,
    "title": "7 contributions on 2026-09-28"
  },
  {
    "level": 2,
    "title": "4 contributions on 2026-09-29"
  },
  {
    "level": 1,
    "title": "1 contributions on 2026-09-30"
  },
  {
    "level": 1,
    "title": "1 contributions on 2026-10-01"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-10-02"
  },
  {
    "level": 2,
    "title": "4 contributions on 2026-10-03"
  },
  {
    "level": 1,
    "title": "2 contributions on 2026-10-04"
  },
  {
    "level": 4,
    "title": "10 contributions on 2026-10-05"
  },
  {
    "level": 2,
    "title": "5 contributions on 2026-10-06"
  },
  {
    "level": 1,
    "title": "1 contributions on 2026-10-07"
  },
  {
    "level": 2,
    "title": "3 contributions on 2026-10-08"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-10-09"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-10-10"
  },
  {
    "level": 4,
    "title": "15 contributions on 2026-10-11"
  },
  {
    "level": 1,
    "title": "1 contributions on 2026-10-12"
  },
  {
    "level": 3,
    "title": "6 contributions on 2026-10-13"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-10-14"
  },
  {
    "level": 2,
    "title": "3 contributions on 2026-10-15"
  },
  {
    "level": 2,
    "title": "3 contributions on 2026-10-16"
  },
  {
    "level": 1,
    "title": "1 contributions on 2026-10-17"
  },
  {
    "level": 2,
    "title": "3 contributions on 2026-10-18"
  },
  {
    "level": 4,
    "title": "8 contributions on 2026-10-19"
  },
  {
    "level": 4,
    "title": "10 contributions on 2026-10-20"
  },
  {
    "level": 3,
    "title": "7 contributions on 2026-10-21"
  },
  {
    "level": 3,
    "title": "6 contributions on 2026-10-22"
  },
  {
    "level": 1,
    "title": "1 contributions on 2026-10-23"
  },
  {
    "level": 2,
    "title": "4 contributions on 2026-10-24"
  },
  {
    "level": 1,
    "title": "2 contributions on 2026-10-25"
  },
  {
    "level": 2,
    "title": "4 contributions on 2026-10-26"
  },
  {
    "level": 2,
    "title": "4 contributions on 2026-10-27"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-10-28"
  },
  {
    "level": 1,
    "title": "1 contributions on 2026-10-29"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-10-30"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-10-31"
  },
  {
    "level": 2,
    "title": "3 contributions on 2026-11-01"
  },
  {
    "level": 3,
    "title": "7 contributions on 2026-11-02"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-11-03"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-11-04"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-11-05"
  },
  {
    "level": 2,
    "title": "5 contributions on 2026-11-06"
  },
  {
    "level": 2,
    "title": "5 contributions on 2026-11-07"
  },
  {
    "level": 2,
    "title": "4 contributions on 2026-11-08"
  },
  {
    "level": 1,
    "title": "2 contributions on 2026-11-09"
  },
  {
    "level": 2,
    "title": "4 contributions on 2026-11-10"
  },
  {
    "level": 4,
    "title": "14 contributions on 2026-11-11"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-11-12"
  },
  {
    "level": 1,
    "title": "2 contributions on 2026-11-13"
  },
  {
    "level": 1,
    "title": "2 contributions on 2026-11-14"
  },
  {
    "level": 2,
    "title": "3 contributions on 2026-11-15"
  },
  {
    "level": 2,
    "title": "5 contributions on 2026-11-16"
  },
  {
    "level": 0,
    "title": "0 contributions on 2026-11-17"
  },
  {
    "level": 2,
    "title": "4 contributions on 2026-11-18"
  }
];
