import HomeIcon from '@mui/icons-material/Home';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PhoneIcon from '@mui/icons-material/Phone';
import RoofingIcon from '@mui/icons-material/Roofing';
import BusinessIcon from '@mui/icons-material/Business';

export const Navigation = [
    {title: 'Home', href:'/', icon: <HomeIcon />, items: null},
    {title: 'Services', href: null, icon: <MiscellaneousServicesIcon />, items: [
        {title: 'Residential Services', href:'/services/residential', icon: <RoofingIcon />, items: null},
        {title: 'Commercial Services', href:'/services/commercial', icon: <BusinessIcon />, items: null},
    ]},
    {title: 'Company', href:'/company', icon: <PeopleAltIcon />, items: null},
    {title: 'Contact', href:'/contact', icon: <PhoneIcon />, items: null}
];