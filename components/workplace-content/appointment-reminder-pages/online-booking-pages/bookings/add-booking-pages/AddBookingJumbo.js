const AddBookingJumbo = () => {
  return (
    <div>
      <div className="profle-jumbo relative ">
        <div className="profile-jumbo-flex px-10 py-5">
          <div className="jumbo-flex-1 ">
            <div className="flex gap-2 items-center">
              <div>
                <svg
                  width="12"
                  height="18"
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
              <div className="jumbo-name">Add Booking</div>
            </div>
            <div className="jumbo-dir mt-2">
              Workspace &gt; Appointments &gt; Online Booking &gt; Bookings{" "}
              <span className="special-jumbo-text">&gt; Add Booking</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBookingJumbo;
