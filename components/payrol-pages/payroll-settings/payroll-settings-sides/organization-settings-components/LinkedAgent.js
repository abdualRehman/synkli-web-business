export const LinkedAgent = () => {
  return (
    <div className="mt-5">
      <div className="add-ann-form">
        <div className="linked-agent-title"> Linked Agent </div>
        <div className="mt-2">
          <div className="leave-settings-weak-text flex justify-between items-center">
            <div>Usama(kaleem@thekalkulators.au)</div>
            <div>
              <svg
                width="26"
                height="22"
                viewBox="0 0 36 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  opacity="0.05"
                  width="36"
                  height="30"
                  rx="15"
                  fill="url(#paint0_linear_1639_3632)"
                />
                <g clip-path="url(#clip0_1639_3632)">
                  <path
                    d="M17.1006 5.03809C15.1709 5.22559 13.3896 5.93652 11.8271 7.13965C11.0654 7.72559 10.0771 8.82715 9.50684 9.72559C9.26074 10.1123 8.78027 11.0967 8.6084 11.5654C8.41699 12.0889 8.20996 12.8936 8.1084 13.5146C7.9873 14.2764 7.9873 15.7217 8.1084 16.4834C8.28418 17.5615 8.56152 18.4287 9.03418 19.3936C9.5498 20.4443 10.085 21.1904 10.9443 22.0537C11.8076 22.9131 12.5537 23.4482 13.6045 23.9639C14.5693 24.4365 15.4365 24.7139 16.5146 24.8896C17.2764 25.0107 18.7217 25.0107 19.4834 24.8896C20.5615 24.7139 21.4287 24.4365 22.3936 23.9639C23.4443 23.4482 24.1904 22.9131 25.0537 22.0537C25.9131 21.1904 26.4482 20.4443 26.9639 19.3936C27.3076 18.6943 27.4795 18.2373 27.667 17.5342C27.9131 16.5967 27.9717 16.085 27.9717 14.999C27.9717 13.9131 27.9131 13.4014 27.667 12.4639C27.4795 11.7607 27.3076 11.3037 26.9639 10.6045C26.4482 9.55371 25.9131 8.80762 25.0537 7.94434C24.1904 7.08496 23.4443 6.5498 22.3936 6.03418C21.4326 5.56152 20.542 5.28027 19.5029 5.11621C18.9287 5.02637 17.6475 4.9834 17.1006 5.03809ZM19.0732 6.46387C20.5225 6.65137 21.8936 7.20215 23.0693 8.06152L23.3897 8.2959L17.3467 14.3428C14.0225 17.667 11.292 20.374 11.2764 20.3584C10.792 19.7842 10.1631 18.6553 9.87793 17.8428C9.27637 16.1162 9.24512 14.124 9.7998 12.3936C10.8193 9.20996 13.5615 6.91699 16.8857 6.46777C17.4287 6.39355 18.5068 6.39355 19.0732 6.46387ZM24.667 9.57715C25.9365 11.1436 26.5928 13.0029 26.5928 15.0186C26.5928 18.7529 24.1787 22.0537 20.6045 23.1982C19.7725 23.4639 18.9326 23.5928 18.0186 23.5928C16.0029 23.5928 14.1436 22.9365 12.5811 21.667C12.4248 21.542 12.2959 21.4287 12.2959 21.4131C12.2959 21.3779 24.3779 9.2959 24.4131 9.2959C24.4287 9.2959 24.542 9.4248 24.667 9.57715Z"
                    fill="url(#paint1_linear_1639_3632)"
                  />
                </g>
                <defs>
                  <linearGradient
                    id="paint0_linear_1639_3632"
                    x1="19.7664"
                    y1="0.37257"
                    x2="19.7476"
                    y2="30.0001"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#101828" />
                    <stop offset="0.998509" stop-color="#0D1B37" />
                    <stop offset="1" stop-color="#0A1E46" />
                  </linearGradient>
                  <linearGradient
                    id="paint1_linear_1639_3632"
                    x1="17.9946"
                    y1="24.9805"
                    x2="17.9946"
                    y2="5.01386"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#101828" />
                    <stop offset="1" stop-color="#0A1E46" />
                  </linearGradient>
                  <clipPath id="clip0_1639_3632">
                    <rect
                      width="20"
                      height="20"
                      fill="white"
                      transform="translate(8 5)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>
        </div>
        <div className="linked-agent-btn mt-5">
          <button>Unlink Current Agent And Link Another</button>
        </div>
      </div>
      <div className="linked-agent-close-btn">
        <button className="emp-details-close-btn">Close</button>
      </div>
    </div>
  );
};
