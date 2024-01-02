import { useEffect, useState } from "react";
import RoleJumbo from "./RoleJumbo";
import RoleOperations from "./RoleOperations";
import RoleTable from "./RoleTable";
import "./css/rolemanagement.css";
import {
  fetchRoleGroupsThunk,
  updateBusinessGroupstatusThunk,
} from "store/settings/team/team";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "store/global/globalReducer";
import { Loader } from "components/common/Loader";
import ConfirmationModal from "utills/confirmationModal";

const RoleContent = ({ toggleAddRoleGroup, showAddRoleGroup }) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.global);
  const { data: rolsData } = useSelector((state) => state.fetchRoleGroups);
  console.log(rolsData, "====><");
  const [searchValue, setSearchValue] = useState("");
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [isVisible, setVisible] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const handleSearchValue = (value) => {
    setSearchValue(value);
  };

  const filteredData =
    rolsData && searchValue !== ""
      ? rolsData?.business?.business_groups.filter((rol) =>
          rol?.business_group_name
            .toLowerCase()
            .includes(searchValue.toLowerCase())
        )
      : rolsData?.business?.business_groups;
  useEffect(() => {
    dispatch(setLoader(true));
    dispatch(fetchRoleGroupsThunk())
      .then(() => {})
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        dispatch(setLoader(false));
      });
  }, []);

  const handleDelete = async () => {
    setIsConfirmationOpen(false);
    try {
      dispatch(setLoader(true));
      console.log("start");

      const promises = selectedRoles.map((item) => {
        const payload = {
          business_group_id: item.business_group_id,
          status: item.status,
        };
        return dispatch(updateBusinessGroupstatusThunk(payload));
      });

      await Promise.all(promises);

      await dispatch(fetchRoleGroupsThunk());

      // Using the updater callback form of setSelectedRoles
      setSelectedRoles((prev) => {
        // Filter out elements based on the updated selectedRoles
        return prev.filter(
          (_, index) => !selectedRoles.includes(selectedRoles[index])
        );
      });
    } catch (error) {
      console.error(error);
    } finally {
      console.log("end");
      dispatch(setLoader(false));
    }
  };

  const deleteSelect = async () => {
    setIsConfirmationOpen(true);
  };

  return (
    <div>
      <ConfirmationModal
        isOpen={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)}
        onConfirm={handleDelete}
      />
      {isLoading && <Loader />}
      <RoleJumbo />
      <div>
        <RoleOperations
          toggleAddRoleGroup={toggleAddRoleGroup}
          handleSearchValue={handleSearchValue}
          deleteSelect={deleteSelect}
          count={selectedRoles.length}
          isVisible={selectedRoles.length > 0 ? true : false}
          showAddRoleGroup={showAddRoleGroup}
        />
      </div>
      <div>
        <RoleTable
          data={rolsData && filteredData}
          selectedRoles={selectedRoles}
          setSelectedRoles={setSelectedRoles}
        />
      </div>
    </div>
  );
};
export default RoleContent;
