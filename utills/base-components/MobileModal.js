import React from "react";
import playstorelogo from "../../files/playstorelogo.png";
import appstorelogo from "../../files/appstorelogo.png";
export const MobileModal = () => {
  const playStoreLink =
    "https://play.google.com/store/apps/details?id=com.twitter.android";
  const appStoreLink = "https://itunes.apple.com/app/twitter/id333903271";
  return (
    <div className="mobile-modal">
      <div className="page-404-header absolute top-5 left-5">SYNKLI</div>
      <div className="px-10 font-bold">
        For mobile view, please download our app.
      </div>
      <div className="mt-10">
        <div className="social-btn-wrapper">
          {" "}
          <a href={playStoreLink} target="_blank" rel="noopener noreferrer">
            <button>
              {" "}
              <img src={playstorelogo} className="social-btn" />{" "}
            </button>
          </a>
        </div>
        <div className="social-btn-wrapper mt-2">
          {" "}
          <a href={appStoreLink} target="_blank" rel="noopener noreferrer">
            <button>
              {" "}
              <img src={appstorelogo} className="social-btn" />
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};
