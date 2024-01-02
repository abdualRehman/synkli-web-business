import { Loader } from "components/common/Loader";
import { useSelector } from "react-redux";
import { BgDeleteIcon } from "utills/svgs/BgDeleteIcon";
import { BgEditIcon } from "utills/svgs/BgEditIcon";
import { generateId } from "utills/uid";
import Pagination from "components/pagination";
import Cookies from "js-cookie";
import { BUSINESS_ID, TOAST_TYPE_ERROR } from "utills/globalVars";
import { useDispatch } from "react-redux";
import { PAGINATION_PAGE_SIZE } from "utills/envVars";
import { archiveTelephonicDirectoryThunk } from "store/workspace/workspaceTelephonicDirectories";
import { toastHandler } from "responseHanlder";
import { useState } from "react";
import ConfirmationModal from "utills/confirmationModal";

const TDlist = ({
  filteredItems,
  page,
  pageSize,
  count,
  handleChangePage,
  getAllTelephonicDirectories,
}) => {
  const { allPermissions } = useSelector((state) => state.global);
  const { data: loginData } = useSelector((state) => state.login);

  const { isLoading } = useSelector((state) => state.global);
  const dispatch = useDispatch();
  const business_id = localStorage.getItem(BUSINESS_ID);
  let items = filteredItems?.rows;
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [idTodelete, setidTodelete] = useState("");

  const archiveTD = (telephone_dir_id) => {
    setidTodelete(telephone_dir_id);
    setIsConfirmationOpen(true);
  };
  const handleArchiveTelephonicDirectory = () => {
    if (
      allPermissions.Telephonic_directoreis?.write ||
      !loginData?.is_employee
    ) {
      const payload = {
        business_id,
        telephone_dir_id: idTodelete,
      };
      dispatch(archiveTelephonicDirectoryThunk(payload))
        .then((response) => {
          setIsConfirmationOpen(false);
          setidTodelete("");
          const payload = {
            business_id,
            page: 1,
            pageSize: PAGINATION_PAGE_SIZE,
          };
          getAllTelephonicDirectories(payload);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {});
    } else {
      toastHandler(
        "You Dont have Write permission on this page",
        TOAST_TYPE_ERROR
      );
    }
  };
  return (
    <div>
      {isLoading && <Loader />}

      <div className="md:mx-10 mx-5 mt-8   text-black">
        {isLoading ? (
          ""
        ) : (
          <div>
            <div className="invited-team grid grid-cols-8  gap-5 place-items-center justify-items-start ">
              <div className="flex-1 flex gap-10 items-center">
                <div>
                  {" "}
                  <input type="checkbox" />
                </div>
                <div className="flex items-center"> First Name</div>
              </div>

              <div className="flex-1 flex items-center">Last Name</div>
              <div className="flex-1 flex items-center">Email</div>
              <div className="flex-1 flex items-center">Branch Assign</div>
              <div className="flex-1 flex items-center">Extension</div>
              <div className="flex-1 flex items-center">Contact No</div>
              <div className="flex-1 flex items-center">Designation</div>

              <div className="flex-1 flex items-center">Actions</div>
            </div>
            <div className="border w-full mt-2"></div>
            <div>
              {items &&
                items?.map((member, index) => (
                  <div key={generateId()}>
                    {" "}
                    <div className="grid grid-cols-8 py-2 team-members gap-5 cursor-pointer ">
                      <div className=" flex gap-10  items-center">
                        <div>
                          <input type="checkbox" />
                        </div>
                        <div>{member.first_name}</div>
                      </div>
                      <div className="flex-1 flex items-center">
                        {member.last_name}
                      </div>
                      <div className="flex-1 flex items-center">
                        {member.email}
                      </div>
                      <div className="flex-1 flex items-center">
                        {member?.branch_name}
                      </div>
                      <div className="flex-1 flex items-center">
                        {member.desk_extension}
                      </div>
                      <div className="flex-1 flex items-center">
                        {member.phone_number}
                      </div>

                      <div className="flex-1 flex items-center">
                        {member.designation}
                      </div>

                      <div className="flex-1 flex gap-2 items-center">
                        {/* <div>
                          <BgEditIcon />
                        </div> */}
                        <div
                          className="cursor-pointer"
                          onClick={() =>
                            archiveTD(member.telephone_dir_id, index)
                          }
                        >
                          <BgDeleteIcon />
                        </div>
                      </div>
                    </div>
                    <div className="border w-full "></div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
      {items?.length > 10 && (
        <div className="md:mx-10 mx-5">
          <Pagination
            page={page}
            pageSize={pageSize}
            count={count}
            rows={items.length}
            onChangePage={handleChangePage}
          />
        </div>
      )}

      <ConfirmationModal
        isOpen={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)}
        onConfirm={handleArchiveTelephonicDirectory}
      />
    </div>
  );
};

export default TDlist;
