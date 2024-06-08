import {
    MdMap as MapIcon,
    MdStore as StoreIcon,
    MdCalendarMonth as CalendarIcon,
    MdOutlineAllInbox as OutlineAllInboxIcon,
    MdSupervisorAccount as SupervisorIcon,
    MdManageAccounts as ManageAccountsIcon,
    MdOutbox as OutboxIcon,
    MdTouchApp as TouchAppIcon,
    MdOutlineFileCopy as MdOutlineFileCopyIcon,
    MdOpenInBrowser as OpenInBrowserIcon,
    MdPinch as PinchIcon,
    MdEvent as EventIcon,
    MdAccountCircle as AccountCircleIcon
} from 'react-icons/md';

const mainMenu = [
    {
        name: "Mantenimientos",
        children: [
            {
                name: "Personal",
                url: "/personal",
                icon: ManageAccountsIcon
            },
            {
                name: "Horarios",
                url: "/horarios",
                icon: CalendarIcon
            },
        ]
    },
    {
        name: "Gestión",
        children: [
            {
                name: "Asignar Horarios a Personal ",
                url: "/horarios-personal",
                icon: TouchAppIcon
            },
            {
                name: "Registrar Asistencia Manual",
                url: "/registrar-asistencia-manual",
                icon: TouchAppIcon
            },
            {
                name: "Marcar Asistencia",
                url: "/marcar-asistencia",
                icon: TouchAppIcon,
                showNavbar : false
            },
        ]
    },
    {
        name: "Reportes",
        children: []
    }
];

const porteroMenu = [
    {
        name: "Gestión",
        children: [
            {
                name: "Marcar Asistencia",
                url: "/marcar-asistencia",
                icon: TouchAppIcon,
                showNavbar : false
            },
        ]
    },
];


export const getMenuMain = (idRol = 0) => {
    if ( idRol == 1){
        return mainMenu;
    }

    if ( idRol == 2){
        return porteroMenu;
    }

    return [];
};

export const navigationNames = (idRol = 0) => {
    const navNames = [];
    let typeMenu = getMenuMain(idRol);

    typeMenu.forEach(e => {
        e.children.forEach( m => {
            navNames.push({
                key : m.url.substring(1),
                name: m.name,
                showNavbar : m?.showNavbar ?? true
            });
        });
    });

    return navNames;
};