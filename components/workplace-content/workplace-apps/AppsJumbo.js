import Cookies from 'js-cookie'
import { TrashIcon } from '../../../utills/svgs/TrashIcon'
import {
  BUSINESS_ID,
  ERROR_TYPE_ERROR,
  ERROR_TYPE_SUCCESS
} from 'utills/globalVars'
import { useDispatch } from 'react-redux'
import { setLoader } from 'store/global/globalReducer'
import { deleteAppThunk } from 'store/workspace/workspaceApps'
import { toastHandler } from 'responseHanlder'
import { MobileIcon } from 'utills/svgs/MobileIcon'
import { useState } from 'react'
import ConfirmationModal from 'utills/confirmationModal'

const AppsJumbo = ({ toggleShowAddApp, delIds, toggleAppUpdate, apps, setDelIds }) => {
  const business_id = localStorage.getItem(BUSINESS_ID)
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false)

  const dispatch = useDispatch()

  const deleteApp = () => {
    if (delIds.length < 1) {
      toastHandler('Please select an app first', ERROR_TYPE_ERROR)
      return
    }
  

    const delPayload = {
      app_id: JSON.stringify(delIds),
      business_id
    }

    dispatch(setLoader(true))
    dispatch(deleteAppThunk(delPayload))
      .then((response) => {
        console.log(response.payload)
        if (response.payload) {
          toggleAppUpdate()
          toastHandler('App deleted', ERROR_TYPE_SUCCESS)
          setDelIds([])
        }
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        dispatch(setLoader(false))
        setIsConfirmationOpen(false)
      })
  }

  return (
    <div className="profle-jumbo app-jumbo md:px-10 px-5 py-5  ">
      <div className="profile-jumbo-flex">
        <div className="jumbo-flex-1 ">
          <div className="jumbo-name">Apps</div>
          <div className="jumbo-dir mt-2">
            Workspace <span className="special-jumbo-text">&gt; Apps</span>
          </div>
        </div>
      </div>
      <div className="apps-jumbo-btns flex gap-3 top-10 absolute right-5">
        <button
          onClick={toggleShowAddApp}
          className="flex gap-2 items-center add-app-btn px-5 py-2"
        >
          <span>
            <MobileIcon />
          </span>
          <span>Add App</span>
        </button>
{delIds?.length > 0 &&      <button
          onClick={() =>   setIsConfirmationOpen(true)}
          className="flex gap-2 items-center remove-app-btn px-5 py-2"
        >
          <span>
            <TrashIcon />
          </span>
          <span>Remove ( {delIds.length} ) </span>
        </button>}
   
      </div>
{delIds.length > 0?    <ConfirmationModal
        isOpen={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)}
        onConfirm={deleteApp}
      /> :""}
   
    </div>
  )
}
export default AppsJumbo
