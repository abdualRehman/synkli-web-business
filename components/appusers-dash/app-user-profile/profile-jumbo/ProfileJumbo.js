import { ThreeDotIcon } from "../../../../utills/svgs/ThreeDotIcon";
import "../css/appuserProfile.css";
const ProfileJumbo = ({ toggleModal, user }) => {
  if (!user) {
    return <div>Loading ...</div>;
  }
  return (
    <div className="profle-jumbo ">
      <div className="profile-jumbo-flex px-10 pt-5">
        <div className="jumbo-flex-1">
          <div className="jumbo-name">
            {user.first_name && user.last_name ? (
              <span>
                {user.first_name} {user.last_name}
              </span>
            ) : (
              "John Doe"
            )}
          </div>
          <div className="jumbo-dir mt-2">
            Applications &gt; App Users{" "}
            <span className="special-jumbo-text"> &gt;  {user.first_name} {user.last_name}  Profile</span>
          </div>
        </div>
        <div className="jumbo-flex-2">
          <div onClick={toggleModal} className="burger cursor-pointer">
            <ThreeDotIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileJumbo;
