const TasksJumbo = ({ toggleActivity }) => {
  return (
    <div>
      <div className="profle-jumbo ann-jumbo  app-jumbo  md:flex md:flex-row flex-col px-5 md:px-10 py-5 md:justify-between ">
        <div className="profile-jumbo-flex">
          <div className="jumbo-flex-1 ">
            <div className="flex justify-between">
              <div className="jumbo-name">Tasks</div>
            </div>
            <div className="jumbo-dir mt-2">
              Workspace <span className="special-jumbo-text">&gt; Tasks</span>
            </div>
          </div>
        </div>

        <div>
          <button
            onClick={toggleActivity}
            className="flex gap-2 items-center px-2 tasks-recent-activity-btn"
          >
            {" "}
            <span>
              <svg
                width="17"
                height="13"
                viewBox="0 0 21 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 1.06667C21 0.477563 20.5224 0 19.9333 0H4.38246C3.79335 0 3.31579 0.477563 3.31579 1.06667C3.31579 1.65577 3.79335 2.13333 4.38246 2.13333H19.9333C20.5224 2.13333 21 1.65577 21 1.06667ZM21 7.46667C21 6.87756 20.5224 6.4 19.9333 6.4H14.3298C13.7407 6.4 13.2632 6.87756 13.2632 7.46667C13.2632 8.05577 13.7407 8.53333 14.3298 8.53333H19.9333C20.5224 8.53333 21 8.05577 21 7.46667ZM21 13.8667C21 13.2776 20.5224 12.8 19.9333 12.8H9.90877C9.31967 12.8 8.8421 13.2776 8.8421 13.8667C8.8421 14.4558 9.31967 14.9333 9.90877 14.9333H19.9333C20.5224 14.9333 21 14.4558 21 13.8667ZM9.72632 9.49333L10.8316 8.32C10.9403 8.20266 11.0004 8.05076 11.0004 7.89333C11.0004 7.73591 10.9403 7.58401 10.8316 7.46667L8.8421 5.54667C8.72052 5.44172 8.56312 5.38369 8.4 5.38369C8.23688 5.38369 8.07948 5.44172 7.95789 5.54667L6.85263 6.61333L9.61579 9.6L9.72632 9.49333ZM6.07895 7.36L0 13.12V16H2.87368L9.06316 10.1333L6.07895 7.25333V7.36Z"
                  fill="url(#paint0_linear_1524_297)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_1524_297"
                    x1="11.5304"
                    y1="0.198704"
                    x2="11.5212"
                    y2="16"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#101828" />
                    <stop offset="0.998509" stop-color="#0D1B37" />
                    <stop offset="1" stop-color="#0A1E46" />
                  </linearGradient>
                </defs>
              </svg>
            </span>{" "}
            <span className="flex gap-1">
              {" "}
              <span>Recent </span> <span>Activity</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TasksJumbo;
