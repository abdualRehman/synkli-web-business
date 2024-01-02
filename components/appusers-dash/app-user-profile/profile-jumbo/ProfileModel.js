import { EditPencilIcon } from "../../../../utills/svgs/EditPencilIcon";
import { EnvelopeIcon } from "../../../../utills/svgs/EnvelopeIcon";
import { TrashIcon } from "../../../../utills/svgs/TrashIcon";
import { UserIcon } from "../../../../utills/svgs/UserIcon";
import { addToClientThunk } from "store/client";
import { useDispatch } from "react-redux";

const ProfileModel = ({ user, setShowModal, fetchCustomer }) => {
  const dispatch = useDispatch();
  const handleAddToClient = () => {
    const payload = {
      customer_id: user?.customer_id,
    };
    dispatch(addToClientThunk(payload))
      .then(() => {})
      .catch((error) => {})
      .finally(() => {
        fetchCustomer();
        setShowModal(false);
      });
  };
  return (
    <div>
      <div className="dot-model absolute right-12 top-10 text-black shadow-md rounded-md">
        {!user.took_any_service ? (
          <div
            onClick={handleAddToClient}
            className="flex gap-2 p-2 dot-content mt-2 cursor-pointer "
          >
            <div>
              <div className="dot-svg-wrapper">
                <UserIcon />
              </div>
            </div>
            <div>Add to Client</div>
          </div>
        ) : (
          ""
        )}

        <div className="flex gap-2 p-2 dot-content cursor-pointer ">
          <div>
            <div className="dot-svg-wrapper">
              <EnvelopeIcon />
            </div>
          </div>
          <div>
            <a href={`mailto:${user.email}`}>Send Email</a>
          </div>
        </div>

        {/* <div className="flex gap-2 p-2 dot-content cursor-pointer ">
          <div>
            <div className="dot-svg-wrapper">
              <TrashIcon />
            </div>
          </div>
          <div>Delete</div>
        </div> */}

        {/* <div className="flex gap-2 p-2 mb-3 dot-content cursor-pointer ">
          <div>
            <div className="dot-svg-wrapper">
              <EditPencilIcon />
            </div>
          </div>
          <div>Edit</div>
        </div> */}
      </div>
    </div>
  );
};

export default ProfileModel;
