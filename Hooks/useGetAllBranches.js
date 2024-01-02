import React from 'react'
import { useDispatch } from 'react-redux';
import { getBranchLocationsThunk } from 'store/auth/slices';

export const useGetAllBranches = () => {
   const dispatch = useDispatch()
   const business_id = localStorage.getItem("business_id")
    const getBranches = () => {
        dispatch(getBranchLocationsThunk({ business_id }))
        .then((response) => {
          console.log(response.payload);
       
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          console.log("finally");
        });
    }
   return {getBranches}
}
