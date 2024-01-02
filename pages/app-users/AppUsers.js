import AppSidebar from "../../components/appSidebarComp/AppSidebar";
import { useEffect, useState } from "react";
import AppUsersDash from "../../components/appusers-dash/AppUsersDash";
import "../../components/appSidebarComp/appSidebar.css";
import { useDispatch, useSelector } from "react-redux";
import socketIOClient, { io } from "socket.io-client";
import Cookies from "js-cookie";
import { ACCESS_TOKEN } from "utills/globalVars";
import store from "store/store";
import _ from "lodash";
import { fetchBusinessCustomer } from "store/client";
import { jsx } from "@emotion/react";
import { formateDateAndTime } from "utills/moment";

const AppUsers = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { data: loginData } = useSelector((state) => state.login);
  // const { allPermissions } = useSelector((state) => state.global);
  const allPermissions = JSON.parse(localStorage.getItem("allPermissions"));

  const { data: users } = useSelector((state) => state.fetchBusinessCustomer);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // useEffect(() => {
  //   // Add event listeners for socket.io

  // setInterval(() => {
  //   socket.emit("heartbeat", "");
  // }, 3000);

  // socket.on("connect", () => {
  //   console.log("connected", "123");
  //   console.log(socket.id);
  // });

  //   socket.on("client", (payload) => {
  //     console.log(payload, "123");

  //     const JsonData = JSON.parse(payload);
  //     let newUsers = _.cloneDeep(users);

  //     if (JsonData.action == "clientDisConnect") {
  //       const findUser = newUsers.find(
  //         (user) => user.business_client_id === JsonData.data.business_client_id
  //       );
  //       findUser.is_default = false;
  //       console.log(findUser);
  //       // const updateData =  users.filter(
  //       //   (item) => item.business_client_id !== JsonData.data.business_client_id
  //       // );
  //       // console.log(updateData, "123333");
  //       dispatch(fetchBusinessCustomer.actions.handleUpdate(newUsers));
  //       // newUsers = updateData;
  //       return;
  //     }

  //     const alreadyExists = newUsers.find(
  //       (user) => user.business_client_id === JsonData?.data?.business_client_id
  //     );

  //     // console.log(alreadyExists, "123555");
  //     // if (alreadyExists.user_id) {
  //     //   alert("already exist");
  //     //   return;
  //     // } else {
  //     //   const newupdateData = [...newUsers, JsonData.data];

  //     //   dispatch(fetchBusinessCustomer.actions.handleUpdate(newupdateData));
  //     // }
  //     if (alreadyExists) {
  //       if (JsonData.action == "clientConnect") {
  //         const newUsers = _.cloneDeep(users);
  //         const findUser = newUsers.find(
  //           (user) =>
  //             user.business_client_id === JsonData.data.business_client_id
  //         );
  //         findUser.is_default = true;
  //         dispatch(fetchBusinessCustomer.actions.handleUpdate(newUsers));
  //       }
  //     } else {
  //       const newJsonData = JsonData;
  //       newJsonData.data.is_default = true;
  //       const newupdateData = [...users, newJsonData.data];

  //       dispatch(fetchBusinessCustomer.actions.handleUpdate(newupdateData));
  //     }
  //   });

  // socket.on("disconnect", () => {
  //   console.log("disconnected", "123");
  // });
  //   return () => {
  // if (!socket.connected) {
  //   return;
  // } else {
  //   socket.disconnect();
  // }
  //   };
  // }, []);

  console.log(formateDateAndTime("21-11-2023T23:29:17Z"), "date");

  return (
    <div className="app-dashboard">
      <AppSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      {
        <div>
          {allPermissions?.Clients?.read ||
          !loginData.is_employee ||
          allPermissions?.Clients?.admin ||
          allPermissions?.Clients?.write ? (
            <div>
              <div className={`content ${isOpen ? "squeeze" : ""}`}>
                <AppUsersDash isOpen={isOpen} />
              </div>
            </div>
          ) : (
            <div className="w-full h-72 flex justify-center items-center font-poppins">
              You dont have permission to access this data
            </div>
          )}
        </div>
      }
    </div>
  );
};

export default AppUsers;
