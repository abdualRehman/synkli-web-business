const ClientPays = () => {
  return (
    <div className="grid grid-cols-2 gap-5 mt-5 client-pays">
      <div>
        <div>
          <label>Email your client to fill out their payment details</label>
        </div>
        <div>
          <label>Client</label>
        </div>
        <div>
          <label>AUGUSTA PAINTING SERVICE PTY LTD</label>
        </div>
        <div>
          <div>
            <label>Email Address</label>
          </div>
          <div>
            <input type="email" placeholder="Email Address" />
          </div>
        </div>

        <div>
          <div>
            <label>Messages</label>
          </div>
          <div>
            <textarea name="" id="" cols="30" rows="5"></textarea>
          </div>
        </div>

        <div>
          <label>Enter card details on behalf of the client</label>
        </div>
      </div>

      <div>
        <div>
          <label>Billing Schedule$0.99</label>
        </div>
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
export default ClientPays;
