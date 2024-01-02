import { useEffect } from "react";
import { SearchIcon } from "../../../utills/svgs/SearchIcon";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { useDispatch, useSelector } from "react-redux";
import { handleIndicators } from "store/global/globalReducer";
const RoleOperations = ({
  toggleAddRoleGroup,
  handleSearchValue,
  deleteSelect,
  isVisible,
  count,
  showAddRoleGroup,
}) => {
  const { data: login } = useSelector((state) => state.login);
  const { showindicators } = useSelector((state) => state.global);
  const dispatch = useDispatch();
  // /
  useEffect(() => {
    console.log(showindicators, "indicators");
    const driverObj = driver({
      showProgress: true,
      steps: [
        {
          element: ".add-group-indicate",

          popover: {
            title: "Add role group",
            description:
              "By clicking this button you can create role groups. This application is devided into different modules you can create a role group by adding permissions to a module then create a role group of those modules and assign them to your employees so they can only have access to specified modules",
            popoverClass: "my-custom-popover-class text-red-900",
          },
        },
      ],
    });
    if (showindicators && !login?.second_time_login) {
      driverObj.drive();
    } else {
      driverObj.destroy(); // Assuming your driver object has a method to stop the driver
    }

    return () => {
      dispatch(handleIndicators(false));
    };
  }, [showindicators]);
  console.log(count);
  const handleInputChange = (e) => {
    handleSearchValue(e.target.value);
  };

  const handleAdd = () => {
    dispatch(handleIndicators(false));
    toggleAddRoleGroup();
  };
  return (
    <div className="md:px-10 px-5">
      <div className="flex justify-between items-center flex-wrap  gap-5">
        <div>
          <div className="search-team">
            <div>
              <div className="absolute top-1/2 left-2 transform -translate-y-1/2">
                <SearchIcon />
              </div>
              <div>
                <input
                  onChange={(e) => handleInputChange(e)}
                  type="text"
                  placeholder="Search"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          {isVisible && (
            <div>
              <div
                onClick={() => deleteSelect()}
                className="delete-all-roles rounded-lg cursor-pointer"
              >
                Archive ({count})
              </div>
            </div>
          )}
          <div>
            <div
              onClick={handleAdd}
              className="role-btn add-group-indicate  cursor-pointer text-white rounded-lg"
            >
              Add
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RoleOperations;
