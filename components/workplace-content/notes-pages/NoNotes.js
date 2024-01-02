const NoNotes = () => {
  return (
    <div className="md:px-10 no-thread-wrapper flex flex-col gap-3 justify-center items-center">
      <div>
        <svg
          width="66"
          height="66"
          viewBox="0 0 86 86"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22 7H8C6.14348 7 4.36301 7.63214 3.05025 8.75737C1.7375 9.88259 1 11.4087 1 13V79.0003C1 80.5916 1.7375 82.1177 3.05025 83.2429C4.36301 84.3682 6.14348 85.0003 8 85.0003H78C79.8565 85.0003 81.637 84.3682 82.9498 83.2429C84.2625 82.1177 85 80.5916 85 79.0003V13C85 11.4087 84.2625 9.88259 82.9498 8.75737C81.637 7.63214 79.8565 7 78 7H64"
            stroke="url(#paint0_linear_1635_275)"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M36.0078 31.0001H71.0078M36.0078 49.0002H71.0078M36.0078 67.0003H71.0078M15.0078 31.0001H22.0078M15.0078 49.0002H22.0078M15.0078 67.0003H22.0078M29.0078 1H57.0078C58.8643 1 60.6448 1.63214 61.9576 2.75737C63.2703 3.88259 64.0078 5.40872 64.0078 7.00002C64.0078 8.59133 63.2703 10.1175 61.9576 11.2427C60.6448 12.3679 58.8643 13 57.0078 13H29.0078C27.1513 13 25.3708 12.3679 24.0581 11.2427C22.7453 10.1175 22.0078 8.59133 22.0078 7.00002C22.0078 5.40872 22.7453 3.88259 24.0581 2.75737C25.3708 1.63214 27.1513 1 29.0078 1Z"
            stroke="url(#paint1_linear_1635_275)"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <defs>
            <linearGradient
              id="paint0_linear_1635_275"
              x1="43"
              y1="7"
              x2="43"
              y2="85.0003"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#101828" />
              <stop offset="1" stop-color="#0A1E46" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_1635_275"
              x1="43.0078"
              y1="1"
              x2="43.0078"
              y2="67.0003"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#101828" />
              <stop offset="1" stop-color="#0A1E46" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="no-thread-text">There are no notes added yet.</div>
    </div>
  );
};

export default NoNotes;
