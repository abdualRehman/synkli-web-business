const NoAnnouncement = () => {
  return (
    <div className="no-ann">
      <div>
        <div className="no-ann-wrapper flex justify-center">
          <svg
            width="76"
            height="76"
            viewBox="0 0 86 86"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22 7.00049H8C6.14348 7.00049 4.36301 7.63263 3.05025 8.75786C1.7375 9.88308 1 11.4092 1 13.0005V79.0008C1 80.5921 1.7375 82.1182 3.05025 83.2434C4.36301 84.3687 6.14348 85.0008 8 85.0008H78C79.8565 85.0008 81.637 84.3687 82.9498 83.2434C84.2625 82.1182 85 80.5921 85 79.0008V13.0005C85 11.4092 84.2625 9.88308 82.9498 8.75786C81.637 7.63263 79.8565 7.00049 78 7.00049H64"
              stroke="url(#paint0_linear_1635_144)"
              stroke-width="1.4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M36 31.0001H71M36 49.0002H71M36 67.0003H71M15 31.0001H22M15 49.0002H22M15 67.0003H22M29 1H57C58.8565 1 60.637 1.63214 61.9497 2.75737C63.2625 3.88259 64 5.40872 64 7.00002C64 8.59133 63.2625 10.1175 61.9497 11.2427C60.637 12.3679 58.8565 13 57 13H29C27.1435 13 25.363 12.3679 24.0503 11.2427C22.7375 10.1175 22 8.59133 22 7.00002C22 5.40872 22.7375 3.88259 24.0503 2.75737C25.363 1.63214 27.1435 1 29 1Z"
              stroke="url(#paint1_linear_1635_144)"
              stroke-width="1.4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <defs>
              <linearGradient
                id="paint0_linear_1635_144"
                x1="43"
                y1="7.00049"
                x2="43"
                y2="85.0008"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#101828" />
                <stop offset="1" stop-color="#0A1E46" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_1635_144"
                x1="43"
                y1="1"
                x2="43"
                y2="67.0003"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#101828" />
                <stop offset="1" stop-color="#0A1E46" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="mt-3 no-ann-text">
          There are no announcements added yet.
        </div>
      </div>
    </div>
  );
};

export default NoAnnouncement;
