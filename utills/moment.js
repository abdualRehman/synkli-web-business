import moment from "moment";

export const formatHumanReadableDate = (dateString) => {
  console.log(dateString);
  const date = moment(dateString);
  const today = moment();

  const minutesAgo = today.diff(date, "minutes");
  if (minutesAgo < 1) {
    return "Recently Added";
  } else if (minutesAgo < 60) {
    return `${minutesAgo} minutes ago`;
  }

  const hoursAgo = today.diff(date, "hours");
  if (hoursAgo < 24) {
    return `${hoursAgo} hours ago`;
  }

  if (date.isSame(today, "day")) {
    return "today";
  }

  if (date.isSame(today.clone().subtract(1, "day"), "day")) {
    return "yesterday";
  }

  return date.format("DD/MM/YYYY hh:mm") ?? "";
};

export const formatTimestamp = (timestamp) => {
  const date = moment(parseInt(timestamp));
  return date.format("MMMM, DD, YYYY");
};
export const dateFromating = (timestamp) => {
  return moment.utc(timestamp, "DD-MM-YYYYTHH:mm:ss[Z]").format("DD-MM-YYYY");
};

export const formatTime = (timestamp) => {
  const date = moment(parseInt(timestamp));
  return date.format("hh:mm a");
};

export const formateDateAndTime = (timestamp) => {
  const date = moment(timestamp, "DD-MM-YYYYTHH:mm:ss[Z]");
  return date.format("MMMM, DD, YYYY hh:mm a");
};
export const formateDateTime = (timestamp) => {
  const date = moment(timestamp);
  return date.format("DD-MM-YYYY");
};

export const formateDate = (timestamp) => {
  const formattedDate = moment(timestamp, "DD-MM-YYYY").format("MMM DD, YYYY");

  // const date = moment(timestamp);
  // return date.format("MMM DD, YYYY");
  return formattedDate;
};

export const remainingDays = (targetDateStr) => {
  //   const startDate = "20-10-2023"; // Your start date in "DD-MM-YYYY" format
  // const endDate = "01-11-2023";   // Your end date in "DD-MM-YYYY" format

  // const startMoment = moment(startDate, "DD-MM-YYYY");
  // const endMoment = moment(endDate, "DD-MM-YYYY");

  // const daysDifference = endMoment.diff(startMoment, 'days');

  const targetDate = new Date(targetDateStr);
  const today = new Date();

  // Calculate the time difference in milliseconds
  const timeDifference = targetDate - today;

  // Calculate the number of days remaining
  const daysRemaining = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

  if (daysRemaining < 0) {
    return "Overdue";
  } else if (daysRemaining <= 5) {
    return `Due in ${daysRemaining} days `;
  } else {
    const date = moment(targetDateStr);
    return date.format("MMM DD, YYYY");
  }
};
export function getDueStatusWithTime(
  start_date,
  start_time,
  end_date,
  end_time
) {
  const today = moment();
  const endDate = moment(
    moment(`${end_date} ${end_time}`, "DD-MM-YYYY h:mm A").format(
      "YYYY-MM-DD HH:mm:ss"
    ),
    "YYYY-MM-DD HH:mm:ss"
  );
  const startDate = moment(
    moment(`${start_date} ${start_time}`, "DD-MM-YYYY h:mm A").format(
      "YYYY-MM-DD HH:mm:ss"
    ),
    "YYYY-MM-DD HH:mm:ss"
  );

  if (endDate.isBefore(today)) {
    return "Overdue";
  } else if (endDate.diff(startDate, "days") >= 5) {
    return endDate.format("DD-MM-YYYY");
  } else if (
    endDate.diff(startDate, "days") > 1 &&
    endDate.diff(startDate, "days") < 5
  ) {
    return `Due in ${endDate.diff(startDate, "days")} days`;
  } else if (
    endDate.diff(startDate, "hours") > 0 &&
    endDate.diff(startDate, "days") === 0
  ) {
    return `Due in ${endDate.diff(startDate, "hours")} hours`;
  } else if (
    endDate.diff(startDate, "minutes") > 0 &&
    endDate.diff(startDate, "hours") === 0
  ) {
    return `Due in ${endDate.diff(startDate, "minutes")} minutes`;
  } else {
    return "Overdue";
  }
}
export function getDueStatus(start_date, end_date) {
  const today = moment();
  const endDate = moment(end_date, "DD-MM-YYYY");
  const startDate = moment(start_date, "DD-MM-YYYY");
  const daysDifference = endDate.diff(startDate, "days");

  if (endDate.isBefore(today)) {
    return "Overdue";
  } else if (endDate.isSame(startDate)) {
    return `Due in 1 day`;
  } else if (daysDifference < 5) {
    return `Due in ${daysDifference} days`;
  } else if (endDate.isAfter(today) && daysDifference >= 1) {
    return endDate.format("DD-MM-YYYY");
  } else {
    return "Overdue";
  }
}

export function bitsToMegabytes(bits) {
  // Convert bits to megabytes
  const megabytes = bits / 8 / 1024 / 1024; // 1 byte = 8 bits, 1 KB = 1024 bytes, 1 MB = 1024 KB

  // Round the result to 2 decimal places
  const roundedMegabytes = Math.round(megabytes * 100) / 100;

  return roundedMegabytes;
}

export function filterDataByDate(data, selectedDate) {
  console.log(selectedDate, "selectedDate");
  if (!selectedDate) {
    return data;
  }
  const filterDate = moment(selectedDate, "DD-MM-YYYY");
  const filteredData = data.filter((entry) => {
    const entryDate = moment(entry.created_at, "DD-MM-YYYY");
    const isAfterOrOnSelectedDate = entryDate.isSameOrAfter(filterDate);
    return isAfterOrOnSelectedDate;
  });
  // const filteredData = data.filter((item) => {
  // // Convert the 'created_at' timestamp to a moment object
  // const itemDateMoment = moment(parseInt(item.created_at));
  // const formattedItemDate = itemDateMoment.format("DD-MM-YYYY");
  // // console.log(
  // //   formattedItemDate,
  // //   selectedDateMoment.format("DD-MM-YYYY"),
  // //   "dateeee"
  // // );
  // // Compare the item's date with the selected date
  // return itemDateMoment.isSameOrAfter(selectedDateMoment, "day");
  // });

  return filteredData;
}

export function datePickerFormate(inputDateString) {
  // Parse the input date string using moment
  const parsedDate = moment(inputDateString, "DD-MM-YYYY");

  // Format the date to the desired string format
  const formattedDateString = parsedDate.toString();

  return formattedDateString;
}
