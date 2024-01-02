const {
  default: AppointmentReminder,
} = require("pages/appointment-reminder/AppointmentReminder");
const { Protected } = require("./protected-routes/Protected");
const { default: Calendar } = require("pages/appointment-reminder/Calendar");
const { default: Customers } = require("pages/appointment-reminder/Customers");
const {
  default: AppointmentsReports,
} = require("pages/appointment-reminder/AppointmentsReports");
const {
  default: OnlineBooking,
} = require("pages/appointment-reminder/online-booking/OnlineBooking");
const {
  default: BookingPage,
} = require("pages/appointment-reminder/online-booking/BookingPage");
const {
  default: QuestionForm,
} = require("pages/appointment-reminder/online-booking/QuestionForm");
const {
  default: EmailTemplates,
} = require("pages/appointment-reminder/online-booking/EmailTemplates");
const {
  default: Bookings,
} = require("pages/appointment-reminder/online-booking/Bookings");
const {
  default: EditEmailTemplate,
} = require("pages/appointment-reminder/online-booking/EditEmailTemplate");
const {
  default: AddBooking,
} = require("pages/appointment-reminder/online-booking/AddBooking");
const {
  default: AdvancedSettings,
} = require("pages/appointment-reminder/online-booking/AdvancedSettings");
const {
  default: Integrations,
} = require("pages/appointment-reminder/online-booking/Integrations");
const {
  default: AppointmentSettings,
} = require("pages/appointment-reminder/online-booking/AppointmentSettings");

const appointmentRoutes = [
  {
    path: "/appointment/reminder",
    component: <Protected Component={AppointmentReminder} />,
    isProtected: false,
    layout: "header",
  },
  {
    path: "/calendar",
    component: <Protected Component={Calendar} />,
    isProtected: false,
    layout: "header",
  },
  {
    path: "/customers",
    component: <Protected Component={Customers} />,
    isProtected: false,
    layout: "header",
  },
  {
    path: "/appointments/reports",
    component: <Protected Component={AppointmentsReports} />,
    isProtected: false,
    layout: "header",
  },
  {
    path: "/online/booking",
    component: <Protected Component={OnlineBooking} />,
    isProtected: false,
    layout: "header",
  },
  {
    path: "/booking/page",
    component: <Protected Component={BookingPage} />,
    isProtected: false,
    layout: "header",
  },
  {
    path: "/question/form",
    component: <Protected Component={QuestionForm} />,
    isProtected: false,
    layout: "header",
  },
  {
    path: "/email/templates",
    component: <Protected Component={EmailTemplates} />,
    isProtected: false,
    layout: "header",
  },
  {
    path: "/bookings",
    component: <Protected Component={Bookings} />,
    isProtected: false,
    layout: "header",
  },
  {
    path: "/edit/email/template/:id",
    component: <Protected Component={EditEmailTemplate} />,
    isProtected: false,
    layout: "header",
  },
  {
    path: "/add/booking",
    component: <Protected Component={AddBooking} />,
    isProtected: false,
    layout: "header",
  },
  {
    path: "/advanced/settings",
    component: <Protected Component={AdvancedSettings} />,
    isProtected: false,
    layout: "header",
  },
  {
    path: "/integrations",
    component: <Protected Component={Integrations} />,
    isProtected: false,
    layout: "header",
  },
  {
    path: "/appointment/settings",
    component: <Protected Component={AppointmentSettings} />,
    isProtected: false,
    layout: "header",
  },
];

export default appointmentRoutes;
