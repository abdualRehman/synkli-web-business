import { motion } from "framer-motion";
import { useState } from "react";
import {
  NotificationManager,
  NotificationContainer,
} from "react-notifications";
import { ImageIcon } from "../../../../../utills/svgs/ImageIcon";
const AddBooking = ({ toggleAddBooking }) => {
  const [calendars, setCalendars] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [bookingTypes, setBookingTypes] = useState([]);

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const [emailInput, setEmailInput] = useState("");
  const [emails, setEmails] = useState([]);

  const [bookingWord, setBookingWord] = useState("");
  const [bookingWords, setBookingWords] = useState([]);

  const handleBookingWordChange = (e) => {
    setBookingWord(e.target.value);
  };

  const handleBookingWords = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addBookingWord();
    }
  };

  const addBookingWord = () => {
    const trimmedInput = bookingWord.trim();
    if (trimmedInput) {
      setBookingWords((prevWords) => [...prevWords, trimmedInput]);
      setBookingWord("");
    }
  };

  const removeBookingWord = (index) => {
    const newBookingWordArr = [...bookingWords];
    newBookingWordArr.splice(index, 1);
    setBookingWords(newBookingWordArr);
  };

  const handleInputChangeTwo = (e) => {
    setEmailInput(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addEmail();
    }
  };

  const addEmail = () => {
    const trimmedInput = emailInput.trim();
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(trimmedInput)) {
      return NotificationManager.error("Please enter valid email");
    }
    if (trimmedInput) {
      setEmails((prevEmails) => [...prevEmails, trimmedInput]);
      setEmailInput("");
    }
  };

  const removeEmail = (index) => {
    const emailsArr = [...emails];
    emailsArr.splice(index, 1);
    setEmails(emailsArr);
  };

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleBookingTypeChange = (e) => {
    const selectedOption = e.target.value;
    const newCalendars = [...bookingTypes];

    let alreadyExist = false;
    newCalendars.forEach((value) => {
      if (value === selectedOption || selectedOption === "Select an option") {
        alreadyExist = true;
      }
    });
    if (!alreadyExist) {
      setBookingTypes((prevTypes) => [...prevTypes, selectedOption]);
    }
  };

  const removeSelectedType = (index) => {
    const newCalendars = [...bookingTypes];
    newCalendars.splice(index, 1);
    setBookingTypes(newCalendars);
  };

  const handleSelectChange = (e) => {
    const selectedOption = e.target.value;
    const newCalendars = [...calendars];
    let alreadyExist = false;
    newCalendars.forEach((value) => {
      if (value === selectedOption || selectedOption === "Select an option") {
        alreadyExist = true;
      }
    });
    if (!alreadyExist) {
      setCalendars((prevCalendars) => [...prevCalendars, selectedOption]);
    }
  };

  const removeSelectedCalendar = (index) => {
    const newCalendars = [...calendars];
    newCalendars.splice(index, 1);
    setCalendars(newCalendars);
  };

  return (
    <div className="add-p-side grid grid-cols-5 ">
      <div className="md:col-span-3 hidden md:block left-side"></div>
      <div className="right-side col-span-5 md:col-span-2">
        <motion.div
          initial={{ x: 700 }}
          animate={{ x: 0 }}
          transition={{ delay: 0.2, type: "tween", duration: 0.4 }}
          className="inner-right relative add-booking-inner"
        >
          <NotificationContainer />

          <div>
            <div
              onClick={toggleAddBooking}
              className="absolute   text-white p-2 right-1 top-1 cursor-pointer"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 26 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="13" cy="13" r="13" fill="#666666" />
                <path
                  d="M19 8L8 19"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                />
                <path
                  d="M19 19L8 8"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
            </div>

            <div className="add-detail pt-10 px-5">
              <div className="flex gap-2 items-center">
                <div>
                  <svg
                    width="12"
                    height="13"
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
                <div className="title">Booking Question Form</div>
              </div>

              <div className="jumbo-dir mt-2">
                Workspace &gt; Appointments &gt; Online Booking &gt; Booking
                Page{" "}
                <span className="special-jumbo-text"> &gt; Add Booking</span>
              </div>
            </div>
          </div>

          <div className="add-booking-height-container">
            <div className="add-booking-container">
              <div className="add-ann-form mx-5 mt-3">
                <div>
                  <label>Page Name</label>
                </div>
                <div>
                  <input type="text" placeholder="Select" />
                </div>
                <div className="mt-2">
                  <label>Calendars</label>
                </div>
              </div>
            </div>

            <div>
              <div className="select-calendars-container mx-5 mt-2">
                <div>
                  <select
                    onChange={handleSelectChange}
                    className="calendar-select"
                  >
                    <option value="Select an option">Select an option</option>
                    <option value="Prospect Office">Prospect Office</option>
                    <option value="Salisbury Office">Salisbury Office</option>
                  </select>
                </div>
                <div className="flex gap-2 selected-calendars">
                  {calendars.map((calendar, index) => (
                    <div
                      onClick={() => removeSelectedCalendar(index)}
                      className="selected-calendar flex gap-2 items-center cursor-pointer"
                    >
                      <div> {calendar}</div>
                      <div>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 26 26"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect width="26" height="26" rx="13" fill="#666666" />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M17.2929 18.7071C17.6834 19.0976 18.3166 19.0976 18.7071 18.7071C19.0976 18.3166 19.0976 17.6834 18.7071 17.2929L14.4142 13L18.7071 8.70711C19.0976 8.31658 19.0976 7.68342 18.7071 7.29289C18.3166 6.90237 17.6834 6.90237 17.2929 7.29289L13 11.5858L8.70711 7.29289C8.31658 6.90237 7.68342 6.90237 7.29289 7.29289C6.90237 7.68342 6.90237 8.31658 7.29289 8.70711L11.5858 13L7.29289 17.2929C6.90237 17.6834 6.90237 18.3166 7.29289 18.7071C7.68342 19.0976 8.31658 19.0976 8.70711 18.7071L13 14.4142L17.2929 18.7071Z"
                            fill="white"
                          />
                        </svg>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mx-5 mt-2 add-ann-form">
              <div className="flex gap-1 items-center">
                <div>
                  <input type="checkbox" />
                </div>
                <div>
                  <label>
                    Allow client to choose which calendar to book to
                  </label>
                </div>
              </div>

              <div>
                <label>Booking a lot Logic</label>
              </div>
              <div className="mt-1">
                {/* <label>
                                <input
                                type="radio"
                                name="options"
                                value="Option 1"
                                checked={selectedOption === 'Option 1'}
                                onChange={handleOptionChange}
                                />
                                <span className="ml-1">All Calendar must be Free at the Requested Date & TIme</span>
                            </label>
                            <br /> */}
                {/* <label>
                                <input
                                type="radio"
                                name="options"
                                value="Option 2"
                                checked={selectedOption === 'Option 2'}
                                onChange={handleOptionChange}
                                />
                               <span className="ml-1"> Booking will be Available if ANY Calendar has Available Dae & Time</span>
                            </label>
                            <br />   
                            <label>
                                <input
                                type="radio"
                                name="options"
                                value="Option 3"
                                checked={selectedOption === 'Option 3'}
                                onChange={handleOptionChange}
                                />
                               <span className="ml-1"> Select Calendar must be Free at the Requested Date & Time</span>
                            </label> */}
              </div>

              <div className="mt-2">
                <label>Must also be Available</label>
              </div>
              <div>
                <select>
                  <option value="" disabled selected>
                    Select
                  </option>
                </select>
              </div>
              <div className="mt-1">
                <label>Booking</label>
              </div>
              <div>
                <select>
                  <option value="" selected disabled>
                    Calendar
                  </option>
                </select>
              </div>

              <div className="mt-1">
                <label>Booking types</label>
              </div>
            </div>

            <div>
              <div className="select-calendars-container mx-5 mt-1">
                <div>
                  <select
                    onChange={handleBookingTypeChange}
                    className="calendar-select"
                  >
                    <option value="Select an option">Select an option</option>
                    <option value="Tax Rate (30 min)">Tax Rate (30 min)</option>
                    <option value="Salisbury Office">Salisbury Office</option>
                  </select>
                </div>
                <div className="flex gap-2 selected-calendars">
                  {bookingTypes.map((calendar, index) => (
                    <div
                      onClick={() => removeSelectedType(index)}
                      className="selected-calendar flex gap-2 items-center cursor-pointer"
                    >
                      <div> {calendar}</div>
                      <div>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 26 26"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect width="26" height="26" rx="13" fill="#666666" />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M17.2929 18.7071C17.6834 19.0976 18.3166 19.0976 18.7071 18.7071C19.0976 18.3166 19.0976 17.6834 18.7071 17.2929L14.4142 13L18.7071 8.70711C19.0976 8.31658 19.0976 7.68342 18.7071 7.29289C18.3166 6.90237 17.6834 6.90237 17.2929 7.29289L13 11.5858L8.70711 7.29289C8.31658 6.90237 7.68342 6.90237 7.29289 7.29289C6.90237 7.68342 6.90237 8.31658 7.29289 8.70711L11.5858 13L7.29289 17.2929C6.90237 17.6834 6.90237 18.3166 7.29289 18.7071C7.68342 19.0976 8.31658 19.0976 8.70711 18.7071L13 14.4142L17.2929 18.7071Z"
                            fill="white"
                          />
                        </svg>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <div className="mx-5 mt-2 add-ann-form">
                <label>Address Where new Bookings should be Emailed to</label>
              </div>
              <div className="select-calendars-container mx-5 mt-1">
                <div>
                  <input
                    onChange={handleInputChangeTwo}
                    onKeyPress={handleKeyPress}
                    value={emailInput}
                    type="email"
                    className="address-input"
                  />
                </div>
                <div className="flex gap-2 selected-calendars">
                  {emails.map((email, index) => (
                    <div
                      onClick={() => removeEmail(index)}
                      className="selected-calendar flex gap-2 items-center cursor-pointer"
                    >
                      <div> {email}</div>
                      <div>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 26 26"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect width="26" height="26" rx="13" fill="#666666" />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M17.2929 18.7071C17.6834 19.0976 18.3166 19.0976 18.7071 18.7071C19.0976 18.3166 19.0976 17.6834 18.7071 17.2929L14.4142 13L18.7071 8.70711C19.0976 8.31658 19.0976 7.68342 18.7071 7.29289C18.3166 6.90237 17.6834 6.90237 17.2929 7.29289L13 11.5858L8.70711 7.29289C8.31658 6.90237 7.68342 6.90237 7.29289 7.29289C6.90237 7.68342 6.90237 8.31658 7.29289 8.70711L11.5858 13L7.29289 17.2929C6.90237 17.6834 6.90237 18.3166 7.29289 18.7071C7.68342 19.0976 8.31658 19.0976 8.70711 18.7071L13 14.4142L17.2929 18.7071Z"
                            fill="white"
                          />
                        </svg>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="address-msg mt-1 mx-5">
                You can add multiple emails by putting comma
              </div>
            </div>

            <div>
              <div className="mx-5 mt-2 add-ann-form">
                <label>
                  Also allow bookings with appointments containing any of these
                  words
                </label>
              </div>
              <div className="select-calendars-container mx-5 mt-1">
                <div>
                  <input
                    onChange={handleBookingWordChange}
                    onKeyPress={handleBookingWords}
                    value={bookingWord}
                    type="email"
                    className="address-input"
                  />
                </div>
                <div className="flex gap-2 selected-calendars">
                  {bookingWords.map((word, index) => (
                    <div
                      onClick={() => removeBookingWord(index)}
                      className="selected-calendar flex gap-2 items-center cursor-pointer"
                    >
                      <div> {word}</div>
                      <div>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 26 26"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect width="26" height="26" rx="13" fill="#666666" />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M17.2929 18.7071C17.6834 19.0976 18.3166 19.0976 18.7071 18.7071C19.0976 18.3166 19.0976 17.6834 18.7071 17.2929L14.4142 13L18.7071 8.70711C19.0976 8.31658 19.0976 7.68342 18.7071 7.29289C18.3166 6.90237 17.6834 6.90237 17.2929 7.29289L13 11.5858L8.70711 7.29289C8.31658 6.90237 7.68342 6.90237 7.29289 7.29289C6.90237 7.68342 6.90237 8.31658 7.29289 8.70711L11.5858 13L7.29289 17.2929C6.90237 17.6834 6.90237 18.3166 7.29289 18.7071C7.68342 19.0976 8.31658 19.0976 8.70711 18.7071L13 14.4142L17.2929 18.7071Z"
                            fill="white"
                          />
                        </svg>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="address-msg mt-1 mx-5">
                You can add multiple Words by putting comma
              </div>
            </div>

            <div className="mx-5 mt-3 add-ann-form">
              <div className="flex gap-1 items-center">
                <div>
                  <input type="checkbox" />
                </div>
                <div>
                  <label>On Complete Redirect to External URL</label>
                </div>
              </div>
            </div>

            <div className="add-ann-form mx-5">
              <label>Upload Logo</label>
            </div>

            <div className="mt-2 mx-5">
              <div>
                <div>
                  <div className=" mt-2 add-booking-logo">
                    <label htmlFor="file-input" className="upload-app-label">
                      <div className="add-app-camera flex justify-center">
                        <ImageIcon />
                      </div>
                      <div className="add-app-camera-text mt-2">
                        Click to <br /> upload
                      </div>
                    </label>
                  </div>
                  <input
                    id="file-input"
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    style={{ display: "none" }}
                  />
                </div>

                <div className=" mt-5">
                  <div>
                    {selectedFile && (
                      <div className="selected-file-show flex gap-1 items-center">
                        <div>
                          <svg
                            width="12"
                            height="11"
                            viewBox="0 0 16 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M6.77958 8.64415C7.13445 8.96061 7.13445 9.47994 6.77958 9.79641C6.44201 10.1129 5.88806 10.1129 5.5505 9.79641C4.73981 9.03524 4.28447 8.00357 4.28447 6.92793C4.28447 5.85228 4.73981 4.82061 5.5505 4.05944L8.61454 1.1869C9.42645 0.426881 10.5269 0 11.6743 0C12.8216 0 13.9221 0.426881 14.734 1.1869C15.5447 1.94807 16 2.97974 16 4.05539C16 5.13103 15.5447 6.16271 14.734 6.92387L13.4443 8.13293C13.453 7.46754 13.3404 6.80215 13.0981 6.16922L13.5049 5.77972C13.7475 5.5547 13.9402 5.28679 14.0716 4.9915C14.2031 4.69622 14.2708 4.37942 14.2708 4.05944C14.2708 3.73947 14.2031 3.42267 14.0716 3.12739C13.9402 2.8321 13.7475 2.56419 13.5049 2.33917C13.2649 2.11168 12.9791 1.93109 12.6641 1.80784C12.3492 1.68459 12.0112 1.62113 11.6699 1.62113C11.3286 1.62113 10.9907 1.68459 10.6757 1.80784C10.3608 1.93109 10.075 2.11168 9.83496 2.33917L6.77958 5.20359C6.53693 5.42862 6.3443 5.69653 6.21283 5.99181C6.08137 6.2871 6.01367 6.60389 6.01367 6.92387C6.01367 7.24384 6.08137 7.56064 6.21283 7.85593C6.3443 8.15121 6.53693 8.41912 6.77958 8.64415ZM9.22042 5.20359C9.55799 4.88713 10.1119 4.88713 10.4495 5.20359C11.2602 5.96476 11.7155 6.99643 11.7155 8.07207C11.7155 9.14772 11.2602 10.1794 10.4495 10.9406L7.38546 13.8131C6.57355 14.5731 5.4731 15 4.32575 15C3.17839 15 2.07794 14.5731 1.26603 13.8131C0.455339 13.0519 0 12.0203 0 10.9446C0 9.86897 0.455339 8.8373 1.26603 8.07613L2.5557 6.86707C2.54704 7.53246 2.65956 8.19785 2.90192 8.83889L2.49511 9.22028C2.25246 9.4453 2.05983 9.71321 1.92837 10.0085C1.7969 10.3038 1.72921 10.6206 1.72921 10.9406C1.72921 11.2605 1.7969 11.5773 1.92837 11.8726C2.05983 12.1679 2.25246 12.4358 2.49511 12.6608C2.73514 12.8883 3.02091 13.0689 3.33588 13.1922C3.65085 13.3154 3.98877 13.3789 4.33007 13.3789C4.67138 13.3789 5.0093 13.3154 5.32427 13.1922C5.63924 13.0689 5.92501 12.8883 6.16504 12.6608L9.22042 9.79641C9.46307 9.57138 9.6557 9.30348 9.78717 9.00819C9.91864 8.7129 9.98633 8.39611 9.98633 8.07613C9.98633 7.75616 9.91864 7.43936 9.78717 7.14407C9.6557 6.84879 9.46307 6.58088 9.22042 6.35585C9.13636 6.282 9.06935 6.19277 9.02354 6.09368C8.97773 5.99458 8.9541 5.88772 8.9541 5.77972C8.9541 5.67172 8.97773 5.56487 9.02354 5.46577C9.06935 5.36667 9.13636 5.27744 9.22042 5.20359Z"
                              fill="white"
                            />
                          </svg>
                        </div>
                        <div className="selected-file-name">
                          {" "}
                          {selectedFile.name.slice(0, 10)}{" "}
                        </div>
                        <div
                          onClick={() => setSelectedFile("")}
                          className="cursor-pointer"
                        >
                          <svg
                            width="12"
                            height="13"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle cx="9" cy="9" r="9" fill="#666666" />
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M13.1835 6.24614C13.574 5.8556 13.574 5.22244 13.1834 4.83193C12.7929 4.44142 12.1597 4.44144 11.7692 4.83198L9.00848 7.59295L6.24459 4.84288C5.85309 4.45334 5.21993 4.45492 4.83038 4.84643C4.44084 5.23793 4.44242 5.87109 4.83393 6.26063L7.59431 9.00722L4.83193 11.7698C4.44142 12.1604 4.44144 12.7935 4.83198 13.184C5.22252 13.5745 5.85569 13.5745 6.2462 13.184L9.01207 10.4179L11.7712 13.1632C12.1627 13.5528 12.7959 13.5512 13.1854 13.1597C13.575 12.7682 13.5734 12.135 13.1819 11.7455L10.4262 9.00361L13.1835 6.24614Z"
                              fill="white"
                            />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="add-ann-form mx-5 mt-2">
                <div>
                  <label>Set Timezone</label>
                </div>
                <div>
                  <select>
                    <option value="(UTC+09:34) Adelaide">
                      (UTC+09:34) Adelaide
                    </option>
                  </select>
                </div>

                <div className="flex gap-1 items-center mt-2">
                  <div>
                    <input type="checkbox" />
                  </div>
                  <div>
                    <label>isActive</label>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-5 items-center my-5">
              <button className="cancel-booking-btn">Cancel</button>
              <button className="save-booking-btn">Save</button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AddBooking;
