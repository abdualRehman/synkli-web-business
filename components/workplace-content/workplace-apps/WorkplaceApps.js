import "./css/apps.css";
import AppsJumbo from "./AppsJumbo";
import { useState } from "react";
import social from "../../../files/social.jpg";
import { useEffect } from "react";
import { setLoader } from "store/global/globalReducer";
import { useDispatch, useSelector } from "react-redux";
import { getAllAppsThunk } from "store/workspace/workspaceApps";

import { AppSkeleton } from "./app-skeleton/AppSkeleton";
import { NoApp } from "./NoApp";
import { ERROR_TYPE_ERROR, PERMISSIONS_MESSAGE } from "utills/globalVars";
import { toastHandler } from "responseHanlder";
const WorkplaceApps = ({ toggleShowAddApp, appsUpdated }) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.global);
  const { profileUpdating } = useSelector((state) => state.global);
  const [appUpdated, setAppUpdated] = useState(false);
  const [delIds, setDelIds] = useState([]);
  const [apps, setApps] = useState([]);
  const { data: loginData } = useSelector((state) => state.login);
  const allPermissions = JSON.parse(localStorage.getItem("allPermissions"));

  const toggleAppUpdate = () => {
    setAppUpdated(!appUpdated);
  };

  useEffect(() => {
    dispatch(setLoader(true));
    dispatch(getAllAppsThunk())
      .then((response) => {
        console.log(response.payload);
        if (response.payload) {
          setApps(response.payload);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        dispatch(setLoader(false));
      });
  }, [appUpdated, profileUpdating, appsUpdated]);

  const delHanlder = (e, app_id) => {
    if (
      !loginData?.is_employee ||
      allPermissions?.Apps?.admin ||
      allPermissions?.Apps?.write
    ) {
      const checked = e.target.checked;
      if (checked) {
        setDelIds([...delIds, app_id]);
      } else {
        const remainingAppIdsToDelete = delIds.filter((id) => id !== app_id);
        setDelIds(remainingAppIdsToDelete);
      }
    } else {
      toastHandler(PERMISSIONS_MESSAGE, ERROR_TYPE_ERROR);
    }
  };
  const handleOpenLink = (link) => {
    const url = `http://www.${link}`; // or use 'https://' if your site uses HTTPS
    const windowFeatures = "width=600,height=400"; // customize window features as needed

    window.open(url, "_blank", windowFeatures);
  };

  return (
    <div>
      <div>
        <AppsJumbo
          toggleShowAddApp={toggleShowAddApp}
          delIds={delIds}
          setDelIds={setDelIds}
          toggleAppUpdate={toggleAppUpdate}
          apps={apps}
        />
        {isLoading ? (
          <AppSkeleton />
        ) : (
          <div>
            {apps.length < 1 ? (
              <NoApp />
            ) : (
              <div className="flex items-center flex-wrap gap-5 md:mx-10 mx-5  ">
                {apps &&
                  apps?.map((app) => (
                    <div>
                      {" "}
                      <div className="app-wrap">
                        <div className="cursor-pointer z-2">
                          {" "}
                          <div className="flex justify-end mb-2 items-center">
                            <input
                              type="checkbox"
                              onChange={(e) => delHanlder(e, app?.app_id)}
                              checked={delIds.includes(app.app_id)}
                              className="cursor-pointer rounded-check z-5"
                            />{" "}
                          </div>
                          <div className="app-image-wrap">
                            <img
                              src={
                                app.image && app.image !== "null"
                                  ? app.image
                                  : social
                              }
                              alt="file"
                              className="app-img-w"
                              onClick={() => handleOpenLink(app?.link)}
                            />
                          </div>
                          <div className="app-title my-2 flex justify-center items-center">
                            {" "}
                            {app.name}{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkplaceApps;
{
  /* <input
                              type="checkbox"
                              onChange={(e) => delHanlder(e, app?.app_id)}
                              checked={delId === app?.app_id}
                              className="cursor-pointer rounded-check"
                            /> */
}

//   <div key={generateId()}>
//   <div className="app-container border border-red-500  shadow-lg">

//     {app?.image && (
//       <div className="app-image-wrapper">
//         <img
//           src={app.image}
//           alt="appsimage"
//           className="app-image"
//         />
//       </div>
//     )}
//     <div className="app-tag pb-2 flex justify-center items-center">
//       {app?.name}
//     </div>
//   </div>
// </div>

{
  /* <div className="app-card">
<div className="app-card-img-container">
  <img
    src={app.image}
    alt="file"
    className="app-card-img"
  />{" "}
</div>
<div> {app.name} </div>
</div> */
}
