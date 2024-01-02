import { ThreeDotIcon } from "utills/svgs/ThreeDotIcon";

const ProfileJumbotron = ({ toggleModal }) => {
  return (
    <div>
      <div className="profle-jumbo md:mx-10 mx-5  my-5">
        <div className="profile-jumbo-flex ">
          <div className="jumbo-flex-1 ">
            <div className="jumbo-name">Profile</div>
            <div className="jumbo-dir mt-2">
              <span className="special-jumbo-text"> Profile</span>
            </div>
          </div>
          <div className="jumbo-flex-2">
            <div onClick={toggleModal} className="burger cursor-pointer">
              <ThreeDotIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileJumbotron;
