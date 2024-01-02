const AgentPays = () => {
  return (
    <div className="grid grid-cols-2 gap-5 mt-5 client-pays">
      <div>
        <div className="strong-label">payment Details</div>
        <div className="week-label mt-3">
          <div> First Name </div>
          <div>xyz</div>
        </div>

        <div className="week-label mt-3">
          <div> Last Name </div>
          <div>xyz</div>
        </div>
        <div className="week-label mt-3">Card</div>
        <div className="week-label mt-1">
          <div> Visa ending in 5364 </div>
          <div>Expires Nov/2026</div>
        </div>

        <div className="week-label mt-3 text-blue-900">Check Card Details</div>
      </div>

      <div>
        <div className="strong-label">Billing Schedule$0.99</div>
        <div>
          <label>Per employee per month </label>
        </div>

        <div className="border rounded-xl mt-2 client-btn-toggler w-72">
          <button className="active-payment-btn px-5 py-1">
            {" "}
            <div>Annual</div> <div>$1.99 per employee</div>
          </button>
          <button className="px-5 py-1">
            {" "}
            <div>Annual</div> <div>$1.99 per employee</div>{" "}
          </button>
        </div>

        <div className="mt-3">
          <label>
            Initial 0 months discount. Maximum transaction value $83.88/ year.
            Equivalent to $8.99 per month. Terms and conditions apply.
          </label>
        </div>

        <div className="mt-8">
          <div>
            <label>Number Of Employees</label>
          </div>
          <div>
            <input type="text" placeholder="Contact Number" />
          </div>
        </div>

        <div className="mt-3 flex gap-5">
          <div>
            <label>Today's Payment Amount</label>
          </div>
          <div>
            <label>$118.67</label>
          </div>
        </div>
      </div>

      <div className="client-pays-btn">
        <button>Send Email</button>
      </div>
    </div>
  );
};
export default AgentPays;
