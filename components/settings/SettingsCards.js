import React from "react";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import "./css/settings.css";
import { CalenderIcon } from "utills/svgs/CalenderIcon";
import { TailArrowRight } from "utills/svgs/TailArrowRight";
import { ClientsSvg } from "utills/svgs/ClientsSvg";
import { RolsSvg } from "utills/svgs/RolsSvg";
import { MultipleUsers } from "utills/svgs/MultipleUsers";
import { MultipleUsersSvg } from "utills/svgs/MultipleUsersSvg";
import { StripeIcon } from "utills/svgs/StripeIcon";
import { TaskIcon } from "utills/svgs/TaskIcon";
import { FormsIcon } from "utills/svgs/FormsIcon";
import { ReportsBar } from "utills/svgs/ReportsBar";
import { ThemesIcon } from "utills/svgs/ThemesIcon";
import { TandCIcon } from "utills/svgs/TandCIcon";
import { PrivacyPolicy } from "utills/svgs/PrivacyPolicy";
import { useNavigate } from "react-router-dom";

import { ERROR_TYPE_ERROR } from "utills/globalVars";
import { useSelector } from "react-redux";
import { toastHandler } from "responseHanlder";
import { useState } from "react";
import { useEffect } from "react";

export const SettingsCards = ({ toggleAddedForms }) => {
  const navigate = useNavigate();
  // const { allPermissions } = useSelector((state) => state.global);
  const allPermissions = JSON.parse(localStorage.getItem("allPermissions"));
  const { data: loginData } = useSelector((state) => state.login);
  const [showIndicators, setShowIndicators] = useState(true);
  const { data: authPermissions } = useSelector(
    (state) => state.authPermissions
  );

  const { data: login } = useSelector((state) => state.login);

  // const { data: auth } = useSelector((state) => state.authPermissions);
  // const { data: total } = useSelector((state) => state.totalPermissions);

  // const { data } = useSelector((state) => state.login);

  // const allowedPermissions = ["read", "write", "admin"];
  const handleAddedForms = () => {
    if (
      !loginData?.is_employee ||
      allPermissions?.Forms?.admin ||
      allPermissions?.Forms?.read ||
      allPermissions?.Forms?.write
    ) {
      toggleAddedForms();
    } else {
      toastHandler(
        "You dont have permission to view this page",
        ERROR_TYPE_ERROR
      );
    }
  };

  // const [myPermission, setMyPermissions] = useState({});

  // useEffect(() => {
  //   if (auth && total) {
  //     // console.log(
  //     //   total[auth.permissions.Settings[0]]
  //     //  );
  //     const tmp4 = {};
  //     Object.keys(auth.permissions).forEach((module) => {
  //       console.log({ module });
  //       const tmp1 = auth.permissions[module].map(
  //         (p) => total[p.toLowerCase()]
  //       );

  //       const tmp3 = {};
  //       Object.keys(total).map((p) => {
  //         // [ádmin, write, read]

  //         tmp3[p] = tmp1.some((p2) => p2[p]);
  //       });

  //       tmp4[module] = tmp3;
  //     });
  //     setMyPermissions(tmp4);
  //   }
  // }, [auth, total]);
  // console.log({ myPermission }, "Line 54");
  const handleRolsManagement = () => {
    console.log(allPermissions, "permissions");

    if (
      !loginData?.is_employee ||
      allPermissions?.Role_management?.admin ||
      allPermissions?.Role_management?.read ||
      allPermissions?.Role_management?.write
    ) {
      navigate("/team/rolemanagement");
    } else {
      toastHandler(
        "You dont have permission to view this page",
        ERROR_TYPE_ERROR
      );
    }
  };

  const handleTasks = () => {
    navigate("/tasks");
  };
  const handleViewTeam = () => {
    if (
      !loginData?.is_employee ||
      allPermissions?.Team?.admin ||
      allPermissions?.Team?.read ||
      allPermissions?.Team?.write
    ) {
      navigate("/team");
    } else {
      toastHandler(
        "You dont have permission to view this page",
        ERROR_TYPE_ERROR
      );
    }

    // if (loginData?.is_employee) {
    //   if (!allPermissions?.Team?.admin) {
    //     toastHandler(
    //       "You dont have permission to view this page",
    //       ERROR_TYPE_ERROR
    //     );
    //     return;
    //   }
    // }

    // navigate("/team");
  };

  const appUsersHandler = () => {
    // if(loginData?.is_employee) {
    //    if(!allPermissions?.Clients?.read) {
    //       toastHandler("You dont have permission to view this page", ERROR_TYPE_ERROR)
    //       return
    //    }
    // }

    navigate("/app/users");
  };

  const handleTasksNavigation = () => {
    navigate("/tasks");
  };
  useEffect(() => {
    const driverObj = driver({
      showProgress: true,
      steps: [
        {
          element: ".clients-indicate",

          popover: {
            title: "Client",
            description:
              "In this section you can view your clients details. You can view there submited forms",
            popoverClass: "my-custom-popover-class ",
          },
        },
        {
          element: ".rols-indicate",

          popover: {
            title: "Role management",
            description:
              "In this section you can create role groups. You can add permissions to modules and assigne those modules to a particuler employee.",
            popoverClass: "my-custom-popover-class ",
          },
        },
        {
          element: ".team-indicate",

          popover: {
            title: "Teams",
            description:
              "In this section you can invite your employees assign them role groups.",
            popoverClass: "my-custom-popover-class ",
          },
        },
        {
          element: ".forms-indicate",

          popover: {
            title: "Forms",
            description:
              "In this section you can create custom forms save them as draft or publish them for your clients",
            popoverClass: "my-custom-popover-class ",
          },
        },
      ],
    });

    if (!login?.second_time_login && showIndicators) {
      driverObj.drive();
    } else {
      driverObj.destroy();
    }

    return () => {
      driverObj.destroy();
      setShowIndicators(false);
    };
  }, []); // Empty dependency array to run the effect only once

  return (
    <div className="mx-10 mt-5">
      <div className="grid md:grid-cols-4 add-ann-form  grid-cols-2 gap-5 ">
        <div className="settings-card p-3">
          <div className="flex justify-end items-start">
            <TailArrowRight />
          </div>
          <div className="">
            <CalenderIcon />
          </div>

          <div className="mt-2">
            <label>Appointment</label>
          </div>
        </div>

        <div
          className="settings-card clients-indicate p-3 shadow-lg cursor-pointer"
          onClick={appUsersHandler}
        >
          <div className="flex justify-end items-start">
            <TailArrowRight />
          </div>
          <div className="">
            <ClientsSvg />
          </div>

          <div className="mt-2">
            <label>Clients</label>
          </div>
        </div>

        <div
          className="settings-card p-3 rols-indicate  cursor-pointer"
          onClick={handleRolsManagement}
        >
          <div className="flex justify-end items-start">
            <TailArrowRight />
          </div>
          <div className="">
            <RolsSvg />
          </div>

          <div className="mt-2">
            <label>Role Management</label>
          </div>
        </div>

        <div
          className="settings-card p-3 team-indicate cursor-pointer"
          onClick={handleViewTeam}
        >
          <div className="flex justify-end items-start">
            <TailArrowRight />
          </div>
          <div>
            <MultipleUsersSvg />
          </div>

          <div className="mt-2">
            <label>Teams</label>
          </div>
        </div>

        <div className="settings-card p-3 ">
          <div className="flex justify-end items-start">
            <TailArrowRight />
          </div>
          <div>
            <StripeIcon />
          </div>

          <div className="mt-2">
            <label>Stripe Connect</label>
          </div>
        </div>

        <div onClick={handleTasks} className="settings-card p-3">
          <div className="flex justify-end items-start">
            <TailArrowRight />
          </div>
          <div>
            <TaskIcon />
          </div>

          <div className="mt-2 cursor-pointer">
            <label>Task Module</label>
          </div>
        </div>

        <div
          className="settings-card p-3 forms-indicate cursor-pointer "
          onClick={handleAddedForms}
        >
          <div className="flex justify-end items-start">
            <TailArrowRight />
          </div>
          <div>
            <FormsIcon />
          </div>

          <div className="mt-2">
            <label>Customised Forms</label>
          </div>
        </div>

        <div className="settings-card p-3">
          <div className="flex justify-end items-start">
            <TailArrowRight />
          </div>
          <div>
            <ReportsBar />
          </div>

          <div className="mt-2">
            <label>Reports</label>
          </div>
        </div>

        <div className="settings-card p-3 ">
          <div className="flex justify-end items-start">
            <TailArrowRight />
          </div>
          <div>
            <ThemesIcon />
          </div>

          <div className="mt-2">
            <label>Theme Customisation</label>
          </div>
        </div>

        <div className="settings-card p-3">
          <div className="flex justify-end items-start">
            <TailArrowRight />
          </div>
          <div>
            <TandCIcon />
          </div>

          <div className="mt-2">
            <label>Terms and Conditions</label>
          </div>
        </div>

        <div className="settings-card p-3 ">
          <div className="flex justify-end items-start">
            <TailArrowRight />
          </div>
          <div>
            <PrivacyPolicy />
          </div>

          <div className="mt-2">
            <label>Privacy Policy</label>
          </div>
        </div>
      </div>
    </div>
  );
};
