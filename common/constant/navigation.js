export const NAVIGATION_MENU = [
  {
    link: '/statistik',
    label: 'Statistik',
    icon: 'navigation/statistic-menu-icon',
  },
  {
    link: '/posting',
    label: 'Posting',
    icon: 'navigation/posting-menu-icon',
  },
  {
    link: '/halaman',
    label: 'Halaman',
    icon: 'navigation/page-menu-icon',
  },
  {
    link: '/media',
    label: 'Media',
    icon: 'navigation/media-menu-icon',
  },
  {
    link: '/tampilan',
    label: 'Tampilan',
    icon: 'navigation/display-menu-icon',
  },
  {
    link: '/pengaturan-umum',
    label: 'Pengaturan Umum',
    icon: 'navigation/general-settings-menu-icon',
  },
]

export const PAGE_TAB_MENU = [
  {
    label: 'Semua',
    type: 'semua',
    link: '/halaman?type=semua',
    status: '',
  },
  {
    label: 'Terbit',
    type: 'terbit',
    link: '/halaman?type=terbit',
    status: 'PUBLISHED',
  },
  {
    label: 'Draft',
    type: 'draft',
    link: '/halaman?type=draft',
    status: 'DRAFT',
  },
  {
    label: 'Diarsipkan',
    type: 'arsip',
    link: '/halaman?type=arsip',
    status: 'ARCHIVED',
  },
]

export const POST_TAB_MENU = [
  {
    label: 'Semua',
    type: 'semua',
    link: '/posting?type=semua',
    status: '',
  },
  {
    label: 'Terbit',
    type: 'terbit',
    link: '/posting?type=terbit',
    status: 'PUBLISHED',
  },
  {
    label: 'Draft',
    type: 'draft',
    link: '/posting?type=draft',
    status: 'DRAFT',
  },
  {
    label: 'Diarsipkan',
    type: 'arsip',
    link: '/posting?type=arsip',
    status: 'ARCHIVED',
  },
]
