const ReportsJumbo = () => {
  return (
    <div className="profle-jumbo ann-jumbo relative app-jumbo  md:flex md:flex-row flex-col  px-10 py-5 md:justify-between ">
      <div className="profile-jumbo-flex">
        <div className="jumbo-flex-1 ">
          <div className="flex justify-between">
            <div className="jumbo-name flex gap-2 items-center">
              <div>
                <svg
                  width="14"
                  height="25"
                  viewBox="0 0 17 31"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M16.4379 30.4223C15.6884 31.1926 14.4732 31.1926 13.7237 30.4223L0.562118 16.8948C-0.187375 16.1245 -0.187375 14.8755 0.562118 14.1052L13.7237 0.577745C14.4732 -0.192579 15.6884 -0.192579 16.4379 0.577745C17.1874 1.34807 17.1874 2.59702 16.4379 3.36734L4.63334 15.5L16.4379 27.6327C17.1874 28.403 17.1874 29.6519 16.4379 30.4223Z"
                    fill="#666666"
                  />
                </svg>
              </div>
              <div>
                <div>Reports</div>
              </div>
            </div>
          </div>
          <div className="jumbo-dir mt-2">
            Workspace <span className="special-jumbo-text">&gt; Tasks</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ReportsJumbo;
