const MyThreadDetailJumbo = ({ goBack }) => {
  return (
    <div className="profle-jumbo ann-jumbo  app-jumbo  md:flex md:flex-row flex-col  px-10 py-5 md:justify-between ">
      <div className="profile-jumbo-flex">
        <div className="jumbo-flex-1 ">
          <div className="jumbo-name flex gap-4 items-center">
            <div onClick={goBack} className="cursor-pointer">
              <svg
                width="11"
                height="20"
                viewBox="0 0 18 33"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M17.4048 32.385C16.6112 33.205 15.3246 33.205 14.531 32.385L0.595182 17.9848C-0.198397 17.1648 -0.198397 15.8352 0.595182 15.0152L14.531 0.615017C15.3246 -0.20501 16.6112 -0.20501 17.4048 0.615017C18.1984 1.43504 18.1984 2.76456 17.4048 3.58459L4.90589 16.5L17.4048 29.4154C18.1984 30.2354 18.1984 31.565 17.4048 32.385Z"
                  fill="#666666"
                />
              </svg>
            </div>
            <div> Thread Details</div>
          </div>
          <div className="jumbo-dir mt-2">
            Workspace{" "}
            <span className="special-jumbo-text">
              &gt; My Threads &gt; Thread Details
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MyThreadDetailJumbo;
