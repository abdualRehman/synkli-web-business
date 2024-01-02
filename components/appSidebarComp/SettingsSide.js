import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { AppointmentIcon } from "utills/svgs/AppointmentIcon";
import { BellIcon } from "utills/svgs/BellIcon";
import { DoubleSettingsIcon } from "utills/svgs/DoubleSettingsIcon";
import { MessageIcon } from "utills/svgs/MessageIcon";
import { PaymentIcon } from "utills/svgs/PaymentIcon";
import { Resources } from "utills/svgs/Resources";
import { RolesIcon } from "utills/svgs/RolesIcon";
import { ShieldIcon } from "utills/svgs/ShieldIcon";
import { SimIcon } from "utills/svgs/SimIcon";
import { StripeConnect } from "utills/svgs/StripeConnect";
import { TeamIcon } from "utills/svgs/TeamIcon";
import { ThemesIcon } from "utills/svgs/ThemesIcon";
const SettingsSide = ({ hideSettings }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ x: "-80", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.2, type: "tween", duration: 0.4 }}
      onMouseLeave={hideSettings}
      className="clients setting-side pt-10"
    >
      <div className="setting-side-wrap mx-1">
        <div className="mx-2 flex  items-center gap-3 text-black p-2 rounded-md settings-card-item">
          <div>
            <AppointmentIcon />
          </div>
          <div>Appointment</div>
        </div>

        <div>
          <div
            onClick={() => navigate("/app/users")}
            className=" mx-2 mt-1 flex gap-3  p-2 rounded-md settings-card-item "
          >
            <div>
              <svg
                width="20"
                height="19"
                viewBox="0 0 20 19"
                xmlns="http://www.w3.org/2000/svg"
                className="hover:fill-white"
              >
                <path d="M6.59795 0C4.36373 0 2.5507 1.85179 2.5507 4.13842C2.5507 6.42506 4.36373 8.27685 6.59795 8.27685C8.83216 8.27685 10.6452 6.42506 10.6452 4.13842C10.6452 1.85179 8.83216 0 6.59795 0ZM3.84011 4.13842C3.84011 2.58289 5.07394 1.32022 6.59795 1.32022C8.12195 1.32022 9.35579 2.58289 9.35579 4.13842C9.35579 5.69395 8.12195 6.95663 6.59795 6.95663C5.07394 6.95663 3.84011 5.69395 3.84011 4.13842ZM15.1026 1.73881C13.3385 1.73881 11.9065 3.20102 11.9065 5.00712C11.9065 6.81323 13.3385 8.27544 15.1026 8.27544C16.8667 8.27544 18.2987 6.81323 18.2987 5.00712C18.2987 3.20102 16.8667 1.73881 15.1026 1.73881ZM13.1959 5.00712C13.1959 3.93211 14.0487 3.05902 15.1026 3.05902C16.1565 3.05902 17.0093 3.93211 17.0093 5.00712C17.0093 6.08214 16.1565 6.95522 15.1026 6.95522C14.0487 6.95522 13.1959 6.08214 13.1959 5.00712ZM17.6478 10.4328L13.5986 10.4322L13.7743 10.682C13.9795 10.9737 14.1441 11.2975 14.2595 11.6445L14.2956 11.753L17.6478 11.753C18.232 11.753 18.7041 12.2368 18.7041 12.8317L18.7039 13.7854L18.7043 13.7934C18.7267 14.2392 18.6644 14.6417 18.4987 14.9933C18.331 15.3491 18.0636 15.6394 17.6979 15.8664C16.9762 16.3143 15.8662 16.5187 14.3399 16.5187H14.3356L14.0922 16.5157L14.0505 16.6133C13.9036 16.9573 13.7183 17.2751 13.4959 17.5666L13.3134 17.8058L13.6141 17.821C13.8484 17.8329 14.0904 17.8389 14.3399 17.8389C16.2643 17.8389 17.7173 17.4821 18.6651 16.801C19.5985 16.1303 20.066 15.128 19.9925 13.7588L19.9922 13.7529L19.9935 12.8317C19.9935 11.5058 18.9422 10.4328 17.6478 10.4328ZM2.34563 10.4328C1.05123 10.4328 0 11.5058 0 12.8317V14.1786C0 15.6984 0.584605 16.8154 1.69317 17.5626C2.81527 18.3189 4.49461 18.7097 6.70033 18.7097C8.91377 18.7097 10.5814 18.3135 11.6688 17.5512C12.7408 16.7997 13.2717 15.6766 13.1877 14.1446L13.1874 14.1387L13.1887 12.8317C13.1885 11.506 12.1374 10.4328 10.8431 10.4328H2.34563ZM13.649 10.5929C13.6222 10.5581 13.5949 10.5237 13.567 10.4899L13.322 10.6916C13.3475 10.7225 13.3725 10.7538 13.3969 10.7857L13.649 10.5929ZM1.28941 12.8317C1.28941 12.2368 1.7615 11.753 2.34563 11.753H10.8431C11.4272 11.753 11.8993 12.2368 11.8993 12.8317L11.8991 14.1718L11.8995 14.18C11.9268 14.7062 11.8505 15.1791 11.6521 15.5912C11.4518 16.0072 11.1334 16.3476 10.6988 16.6147C9.83875 17.1433 8.51599 17.3895 6.70033 17.3895C4.87582 17.3895 3.52995 17.1371 2.63431 16.6076C2.18276 16.3406 1.84358 16.0019 1.61857 15.5898C1.39388 15.1783 1.28941 14.7052 1.28941 14.1786V12.8317Z" />
              </svg>
            </div>
            <div>Clients</div>
          </div>
        </div>

        <div className="">
          <div
            onClick={() => navigate("/team")}
            className="mx-2 white-svgs  items-center flex gap-3 mt-1 cursor-pointer p-2 rounded-md settings-card-item "
          >
            <div>
              <TeamIcon />
            </div>
            <div>Team</div>
          </div>
        </div>

        <div>
          <div
            onClick={() => navigate("/team/rolemanagement")}
            className="white-svgs  mx-2 items-center flex gap-3 mt-1 p-2 rounded-md settings-card-item "
          >
            <div>
              <RolesIcon />
            </div>
            <div>Role Management</div>
          </div>
        </div>

        {/* <div>
          <div className="white-svgs  mx-2 items-center flex gap-3 mt-1 p-2 rounded-md settings-card-item ">
            <div>
              <ThemesIcon />
            </div>
            <div>Themes Customization</div>
          </div>
        </div> */}
        <div>
          <div className=" mx-2 items-center flex gap-3 mt-1 p-2 rounded-md settings-card-item ">
            <div>
              <svg
                width="19"
                height="19"
                viewBox="0 0 19 19"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.1739 1.77277L13.2031 1.7435C13.37 1.57617 13.5964 1.48211 13.8326 1.48211C14.0687 1.48211 14.2951 1.57616 14.462 1.74349C14.462 1.74349 14.462 1.7435 14.462 1.7435L17.2609 4.54857C17.3438 4.63148 17.4095 4.72996 17.4544 4.83836C17.4992 4.94675 17.5223 5.06295 17.5223 5.1803C17.5223 5.29764 17.4992 5.41384 17.4544 5.52224C17.4095 5.6306 17.3438 5.72905 17.261 5.81194C17.2609 5.81197 17.2609 5.812 17.2609 5.81203M13.1739 1.77277L17.1901 5.74133L17.2609 5.81203M13.1739 1.77277V1.77437L10.4057 4.55024L10.4057 4.55025C10.2389 4.71762 10.1452 4.94454 10.1452 5.18109C10.1452 5.41764 10.2389 5.64455 10.4057 5.81193L10.4057 5.81194L13.203 8.61699M13.1739 1.77277L13.203 8.61699M17.2609 5.81203L14.4637 8.61699M17.2609 5.81203L14.4637 8.61699M14.4637 8.61699C14.381 8.70012 14.2828 8.76608 14.1746 8.81109C14.0665 8.8561 13.9505 8.87927 13.8333 8.87927C13.7162 8.87927 13.6002 8.8561 13.4921 8.81109C13.3839 8.76609 13.2857 8.70016 13.2031 8.61708M14.4637 8.61699L13.2031 8.61708M13.2031 8.61708L13.203 8.61699M13.2031 8.61708L13.203 8.61699M1.48515 16.6227C1.48494 16.7393 1.50765 16.8549 1.55201 16.9627C1.59638 17.0706 1.66154 17.1687 1.74377 17.2513C1.826 17.3339 1.9237 17.3995 2.03126 17.4442C2.13883 17.489 2.25415 17.512 2.37062 17.512H7.90206H8.00206V17.412V11.0759V10.9759H7.90206H1.58515H1.48515V11.0759V16.6227ZM1.48515 16.6227C1.48515 16.6226 1.48515 16.6226 1.48515 16.6226L1.58515 16.6228H1.48515V16.6227ZM15.4378 0.765889L15.6086 0.936918V0.935546L18.2351 3.5694C18.6608 3.99642 18.9 4.57557 18.9 5.1795C18.9 5.78344 18.6608 6.36259 18.2351 6.78961L18.235 6.78967L15.5404 9.49655L15.4174 9.62018L15.5862 9.66391C16.0735 9.79007 16.5052 10.075 16.8135 10.474C17.1218 10.873 17.2892 11.3635 17.2893 11.8683V16.6228C17.2893 17.2268 17.05 17.8061 16.6241 18.2331C16.1983 18.6601 15.6208 18.9 15.0187 18.9H2.37536C1.89241 18.9 1.44297 18.7482 1.07522 18.4902L1.07491 18.49C0.486019 18.0801 0.1 17.394 0.1 16.6196V3.94413C0.1 3.34008 0.339293 2.76082 0.765147 2.33378C1.19099 1.90674 1.7685 1.66689 2.37062 1.66689H7.11183C7.11184 1.66689 7.11185 1.66689 7.11186 1.66689C7.6284 1.66702 8.1295 1.84379 8.53241 2.16807C8.93533 2.49236 9.21598 2.94478 9.32794 3.45067L9.36736 3.62877L9.49631 3.49976L12.2288 0.765927L12.2289 0.765889C12.6546 0.339467 13.2317 0.1 13.8333 0.1C14.435 0.1 15.0121 0.339467 15.4378 0.765889ZM9.38406 9.49103V9.59103H9.48405H11.938H11.9795H11.9811V9.49103V9.48946L12.0504 9.42044L9.55489 6.91641L9.38406 6.74499V6.987V9.49103ZM7.90206 9.59103H8.00206V9.49103V3.94413C8.00206 3.70754 7.90834 3.48058 7.74143 3.3132C7.5745 3.14581 7.34804 3.05172 7.11186 3.05172H2.37062C2.13443 3.05172 1.90797 3.14581 1.74105 3.3132C1.57413 3.48058 1.48041 3.70754 1.48041 3.94413V9.49103V9.59103H1.58041H7.90206ZM9.48247 10.9759H9.38247V11.0759V17.4152V17.5152H9.48247H15.0187C15.2548 17.5152 15.4813 17.4211 15.6482 17.2537C15.8151 17.0863 15.9089 16.8594 15.9089 16.6228V11.8683C15.9089 11.6317 15.8151 11.4047 15.6482 11.2373C15.4813 11.0699 15.2548 10.9759 15.0187 10.9759H9.48247Z"
                  stroke-width="0.2"
                />
              </svg>
            </div>
            <div>App Setup</div>
          </div>
        </div>

        {/* <div>
          <div className=" mx-2 items-center flex gap-3 mt-1 p-2 rounded-md settings-card-item ">
            <div>
              <StripeConnect />
            </div>
            <div>Stripe Connect</div>
          </div>
        </div> */}

        <div>
          <div
            onClick={() => navigate("/tasks")}
            className="mx-2 items-center  mt-1 flex gap-3 p-2 rounded-md settings-card-item  "
          >
            <div>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10.5473 6.98963C10.5473 6.77188 10.6338 6.56305 10.7877 6.40908C10.9417 6.25511 11.1505 6.16861 11.3683 6.16861H15.1997C15.4174 6.16861 15.6263 6.25511 15.7802 6.40908C15.9342 6.56305 16.0207 6.77188 16.0207 6.98963C16.0207 7.20737 15.9342 7.4162 15.7802 7.57017C15.6263 7.72414 15.4174 7.81064 15.1997 7.81064H11.3683C11.1505 7.81064 10.9417 7.72414 10.7877 7.57017C10.6338 7.4162 10.5473 7.20737 10.5473 6.98963ZM11.3683 12.1894C11.1505 12.1894 10.9417 12.2759 10.7877 12.4299C10.6338 12.5838 10.5473 12.7927 10.5473 13.0104C10.5473 13.2282 10.6338 13.437 10.7877 13.591C10.9417 13.7449 11.1505 13.8314 11.3683 13.8314H15.1997C15.4174 13.8314 15.6263 13.7449 15.7802 13.591C15.9342 13.437 16.0207 13.2282 16.0207 13.0104C16.0207 12.7927 15.9342 12.5838 15.7802 12.4299C15.6263 12.2759 15.4174 12.1894 15.1997 12.1894H11.3683ZM8.66438 6.47512C8.74505 6.39996 8.80974 6.30932 8.85462 6.20861C8.89949 6.10789 8.92362 5.99918 8.92557 5.88894C8.92751 5.7787 8.90723 5.6692 8.86594 5.56697C8.82465 5.46474 8.76319 5.37187 8.68522 5.29391C8.60726 5.21594 8.51439 5.15448 8.41216 5.11319C8.30993 5.0719 8.20043 5.05162 8.09019 5.05356C7.97995 5.05551 7.87124 5.07964 7.77053 5.12451C7.66981 5.16939 7.57917 5.23408 7.50401 5.31475L5.89481 6.92394L5.38031 6.40944C5.22467 6.26441 5.01882 6.18546 4.80612 6.18921C4.59342 6.19297 4.39048 6.27913 4.24006 6.42956C4.08963 6.57998 4.00347 6.78292 3.99971 6.99562C3.99596 7.20832 4.07491 7.41417 4.21994 7.56981L5.31463 8.6645C5.46857 8.81825 5.67724 8.90461 5.89481 8.90461C6.11238 8.90461 6.32106 8.81825 6.475 8.6645L8.66438 6.47512ZM8.66438 11.3355C8.81813 11.4895 8.90449 11.6982 8.90449 11.9157C8.90449 12.1333 8.81813 12.342 8.66438 12.4959L6.475 14.6853C6.32106 14.8391 6.11238 14.9254 5.89481 14.9254C5.67724 14.9254 5.46857 14.8391 5.31463 14.6853L4.21994 13.5906C4.13927 13.5154 4.07457 13.4248 4.0297 13.3241C3.98483 13.2234 3.9607 13.1147 3.95875 13.0044C3.95681 12.8942 3.97709 12.7847 4.01838 12.6825C4.05967 12.5802 4.12113 12.4874 4.1991 12.4094C4.27706 12.3314 4.36993 12.27 4.47216 12.2287C4.57439 12.1874 4.68389 12.1671 4.79413 12.1691C4.90437 12.171 5.01308 12.1951 5.11379 12.24C5.21451 12.2849 5.30515 12.3496 5.38031 12.4302L5.89481 12.9447L7.50401 11.3355C7.65795 11.1818 7.86663 11.0954 8.0842 11.0954C8.30177 11.0954 8.51044 11.1818 8.66438 11.3355ZM3.70543 0.147807C2.76186 0.147807 1.85693 0.52264 1.18973 1.18985C0.52252 1.85705 0.147687 2.76198 0.147687 3.70555V16.2945C0.147687 17.2381 0.52252 18.143 1.18973 18.8102C1.85693 19.4774 2.76186 19.8522 3.70543 19.8522H16.2944C17.238 19.8522 18.1429 19.4774 18.8101 18.8102C19.4773 18.143 19.8521 17.2381 19.8521 16.2945V3.70555C19.8521 2.76198 19.4773 1.85705 18.8101 1.18985C18.1429 0.52264 17.238 0.147807 16.2944 0.147807H3.70543ZM1.78972 3.70555C1.78972 2.64808 2.64796 1.78984 3.70543 1.78984H16.2944C17.3519 1.78984 18.2101 2.64808 18.2101 3.70555V16.2945C18.2101 16.8026 18.0083 17.2898 17.649 17.6491C17.2897 18.0084 16.8025 18.2102 16.2944 18.2102H3.70543C3.19735 18.2102 2.71009 18.0084 2.35082 17.6491C1.99156 17.2898 1.78972 16.8026 1.78972 16.2945V3.70555Z" />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M1.08532 1.08532C1.78025 0.390403 2.72276 0 3.70553 0H16.2945C17.2772 0 18.2198 0.390403 18.9147 1.08532C19.6096 1.78025 20 2.72276 20 3.70553V16.2945C20 17.2772 19.6096 18.2198 18.9147 18.9147C18.2198 19.6096 17.2772 20 16.2945 20H3.70553C2.72276 20 1.78025 19.6096 1.08532 18.9147C0.390403 18.2198 0 17.2772 0 16.2945V3.70553C0 2.72276 0.390403 1.78025 1.08532 1.08532ZM3.70553 0.295567C2.80115 0.295567 1.93381 0.654829 1.29432 1.29432C0.654829 1.93381 0.295567 2.80115 0.295567 3.70553V16.2945C0.295567 17.1989 0.654829 18.0662 1.29432 18.7057C1.93381 19.3452 2.80115 19.7044 3.70553 19.7044H16.2945C17.1989 19.7044 18.0662 19.3452 18.7057 18.7057C19.3452 18.0662 19.7044 17.1989 19.7044 16.2945V3.70553C19.7044 2.80115 19.3452 1.93381 18.7057 1.29432C18.0662 0.654829 17.1989 0.295567 16.2945 0.295567H3.70553ZM8.35691 5.25019C8.27308 5.21633 8.18329 5.19971 8.0929 5.2013C8.0025 5.2029 7.91335 5.22268 7.83077 5.25948C7.74819 5.29627 7.67386 5.34933 7.61223 5.41547L7.60867 5.41929L5.89491 7.13292L5.27784 6.51585C5.15044 6.398 4.98241 6.33389 4.80882 6.33695C4.63441 6.34003 4.468 6.41068 4.34465 6.53403C4.2213 6.65738 4.15065 6.82379 4.14757 6.9982C4.14451 7.17179 4.20862 7.33981 4.32646 7.46722L5.41916 8.55991M8.35691 5.25019C8.44074 5.28405 8.51689 5.33445 8.58082 5.39838L8.35691 5.25019ZM8.58082 5.39838C8.64475 5.46231 8.69515 5.53846 8.72901 5.62229L8.58082 5.39838ZM8.72901 5.62229C8.76287 5.70612 8.7795 5.79591 8.7779 5.88631L8.72901 5.62229ZM8.7779 5.88631C8.77631 5.9767 8.75652 6.06585 8.71972 6.14843L8.7779 5.88631ZM11.3684 6.31637C11.1898 6.31637 11.0186 6.3873 10.8923 6.51355C10.7661 6.63981 10.6951 6.81105 10.6951 6.9896C10.6951 7.16815 10.7661 7.33939 10.8923 7.46565C11.0186 7.59191 11.1898 7.66284 11.3684 7.66284H15.1998C15.3783 7.66284 15.5496 7.59191 15.6758 7.46565C15.8021 7.33939 15.873 7.16815 15.873 6.9896C15.873 6.81105 15.8021 6.63981 15.6758 6.51355C15.5496 6.3873 15.3783 6.31637 15.1998 6.31637H11.3684ZM8.71972 6.14843C8.68293 6.23102 8.62988 6.30534 8.56373 6.36698L8.71972 6.14843ZM8.56373 6.36698L8.55998 6.3706L8.56373 6.36698ZM8.55998 6.3706L6.37066 8.55991L8.55998 6.3706ZM8.08429 11.2432C7.90588 11.2432 7.73477 11.314 7.60854 11.4401L5.89491 13.1537L5.27222 12.531C5.21058 12.4649 5.13633 12.4118 5.05374 12.375C4.97116 12.3382 4.88201 12.3184 4.79162 12.3168C4.70122 12.3152 4.61143 12.3318 4.5276 12.3657C4.44377 12.3995 4.36762 12.4499 4.30369 12.5139C4.23976 12.5778 4.18936 12.654 4.1555 12.7378C4.12164 12.8216 4.10501 12.9114 4.10661 13.0018C4.1082 13.0922 4.12799 13.1813 4.16479 13.2639C4.20158 13.3465 4.25464 13.4208 4.32078 13.4825L4.3246 13.486L5.41916 14.5807M8.08429 11.2432C8.2627 11.2432 8.43381 11.314 8.56004 11.4401L8.08429 11.2432ZM8.56004 11.4401L8.66438 11.3355L8.56004 11.4401ZM8.7568 11.9157C8.7568 11.7373 8.68612 11.5663 8.56004 11.4401L8.66438 11.3355M8.7568 11.9157C8.7568 12.0941 8.68599 12.2652 8.55991 12.3915L8.7568 11.9157ZM8.55991 12.3915L6.37066 14.5807L8.55991 12.3915ZM11.3684 12.3372C11.1898 12.3372 11.0186 12.4081 10.8923 12.5344C10.7661 12.6606 10.6951 12.8318 10.6951 13.0104C10.6951 13.189 10.7661 13.3602 10.8923 13.4865C11.0186 13.6127 11.1898 13.6836 11.3684 13.6836H15.1998C15.3783 13.6836 15.5496 13.6127 15.6758 13.4865C15.8021 13.3602 15.873 13.189 15.873 13.0104C15.873 12.8318 15.8021 12.6606 15.6758 12.5344C15.5496 12.4081 15.3783 12.3372 15.1998 12.3372H11.3684Z"
                />
              </svg>
            </div>
            <div>Task Module</div>
          </div>
        </div>

        <div>
          <div className="mx-2 p-2 rounded-md settings-card-item items-center  flex gap-3 mt-1">
            <div>
              <PaymentIcon />
            </div>
            <div>Payments</div>
          </div>
        </div>

        <div onClick={() => navigate("/trainings")}>
          <div className="mx-2 p-2 rounded-md settings-card-item items-center flex gap-3 mt-1 cursor-pointer">
            <div>
              <Resources />
            </div>
            <div>Training & Resources</div>
          </div>
        </div>
        <div>
          <div className="white-svgs   items-center mx-2 flex gap-3 mt-1 p-2 rounded-md settings-card-item">
            <div>
              <BellIcon />
            </div>
            <div>Notifications</div>
          </div>
        </div>
        <div>
          <div className="  items-center mx-2 p-2 rounded-md settings-card-item flex gap-3 mt-1">
            <div>
              <ShieldIcon />
            </div>
            <div>Security</div>
          </div>
        </div>
        <div>
          <div className="white-svgs   items-center mx-2  p-2 rounded-md settings-card-item  flex gap-3 ">
            <div>
              <SimIcon />
            </div>
            <div>Subscription</div>
          </div>
        </div>

        <div>
          <div
            onClick={() => navigate("/organizational/settings")}
            className="white-svgs   items-center mx-2   gap-3 mt-1 p-2 rounded-md settings-card-item flex"
          >
            <div>
              <DoubleSettingsIcon />
            </div>
            <div>Organizational Settings</div>
          </div>
        </div>

        <div>
          <div className="items-center mx-2 flex gap-3 mt-1 p-2 rounded-md settings-card-item ">
            <div>
              <MessageIcon />
            </div>
            <div>FAQs</div>
          </div>
        </div>

        <div>
          <div className="mx-2  items-center flex gap-3 mt-1 p-2 rounded-md settings-card-item ">
            <div>
              <svg
                width="24"
                height="22"
                viewBox="0 0 24 22"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 1C11.9 1 15 4.1 15 8C15 10.4 13.8 12.5 12 13.7V16C12 16.6 11.6 17 11 17H5C4.4 17 4 16.6 4 16V13.7C2.2 12.5 1 10.4 1 8C1 4.1 4.1 1 8 1ZM5 20V19H11V20C11 20.6 10.6 21 10 21H6C5.4 21 5 20.6 5 20ZM8 3C5.2 3 3 5.2 3 8C3 10.1 4.2 11.8 6 12.6V15H10V12.6C11.8 11.8 13 10.1 13 8C13 5.2 10.8 3 8 3ZM20.5 13.5V15H19V13.5H20.5ZM18.5 8.5H17V8C17 6.3 18.3 5 20 5C21.7 5 23 6.3 23 8C23 9 22.5 9.9 21.7 10.4L21.4 10.6C20.8 11 20.5 11.6 20.5 12.3V12.5H19V12.3C19 11.1 19.6 10 20.6 9.4L20.9 9.2C21.3 8.9 21.5 8.5 21.5 8C21.5 7.2 20.8 6.5 20 6.5C19.2 6.5 18.5 7.2 18.5 8V8.5Z"
                  stroke="#B695F8"
                  stroke-width="0.7"
                />
              </svg>
            </div>
            <div>Help & Support</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
export default SettingsSide;
