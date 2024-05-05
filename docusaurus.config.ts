import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Przepisy',
  tagline: 'Głodny człowiek jeść',
  url: 'https://adam-zielonka.github.io/',
  baseUrl: '/recipes/',
  organizationName: 'adam-zielonka',
  projectName: 'recipes',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'pl',
    locales: ['pl'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: "/",
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themes: [
    ["@easyops-cn/docusaurus-search-local", {
      indexBlog: false,
      docsRouteBasePath: "/",
    }]
  ],

  themeConfig: {
    navbar: {
      title: 'Przepisy',
      items: [
        {
          href: "https://github.com/adam-zielonka/recipes",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
