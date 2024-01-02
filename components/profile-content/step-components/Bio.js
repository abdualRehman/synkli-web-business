import { useSelector } from "react-redux";
import "./css/businessSteps.css";
import { BioSkeleton } from "../profile-skeleton/BioSkeleton";
import { toastHandler } from "responseHanlder";
import { ERROR_TYPE_ERROR, PERMISSIONS_MESSAGE } from "utills/globalVars";
const Bio = ({ businessData, toggleBio }) => {
  const { data } = useSelector((state) => state.getBusinessprofile);
  const isLoading = useSelector((state) => state.global.isLoading);

  const { data: loginData } = useSelector((state) => state.login);
  const allPermissions = JSON.parse(localStorage.getItem("allPermissions"));

  const handleToggleBio = () => {
    if (
      !loginData?.is_employee ||
      allPermissions?.Profile?.admin ||
      allPermissions?.Profile?.write
    ) {
      toggleBio();
    } else {
      toastHandler(PERMISSIONS_MESSAGE, ERROR_TYPE_ERROR);
    }
  };
  return (
    <div className="md:px-10 px-5  py-2">
      <div className="bio-step p-5 shadow-md">
        {isLoading ? (
          <BioSkeleton lines={5} />
        ) : (
          <div className="break-words">
            {data && <span>{data?.description}</span>}

            {!data?.description ? (
              <div className="flex justify-end">
                <button
                  className="my-bio-btn px-5 py-2 rounded-md"
                  onClick={handleToggleBio}
                >
                  Add Bio
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Bio;
