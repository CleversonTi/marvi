import {
    ApertureIcon,
    CopyIcon,
    LayoutDashboardIcon, LoginIcon, MoodHappyIcon, TypographyIcon, UserPlusIcon
} from 'vue-tabler-icons';

import {
     HouseIcon,
     FileText,
     User,
     Users
} from 'lucide-vue-next';

export interface menu {
    header?: string;
    title?: string;
    icon?: any;
    to?: string;
    chip?: string;
    chipColor?: string;
    chipVariant?: string;
    chipIcon?: string;
    children?: menu[];
    disabled?: boolean;
    type?: string;
    subCaption?: string;
}

const sidebarItem: menu[] = [
    
    
    {
        title: 'Minha Conta',
        icon: HouseIcon ,
        to: '/ui/typography'
    },
    {
        title: 'Pedidos',
        icon: FileText,
        to: '/ui/shadow'
    },
    {
        title: 'Representantes',
        icon:  User,
        to: '/ui/shadow'
    },
    {
        title: 'Clientes',
        icon:   Users,
        to: '/ui/shadow'
    },
   
   
];

export default sidebarItem;
