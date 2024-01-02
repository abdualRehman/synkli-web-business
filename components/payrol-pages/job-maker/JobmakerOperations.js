const JobmakerOperations = () => {
  return (
    <div className="px-10">
      <div>
        <div className="job-search-input-wrapper">
          <div className="job-search-icon">
            <svg
              width="17"
              height="17"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.2049 12.952L17.373 16.1194C17.7193 16.4655 17.7193 17.0269 17.3731 17.3731C17.0269 17.7193 16.4655 17.7193 16.1194 17.373L12.952 14.2049C11.5402 15.3366 9.78419 15.9522 7.9748 15.9496C3.57271 15.9496 0 12.3769 0 7.9748C0 3.57271 3.57271 0 7.9748 0C12.3769 0 15.9496 3.57271 15.9496 7.9748C15.9522 9.78419 15.3366 11.5402 14.2049 12.952ZM12.4274 12.2945C13.5519 11.138 14.18 9.58786 14.1774 7.9748C14.1774 4.54741 11.4013 1.77218 7.9748 1.77218C4.54741 1.77218 1.77218 4.54741 1.77218 7.9748C1.77218 11.4013 4.54741 14.1774 7.9748 14.1774C9.58786 14.18 11.138 13.5519 12.2945 12.4274L12.4274 12.2945Z"
                fill="#979797"
              />
            </svg>
          </div>
          <input
            type="text"
            maxLength="60"
            name=""
            id=""
            className="job-search-input"
            placeholder="Search"
          />
        </div>
      </div>
    </div>
  );
};
export default JobmakerOperations;
