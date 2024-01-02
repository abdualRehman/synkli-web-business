import { useNavigate } from "react-router-dom";
import { DeactivateAccIcon } from "../../utills/svgs/DeactivateAccIcon";
import { LockIcon } from "../../utills/svgs/LockIcon";
import Cookies from "js-cookie";
import { ACCESS_TOKEN, BUSINESS_ID, REFRESH_TOKEN } from "utills/globalVars";

import { useDispatch } from "react-redux";
import { login } from "store/auth/slices";
import { setLoader } from "store/global/globalReducer";

const ProfileModals = ({ togglePassSide, toggleDeactivateAcc, logout }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div>
      <div className="dot-model  absolute right-12 top-10 text-black shadow-md rounded-md">
        <div
          onClick={toggleDeactivateAcc}
          className="flex gap-2 items-center p-2 dot-content mt-2 cursor-pointer "
        >
          <div className="dot-svg-wrapper">
            <DeactivateAccIcon />
          </div>
          <div>Deactivate Account</div>
        </div>

        <div
          onClick={togglePassSide}
          className="flex gap-2 items-center p-2 dot-content cursor-pointer "
        >
          <div>
            <div className="dot-svg-wrapper">
              <LockIcon />
            </div>
          </div>
          <div>Change Password</div>
        </div>

        <div
          className="flex gap-2 items-center p-2 dot-content cursor-pointer "
          onClick={logout}
        >
          <div>
            <div className="dot-svg-wrapper">
              <svg
                width="15"
                height="16"
                viewBox="0 0 20 21"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.996 17.0138C19.0053 17.3969 18.9387 17.778 18.8 18.1354C18.6612 18.4928 18.4532 18.8194 18.1876 19.0968C17.922 19.3741 17.6041 19.5966 17.2521 19.7516C16.9001 19.9065 16.5209 19.991 16.1361 20H6.63616C6.43152 19.9875 6.24016 19.8949 6.10387 19.7424C5.96758 19.5899 5.89743 19.39 5.90874 19.1862C5.89743 18.9824 5.96758 18.7824 6.10387 18.6299C6.24016 18.4775 6.43152 18.3848 6.63616 18.3723H16.1361C16.5034 18.3771 16.8575 18.2369 17.1211 17.9822C17.3846 17.7276 17.536 17.3794 17.5422 17.0138V3.98617C17.5358 3.62081 17.3842 3.27286 17.1207 3.01845C16.8572 2.76405 16.5032 2.62392 16.1361 2.62872H6.63616C6.43602 2.60489 6.2516 2.50885 6.1178 2.35878C5.984 2.2087 5.91011 2.01501 5.91011 1.81436C5.91011 1.61371 5.984 1.42002 6.1178 1.26995C6.2516 1.11987 6.43602 1.02383 6.63616 1H16.1361C16.5212 1.00863 16.9007 1.09275 17.2531 1.24755C17.6055 1.40235 17.9237 1.62479 18.1896 1.90215C18.4555 2.1795 18.6639 2.50633 18.8028 2.86393C18.9417 3.22153 19.0084 3.60288 18.9991 3.98617L18.996 17.0138ZM11.9614 11.3687H3.79647L6.76553 14.3243C6.84128 14.4003 6.90125 14.4904 6.94201 14.5896C6.98277 14.6887 7.00351 14.7948 7.00307 14.9019C7.00263 15.0089 6.981 15.1149 6.93943 15.2137C6.89785 15.3124 6.83714 15.4021 6.76076 15.4775C6.6065 15.6298 6.39779 15.7148 6.18054 15.7139C5.96328 15.713 5.75528 15.6263 5.60229 15.4727L1.23989 11.1333C1.16384 11.0577 1.10351 10.9678 1.06235 10.8689C1.02119 10.77 1 10.664 1 10.557C1 10.45 1.02119 10.344 1.06235 10.2451C1.10351 10.1462 1.16384 10.0563 1.23989 9.98067L5.60229 5.636C5.67762 5.55752 5.76794 5.4948 5.86795 5.45154C5.96795 5.40828 6.07563 5.38535 6.18467 5.38409C6.2937 5.38282 6.40189 5.40326 6.50288 5.44419C6.60388 5.48512 6.69564 5.54572 6.77278 5.62244C6.84992 5.69916 6.91088 5.79045 6.95209 5.89094C6.9933 5.99144 7.01393 6.09912 7.01276 6.20765C7.01159 6.31619 6.98865 6.42341 6.94529 6.523C6.90192 6.62259 6.839 6.71256 6.76023 6.78761L3.79116 9.74317H11.9561C12.2276 9.74317 12.4471 10.1084 12.4471 10.557C12.4471 11.0056 12.2329 11.3687 11.9614 11.3687Z"
                  stroke="url(#paint1_linear_1344_1089)"
                  stroke-width="0.2"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_1344_1089"
                    x1="1.22354"
                    y1="9.56776"
                    x2="19"
                    y2="9.58052"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#101828" />
                    <stop offset="0.998509" stop-color="#0D1B37" />
                    <stop offset="1" stop-color="#0A1E46" />
                  </linearGradient>
                  <linearGradient
                    id="paint1_linear_1344_1089"
                    x1="1.22354"
                    y1="9.56776"
                    x2="19"
                    y2="9.58052"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#101828" />
                    <stop offset="0.998509" stop-color="#0D1B37" />
                    <stop offset="1" stop-color="#0A1E46" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
          <div>Logout</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModals;
