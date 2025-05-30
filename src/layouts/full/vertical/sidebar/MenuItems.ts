import { uniqueId } from 'lodash';

interface MenuitemsType {
  [x: string]: any;
  id?: string;
  navlabel?: boolean;
  subheader?: string;
  title?: string;
  icon?: any;
  href?: string;
  children?: MenuitemsType[];
  chip?: string;
  chipColor?: string;
  variant?: string;
  external?: boolean;
}
import {
  IconPoint,
  IconNotebook,
  IconLayout,
  IconChartHistogram,
  IconScreenShare,
  IconPhoto,
  IconBeach,
  IconFileDescription,
  IconAlertCircle,
  IconClipboardList,
  IconZoomQuestion,
} from '@tabler/icons-react';

const Menuitems: MenuitemsType[] = [
  {
    navlabel: true,
    subheader: 'Seja Bem-Vindo(a)!',
  },
  {
    id: uniqueId(),
    title: 'Dashboard',
    icon: IconLayout,
    href: '/dashboard',
    chip: '',
    chipColor: 'secondary',
  },
  {
    id: uniqueId(),
    title: 'Manuais',
    icon: IconNotebook,
    href: '/manuais',
    chip: '',
    chipColor: 'secondary',
  },
  {
    id: uniqueId(),
    title: 'Equipamentos',
    icon: IconScreenShare,
    href: '/equipamentos/',
    children: [
      {
        id: uniqueId(),
        title: 'Novo Equipamento',
        icon: IconPoint,
        href: '/equipamentos/novo-equipamento/',
      },
      {
        id: uniqueId(),
        title: 'Listar  Equipamentos',
        icon: IconPoint,
        href: '/equipamentos/listar-equipamentos/',
      },
    ],
  },
  {
    id: uniqueId(),
    title: 'Relatórios',
    icon: IconChartHistogram,
    href: '/relatorios/',
    children: [
      {
        id: uniqueId(),
        title: 'Novo Relatório',
        icon: IconPoint,
        href: '/relatorios/novo-relatorio/',
      },
      {
        id: uniqueId(),
        title: 'Listar Relatório',
        icon: IconPoint,
        href: '/relatorios/listar-relatorio/',
      },
    ],
  },
  {
    id: uniqueId(),
    title: 'Mídia Kit',
    icon: IconPhoto,
    href: '/midia-kit/',
    children: [
      {
        id: uniqueId(),
        title: 'Formatos Disponíveis',
        icon: IconPoint,
        href: '/midia-kit/formatos-disponiveis/',
      },
      {
        id: uniqueId(),
        title: 'Home Poder360',
        icon: IconPoint,
        href: '/midia-kit/home-poder360/',
      },
    ],
  },
  {
    id: uniqueId(),
    title: 'Férias',
    icon: IconBeach,
    href: '/ferias/',
    children: [
      {
        id: uniqueId(),
        title: 'Solicitar Férias',
        icon: IconPoint,
        href: '/ferias/solicitar-ferias/',
      },
      {
        id: uniqueId(),
        title: 'Listar Solicitações',
        icon: IconPoint,
        href: '/ferias/listar-solicitacoes/',
      },
    ],
  },
  {
    id: uniqueId(),
    title: 'Notícias Investing',
    icon: IconFileDescription,
    href: '/noticias-investing',
    chip: '',
    chipColor: 'secondary',
  },
  {
    id: uniqueId(),
    title: 'Avisos',
    icon: IconAlertCircle,
    href: '/avisos',
    chip: '',
    chipColor: 'secondary',
  },
  {
    id: uniqueId(),
    title: 'Orientações',
    icon: IconClipboardList,
    href: '/orientacoes',
    chip: '',
    chipColor: 'secondary',
  },
  {
    id: uniqueId(),
    title: 'Quiz',
    icon: IconZoomQuestion,
    href: '/quiz',
    chip: '',
    chipColor: 'secondary',
  },
];

export default Menuitems;
