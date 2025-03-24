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
    to?: object;
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
        to: {name:'account'}
    },
    {
        title: 'Pedidos',
        icon: FileText,
        to: {name: 'pedidos'}
    },
    {
        title: 'Representantes',
        icon:  User,
        to: {name:'representantes'}
    },
    {
        title: 'Clientes',
        icon:   Users,
        to: {name:'clients'}
    },
   
   
];

export default sidebarItem;
