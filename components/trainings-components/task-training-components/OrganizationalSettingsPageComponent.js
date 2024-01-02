import { useDispatch, useSelector } from "react-redux";
import OSJumbo from "./organizational-settings-pages/OSJumbo";
import OSOperations from "./organizational-settings-pages/OSOperations";
import OSdynamicStatus from "./organizational-settings-pages/OSdynamicStatus";

import { useEffect, useState } from "react";
import { setLoader } from "store/global/globalReducer";
import { getAllTaskStatusesThunk } from "store/workspace/workspaceTasks";
import { PAGINATION_PAGE_SIZE } from "utills/envVars";
import { BUSINESS_ID } from "utills/globalVars";

const OrganizationalSettingsPageComponent = ({
  toggleAddStatus,
  toggleLogs,
  showAddStatus,
  statusUpdated,
}) => {
  const [condition, setCondition] = useState(1);
  const dispatch = useDispatch();
  const business_id = localStorage.getItem(BUSINESS_ID);
  const [page, setPage] = useState(1);
  const { data } = useSelector((state) => state.getAllTaskStatuses);

  const handleCondition = (condition) => {
    setCondition(condition);
  };

  const [searchTerm, setTerm] = useState("");
  const handleSearchTerm = (term) => {
    setTerm(term);
  };

  const filteredStatuses = data?.rows?.filter((row) =>
    row.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getAllStatuses = (payload) => {
    dispatch(setLoader(true));
    dispatch(getAllTaskStatusesThunk(payload))
      .then((response) => {
        console.log(response.payload);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        dispatch(setLoader(false));
      });
  };

  const handleChangePage = (newPage) => {
    setPage(newPage);
    getAllStatuses({
      business_id,
      page: newPage,
      pageSize: PAGINATION_PAGE_SIZE,
    });
  };

  useEffect(() => {
    const payload = {
      business_id,
    };

    getAllStatuses(payload);
  }, [statusUpdated]);

  const myFunction = () => {
    return (
      <div>
        <div>
          {condition === 1 && (
            <div>
              <OSdynamicStatus
                toggleLogs={toggleLogs}
                page={page}
                filteredStatuses={filteredStatuses}
                getAllStatuses={getAllStatuses}
                pageSize={PAGINATION_PAGE_SIZE}
                count={data?.count}
                handleChangePage={handleChangePage}
              />
            </div>
          )}
        </div>
      </div>
    );
  };
  return (
    <div>
      <OSJumbo handleCondition={handleCondition} />
      <div>
        <OSOperations
          toggleAddStatus={toggleAddStatus}
          showAddStatus={showAddStatus}
          handleSearchTerm={handleSearchTerm}
        />
      </div>
      <div>{myFunction()}</div>
    </div>
  );
};
export default OrganizationalSettingsPageComponent;
