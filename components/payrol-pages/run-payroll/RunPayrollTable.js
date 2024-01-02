import { useState } from "react";
import { useMediaQuery } from "react-responsive";
const RunPayrollTable = ({ togglePayDetails, togglePaymentSummary }) => {
  const [users, setUsers] = useState([
    {
      id: 1,
      status: "STP done",
      payPeriod: "2023-05-01",
      Gross: "$1148.00",
      tax: "$1148.00",
      super: "$1148.00",
      netPay: "$1148.00",
    },
    {
      id: 2,
      status: "STP fails",
      payPeriod: "2023-05-01",
      Gross: "$1148.00",
      tax: "$1148.00",
      super: "$1148.00",
      netPay: "$1148.00",
    },
    {
      id: 3,
      status: "STP done",
      payPeriod: "2023-05-01",
      Gross: "$1000.00",
      tax: "$1000.00",
      super: "$1000.00",
      netPay: "$1000.00",
    },
    {
      id: 4,
      status: "STP fails",
      payPeriod: "2023-05-01",
      Gross: "$1200.00",
      tax: "$1200.00",
      super: "$1200.00",
      netPay: "$1200.00",
    },
    {
      id: 5,
      status: "STP done",
      payPeriod: "2023-05-01",
      Gross: "$1500.00",
      tax: "$1500.00",
      super: "$1500.00",
      netPay: "$1500.00",
    },
    {
      id: 6,
      status: "STP fails",
      payPeriod: "2023-05-01",
      Gross: "$900.00",
      tax: "$900.00",
      super: "$900.00",
      netPay: "$900.00",
    },
    {
      id: 7,
      status: "STP done",
      payPeriod: "2023-05-01",
      Gross: "$2000.00",
      tax: "$2000.00",
      super: "$2000.00",
      netPay: "$2000.00",
    },
    {
      id: 8,
      status: "STP fails",
      payPeriod: "2023-05-01",
      Gross: "$800.00",
      tax: "$800.00",
      super: "$800.00",
      netPay: "$800.00",
    },
  ]);

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1024px)",
  });

  const isTabletOrMobile = useMediaQuery({
    query: "(max-width: 1023px)",
  });

  return (
    <div>
      {isDesktopOrLaptop && (
        <div className="md:px-10 overflow-hidden mt-8 px-5">
          <div>
            <div className="invited-team grid grid-cols-7  gap-5 place-items-center justify-items-start ">
              <div className="flex-1 flex gap-10">
                <div>
                  {" "}
                  <input type="checkbox" />
                </div>
                <div> Status</div>
              </div>

              <div className="flex-1">Pay Period</div>
              <div className="flex-1">Gross</div>
              <div className="flex-1">Tax</div>
              <div className="flex-1">Super</div>
              <div className="flex-1">Net Pay</div>

              <div className="flex-1">Actions</div>
            </div>
            <div className="team-line mt-2"></div>
            <div>
              {users.map((member) => (
                <div>
                  {" "}
                  <div
                    onClick={togglePaymentSummary}
                    className="grid grid-cols-7  team-members gap-5 cursor-pointer flex items-center"
                  >
                    <div className="flex-1 flex gap-10">
                      <div>
                        <input onClick={togglePayDetails} type="checkbox" />
                      </div>
                      <div>{member.status}</div>
                    </div>
                    <div className="flex-1">{member.payPeriod}</div>
                    <div className="flex-1">{member.Gross}</div>
                    <div className="flex-1">{member.tax}</div>
                    <div className="flex-1">{member.super}</div>

                    <div className="flex-1">{member.netPay}</div>

                    <div className="flex-1 flex gap-2">
                      <div>
                        <svg
                          width="26"
                          height="25"
                          viewBox="0 0 36 30"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            opacity="0.1"
                            width="36"
                            height="30"
                            rx="15"
                            fill="#B695F8"
                          />
                          <path
                            d="M11.875 25C11.3594 25 10.9181 24.8043 10.5512 24.413C10.1837 24.021 10 23.55 10 23V7C10 6.45 10.1837 5.979 10.5512 5.587C10.9181 5.19567 11.3594 5 11.875 5H19.375L25 11V15H23.125V12H18.4375V7H11.875V23H17.5V25H11.875ZM23.4062 17.525L24.4141 18.6L20.7812 22.45V23.5H21.7656L25.3984 19.65L26.3828 20.7L22.3516 25H19.375V21.825L23.4062 17.525ZM26.3828 20.7L23.4062 17.525L24.7656 16.075C24.9375 15.8917 25.1562 15.8 25.4219 15.8C25.6875 15.8 25.9062 15.8917 26.0781 16.075L27.7422 17.85C27.9141 18.0333 28 18.2667 28 18.55C28 18.8333 27.9141 19.0667 27.7422 19.25L26.3828 20.7Z"
                            fill="#B695F8"
                          />
                        </svg>
                      </div>
                      <div>
                        <svg
                          width="26"
                          height="25"
                          viewBox="0 0 36 30"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            opacity="0.05"
                            width="36"
                            height="30"
                            rx="15"
                            fill="url(#paint0_linear_1342_1637)"
                          />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M15.4249 5.94492C16.0503 5.33856 16.8958 5 17.775 5C18.6542 5 19.4997 5.33856 20.1251 5.94492C20.6534 6.45721 20.9879 7.12549 21.0793 7.84091H26.5641C26.8216 7.84091 27.0711 7.94002 27.2568 8.12017C27.443 8.30072 27.55 8.54827 27.55 8.80909C27.55 9.06991 27.443 9.31746 27.2568 9.49802C27.0711 9.67816 26.8216 9.77727 26.5641 9.77727H25.6841L25.1032 14.6507L24.6576 14.532C24.3025 14.4374 23.9391 14.3745 23.5721 14.3441L23.1588 14.3099L23.6994 9.77727H11.8516L13.1812 20.9549C13.2352 21.4078 13.4594 21.8284 13.8147 22.1353C14.1703 22.4424 14.6321 22.6137 15.1124 22.6136H17.5476L17.6601 22.8271C17.8606 23.2075 18.103 23.5639 18.381 23.891L18.9411 24.55H15.1125C14.1553 24.5499 13.2297 24.2088 12.512 23.5885C11.7941 22.968 11.334 22.1109 11.2231 21.1791L9.86588 9.77727H8.98594C8.72835 9.77727 8.47894 9.67816 8.29316 9.49802C8.10696 9.31746 8 9.06991 8 8.80909C8 8.54827 8.10696 8.30072 8.29316 8.12017C8.47894 7.94002 8.72835 7.84091 8.98594 7.84091H14.4707C14.5621 7.12549 14.8966 6.45721 15.4249 5.94492ZM17.775 6.93636C17.411 6.93636 17.0643 7.0767 16.8105 7.32277C16.6585 7.47021 16.5472 7.64822 16.4826 7.84091H19.0674C19.0028 7.64822 18.8915 7.47021 18.7395 7.32277C18.4857 7.0767 18.139 6.93636 17.775 6.93636ZM26.9359 23.9354C27.8736 22.9978 28.4004 21.726 28.4004 20.3999C28.4004 19.0738 27.8736 17.8021 26.9359 16.8644C25.9982 15.9267 24.7265 15.3999 23.4004 15.3999C22.0743 15.3999 20.8025 15.9267 19.8649 16.8644C18.9272 17.8021 18.4004 19.0738 18.4004 20.3999C18.4004 21.726 18.9272 22.9978 19.8649 23.9354C20.8025 24.8731 22.0743 25.3999 23.4004 25.3999C24.7265 25.3999 25.9982 24.8731 26.9359 23.9354ZM25.6233 18.7332C25.6233 18.8808 25.5647 19.0223 25.4604 19.1266L24.1859 20.3999L25.4604 21.6732C25.512 21.7249 25.553 21.7862 25.581 21.8537C25.6089 21.9212 25.6233 21.9935 25.6233 22.0666C25.6233 22.1396 25.6089 22.212 25.581 22.2794C25.553 22.3469 25.512 22.4082 25.4604 22.4599C25.4087 22.5116 25.3474 22.5525 25.2799 22.5805C25.2124 22.6084 25.1401 22.6228 25.0671 22.6228C24.994 22.6228 24.9217 22.6084 24.8542 22.5805C24.7867 22.5525 24.7254 22.5116 24.6737 22.4599L23.4004 21.1855L22.1271 22.4599C22.0754 22.5116 22.0141 22.5525 21.9466 22.5805C21.8791 22.6084 21.8068 22.6228 21.7337 22.6228C21.6607 22.6228 21.5883 22.6084 21.5209 22.5805C21.4534 22.5525 21.392 22.5116 21.3404 22.4599C21.2887 22.4082 21.2478 22.3469 21.2198 22.2794C21.1919 22.212 21.1775 22.1396 21.1775 22.0666C21.1775 21.9935 21.1919 21.9212 21.2198 21.8537C21.2478 21.7862 21.2887 21.7249 21.3404 21.6732L22.6148 20.3999L21.3404 19.1266C21.2361 19.0223 21.1775 18.8808 21.1775 18.7332C21.1775 18.5857 21.2361 18.4442 21.3404 18.3399C21.4447 18.2356 21.5862 18.177 21.7337 18.177C21.8813 18.177 22.0227 18.2356 22.1271 18.3399L23.4004 19.6143L24.6737 18.3399C24.778 18.2356 24.9195 18.177 25.0671 18.177C25.2146 18.177 25.3561 18.2356 25.4604 18.3399C25.5647 18.4442 25.6233 18.5857 25.6233 18.7332Z"
                            fill="url(#paint1_linear_1342_1637)"
                          />
                          <defs>
                            <linearGradient
                              id="paint0_linear_1342_1637"
                              x1="19.7664"
                              y1="0.37257"
                              x2="19.7476"
                              y2="30.0001"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stop-color="#101828" />
                              <stop offset="0.998509" stop-color="#0D1B37" />
                              <stop offset="1" stop-color="#0A1E46" />
                            </linearGradient>
                            <linearGradient
                              id="paint1_linear_1342_1637"
                              x1="19.2011"
                              y1="5.25335"
                              x2="19.1859"
                              y2="25.3999"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stop-color="#101828" />
                              <stop offset="0.998509" stop-color="#0D1B37" />
                              <stop offset="1" stop-color="#0A1E46" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="team-line"></div>{" "}
                </div>
              ))}
            </div>
          </div>

          <div className=" mt-5 pagination ">
            <div className="recently-added">Showing 6 to 10 of 26 entries</div>
            <div className="pagination-btns">
              <button>Previous</button>
              <button className="btn-1-pag">1</button>
              <button>2</button>
              <button>3</button>
              <button>4</button>
              <button className="next-btn">Next</button>
            </div>
          </div>
        </div>
      )}

      {isTabletOrMobile && (
        <div>
          <div className="md:px-10 mt-8 px-5 tablet-table">
            <div>
              <div className="run-p-tab">
                <div className="flex-1 flex gap-10">
                  <div>
                    {" "}
                    <input type="checkbox" />
                  </div>
                  <div> First Name</div>
                </div>

                <div className="flex-1">Last Name</div>
                <div className="flex-1">Email</div>
                <div className="flex-1">Branch Assign</div>
                <div className="flex-1">Extension</div>
                <div className="flex-1">Contact No</div>

                <div className="flex-1">Actions</div>
              </div>
              <div className="team-line mt-2"></div>
              <div className="tablet-data">
                {users.map((member) => (
                  <div>
                    {" "}
                    <div className="tablet-row mt-2 team-members cursor-pointer ">
                      <div className="flex-1 flex gap-10">
                        <div>
                          <input type="checkbox" />
                        </div>
                        <div>{member.status}</div>
                      </div>
                      <div className="flex-1">{member.payPeriod}</div>
                      <div className="flex-1">{member.Gross}</div>
                      <div className="flex-1">{member.tax}</div>
                      <div className="flex-1">{member.super}</div>
                      <div className="flex-1">{member.netPay}</div>

                      <div className="flex-1 flex gap-2">
                        <div>
                          <svg
                            width="26"
                            height="25"
                            viewBox="0 0 36 30"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              opacity="0.1"
                              width="36"
                              height="30"
                              rx="15"
                              fill="#B695F8"
                            />
                            <path
                              d="M11.875 25C11.3594 25 10.9181 24.8043 10.5512 24.413C10.1837 24.021 10 23.55 10 23V7C10 6.45 10.1837 5.979 10.5512 5.587C10.9181 5.19567 11.3594 5 11.875 5H19.375L25 11V15H23.125V12H18.4375V7H11.875V23H17.5V25H11.875ZM23.4062 17.525L24.4141 18.6L20.7812 22.45V23.5H21.7656L25.3984 19.65L26.3828 20.7L22.3516 25H19.375V21.825L23.4062 17.525ZM26.3828 20.7L23.4062 17.525L24.7656 16.075C24.9375 15.8917 25.1562 15.8 25.4219 15.8C25.6875 15.8 25.9062 15.8917 26.0781 16.075L27.7422 17.85C27.9141 18.0333 28 18.2667 28 18.55C28 18.8333 27.9141 19.0667 27.7422 19.25L26.3828 20.7Z"
                              fill="#B695F8"
                            />
                          </svg>
                        </div>
                        <div>
                          <svg
                            width="26"
                            height="25"
                            viewBox="0 0 36 30"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              opacity="0.05"
                              width="36"
                              height="30"
                              rx="15"
                              fill="url(#paint0_linear_1342_1637)"
                            />
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M15.4249 5.94492C16.0503 5.33856 16.8958 5 17.775 5C18.6542 5 19.4997 5.33856 20.1251 5.94492C20.6534 6.45721 20.9879 7.12549 21.0793 7.84091H26.5641C26.8216 7.84091 27.0711 7.94002 27.2568 8.12017C27.443 8.30072 27.55 8.54827 27.55 8.80909C27.55 9.06991 27.443 9.31746 27.2568 9.49802C27.0711 9.67816 26.8216 9.77727 26.5641 9.77727H25.6841L25.1032 14.6507L24.6576 14.532C24.3025 14.4374 23.9391 14.3745 23.5721 14.3441L23.1588 14.3099L23.6994 9.77727H11.8516L13.1812 20.9549C13.2352 21.4078 13.4594 21.8284 13.8147 22.1353C14.1703 22.4424 14.6321 22.6137 15.1124 22.6136H17.5476L17.6601 22.8271C17.8606 23.2075 18.103 23.5639 18.381 23.891L18.9411 24.55H15.1125C14.1553 24.5499 13.2297 24.2088 12.512 23.5885C11.7941 22.968 11.334 22.1109 11.2231 21.1791L9.86588 9.77727H8.98594C8.72835 9.77727 8.47894 9.67816 8.29316 9.49802C8.10696 9.31746 8 9.06991 8 8.80909C8 8.54827 8.10696 8.30072 8.29316 8.12017C8.47894 7.94002 8.72835 7.84091 8.98594 7.84091H14.4707C14.5621 7.12549 14.8966 6.45721 15.4249 5.94492ZM17.775 6.93636C17.411 6.93636 17.0643 7.0767 16.8105 7.32277C16.6585 7.47021 16.5472 7.64822 16.4826 7.84091H19.0674C19.0028 7.64822 18.8915 7.47021 18.7395 7.32277C18.4857 7.0767 18.139 6.93636 17.775 6.93636ZM26.9359 23.9354C27.8736 22.9978 28.4004 21.726 28.4004 20.3999C28.4004 19.0738 27.8736 17.8021 26.9359 16.8644C25.9982 15.9267 24.7265 15.3999 23.4004 15.3999C22.0743 15.3999 20.8025 15.9267 19.8649 16.8644C18.9272 17.8021 18.4004 19.0738 18.4004 20.3999C18.4004 21.726 18.9272 22.9978 19.8649 23.9354C20.8025 24.8731 22.0743 25.3999 23.4004 25.3999C24.7265 25.3999 25.9982 24.8731 26.9359 23.9354ZM25.6233 18.7332C25.6233 18.8808 25.5647 19.0223 25.4604 19.1266L24.1859 20.3999L25.4604 21.6732C25.512 21.7249 25.553 21.7862 25.581 21.8537C25.6089 21.9212 25.6233 21.9935 25.6233 22.0666C25.6233 22.1396 25.6089 22.212 25.581 22.2794C25.553 22.3469 25.512 22.4082 25.4604 22.4599C25.4087 22.5116 25.3474 22.5525 25.2799 22.5805C25.2124 22.6084 25.1401 22.6228 25.0671 22.6228C24.994 22.6228 24.9217 22.6084 24.8542 22.5805C24.7867 22.5525 24.7254 22.5116 24.6737 22.4599L23.4004 21.1855L22.1271 22.4599C22.0754 22.5116 22.0141 22.5525 21.9466 22.5805C21.8791 22.6084 21.8068 22.6228 21.7337 22.6228C21.6607 22.6228 21.5883 22.6084 21.5209 22.5805C21.4534 22.5525 21.392 22.5116 21.3404 22.4599C21.2887 22.4082 21.2478 22.3469 21.2198 22.2794C21.1919 22.212 21.1775 22.1396 21.1775 22.0666C21.1775 21.9935 21.1919 21.9212 21.2198 21.8537C21.2478 21.7862 21.2887 21.7249 21.3404 21.6732L22.6148 20.3999L21.3404 19.1266C21.2361 19.0223 21.1775 18.8808 21.1775 18.7332C21.1775 18.5857 21.2361 18.4442 21.3404 18.3399C21.4447 18.2356 21.5862 18.177 21.7337 18.177C21.8813 18.177 22.0227 18.2356 22.1271 18.3399L23.4004 19.6143L24.6737 18.3399C24.778 18.2356 24.9195 18.177 25.0671 18.177C25.2146 18.177 25.3561 18.2356 25.4604 18.3399C25.5647 18.4442 25.6233 18.5857 25.6233 18.7332Z"
                              fill="url(#paint1_linear_1342_1637)"
                            />
                            <defs>
                              <linearGradient
                                id="paint0_linear_1342_1637"
                                x1="19.7664"
                                y1="0.37257"
                                x2="19.7476"
                                y2="30.0001"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stop-color="#101828" />
                                <stop offset="0.998509" stop-color="#0D1B37" />
                                <stop offset="1" stop-color="#0A1E46" />
                              </linearGradient>
                              <linearGradient
                                id="paint1_linear_1342_1637"
                                x1="19.2011"
                                y1="5.25335"
                                x2="19.1859"
                                y2="25.3999"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stop-color="#101828" />
                                <stop offset="0.998509" stop-color="#0D1B37" />
                                <stop offset="1" stop-color="#0A1E46" />
                              </linearGradient>
                            </defs>
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="team-line"></div>{" "}
                  </div>
                ))}
              </div>
            </div>
          </div>{" "}
          <div className=" mt-5 pagination px-5 ">
            <div className="recently-added">Showing 6 to 10 of 26 entries</div>
            <div className="pagination-btns">
              <button>Previous</button>
              <button className="btn-1-pag">1</button>
              <button>2</button>
              <button>3</button>
              <button>4</button>
              <button className="next-btn">Next</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default RunPayrollTable;
