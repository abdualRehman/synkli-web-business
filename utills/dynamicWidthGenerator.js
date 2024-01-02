import moment from "moment";

export const dynamicWidthgenerator = (start_date, end_date) => {
  console.log("newdaysDifference");
  if (start_date && end_date) {
    function convertDateFormat(inputDate) {
      // Split the input date into day, month, and year components
      const [day, month, year] = inputDate.split("-").map(Number);

      // Create a new Date object
      const convertedDate = new Date(Date.UTC(year, month - 1, day, 19, 0, 0));
      const formattedDate = convertedDate.toISOString().replace("Z", "Z");

      return formattedDate;
    }

    const inputDate = start_date;
    const outputDate = convertDateFormat(inputDate);
    const endOutputDate = convertDateFormat(end_date);

    const newstartDateStr = new Date(outputDate).toDateString();
    const newendDateStr = new Date(endOutputDate).toDateString();

    const formatedStartDate = moment(newstartDateStr).format("DD-MM-YYYY");
    const formatedEndDate = moment(newendDateStr).format("DD-MM-YYYY");

    const today = new Date();
    const formatedToday = moment(today).format("DD-MM-YYYY");

    var startDateStr = formatedStartDate;
    var endDateStr = formatedEndDate;

    // Parse the date strings into Date objects
    var startDateParts = startDateStr.split("-");
    var endDateParts = endDateStr.split("-");

    var startDate = new Date(
      startDateParts[2],
      startDateParts[1] - 1,
      startDateParts[0]
    );
    var endDate = new Date(
      endDateParts[2],
      endDateParts[1] - 1,
      endDateParts[0]
    );

    // Calculate the time difference in milliseconds
    var timeDifference = endDate - startDate;

    // Convert milliseconds to days
    var daysDifference = timeDifference / (1000 * 60 * 60 * 24);

    // console.log(daysDifference, "diff"); // Output: 10

    let width;

    if (formatedStartDate > formatedToday) {
      width = 100;
    } else {
      const res = 100 / daysDifference;
      var startDateStr = formatedStartDate;
      var endDateStr = formatedToday;
      // Parse the date strings into Date objects
      var startDateParts = startDateStr.split("-");
      var endDateParts = endDateStr.split("-");
      var startDate = new Date(
        startDateParts[2],
        startDateParts[1] - 1,
        startDateParts[0]
      );
      var endDate = new Date(
        endDateParts[2],
        endDateParts[1] - 1,
        endDateParts[0]
      );
      // Calculate the time difference in milliseconds
      var timeDifference = endDate - startDate;
      // Convert milliseconds to days
      var newdaysDifference = timeDifference / (1000 * 60 * 60 * 24);

      console.log({ newdaysDifference }, "newdaysDifference");

      const total = res * newdaysDifference;
      if (newdaysDifference === 0) {
        width = 100;
      } else if (total > 100) {
        width = 100;
      } else {
        width = total;
      }
    }

    return Math.ceil(parseInt(width));
  }
};
