import { useDispatch } from "react-redux";
import { businessOwnerGetProfileThunk } from "store/auth/slices";

export const useOwnerProfile = () => {
  const dispatch = useDispatch();
  const getOwnerProfile = () => {
    dispatch(businessOwnerGetProfileThunk())
      .then((response) => {
        console.log(response.payload);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return { getOwnerProfile };
};
