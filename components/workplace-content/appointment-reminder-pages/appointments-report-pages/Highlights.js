const Highlights = () => {
  return (
    <div className="mx-10 mt-2 highlights shadow p-5">
      <div className="highlight-title">Highlights</div>

      <div className="highlight-flex-container mt-2">
        <div className="highlight-column">Appointment Status</div>
        <div className="highlight-column">Quantity</div>
        <div className="highlight-column">Percent</div>
        <div className="highlight-column">Value</div>
      </div>

      <div className="highlight-flex-colors mt-2">
        <div className="color-column">
          <div className="flex gap-2 items-center">
            <div>
              <svg
                width="12"
                height="12"
                viewBox="0 0 13 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="6.5" cy="6.5" r="6.5" fill="#27AE60" />
              </svg>
            </div>
            <div>Completed/Finished</div>
          </div>
        </div>
        <div className="color-column">1</div>
        <div className="color-column">0%</div>
        <div className="color-column">$0.00</div>
      </div>

      <div className="highlight-flex-colors mt-2">
        <div className="color-column">
          <div className="flex gap-2 items-center">
            <div>
              <svg
                width="12"
                height="12"
                viewBox="0 0 13 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="6.5" cy="6.5" r="6.5" fill="#0591F6" />
              </svg>
            </div>
            <div>Reschedule</div>
          </div>
        </div>
        <div className="color-column">1</div>
        <div className="color-column">0%</div>
        <div className="color-column">$0.00</div>
      </div>

      <div className="highlight-flex-colors mt-2">
        <div className="color-column">
          <div className="flex gap-2 items-center">
            <div>
              <svg
                width="12"
                height="12"
                viewBox="0 0 13 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="6.5" cy="6.5" r="6.5" fill="#F67905" />
              </svg>
            </div>
            <div>Incomplete</div>
          </div>
        </div>
        <div className="color-column">1</div>
        <div className="color-column">0%</div>
        <div className="color-column">$0.00</div>
      </div>

      <div className="highlight-flex-colors mt-2">
        <div className="color-column">
          <div className="flex gap-2 items-center">
            <div>
              <svg
                width="12"
                height="12"
                viewBox="0 0 13 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="6.5" cy="6.5" r="6.5" fill="#979797" />
              </svg>
            </div>
            <div>Cancelled</div>
          </div>
        </div>
        <div className="color-column">1</div>
        <div className="color-column">0%</div>
        <div className="color-column">$0.00</div>
      </div>
    </div>
  );
};
export default Highlights;
