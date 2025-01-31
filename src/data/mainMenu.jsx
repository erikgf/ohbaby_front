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
    MdAccountCircle as AccountCircleIcon,
    MdPrint as PrintIcon
} from 'react-icons/md';

const mainMenu = [
    {
        name: "Mantenimientos",
        children: [
            {
                name: "Tipo Entregas Efectivo",
                url: "/tipo-entregas",
                icon: OutboxIcon
            },
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
            {
                name: "Usuarios",
                url: "/usuarios",
                icon: AccountCircleIcon
            },
        ]
    },
    {
        name: "Gestión",
        children: [
            {
                name: "Reg. Descuentos y Adelantos",
                url: "/entregas",
                icon: TouchAppIcon
            },
            {
                name: "Asignar Horarios a Personal ",
                url: "/horarios-personal",
                icon: EventIcon
            },
            {
                name: "Asistencia Empleados ",
                url: "/asistencia-empleados",
                icon: TouchAppIcon
            }
            
            /*
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
            */
        ]
    },
    {
        name: "Reportes",
        children: [
            {
                name: "Imprimir Asistencia Manual",
                url: "/imprimir-asistencia-manual",
                icon: PrintIcon
            },
            {
                name: "Reporte de Registros de Asistencia",
                url: "/reporte-asistencias-registro",
                icon: PrintIcon
            }
        ]
    }
];

const porteroMenu = [
    {
        name: "Gestión",
        children: [
            {
                name: "Imprimir Asistencia Manual",
                url: "/imprimir-asistencia-manual",
                icon: PrintIcon
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