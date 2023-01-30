import PeopleIcon from '@mui/icons-material/People';
import ImageIcon from '@mui/icons-material/Image';
import PublicIcon from '@mui/icons-material/Public';
import DnsIcon from '@mui/icons-material/Dns';

export const mainNavbarItems = [{
        id: 0,
        icon: <PeopleIcon /> ,
        label: 'Authentication',
        route: 'authentication',
    },
    {
        id: 1,
        icon: <DnsIcon /> ,
        label: 'Profil',
        route: 'profil',
    },
    {
        id: 2,
        icon: <ImageIcon /> ,
        label: 'Test',
        route: 'test',
    },
    {
        id: 3,
        icon: <PublicIcon /> ,
        label: 'Discussions',
        route: 'discussion',
    },
]