export const isAnyValueEmpty = (questionsArray) => {
  return questionsArray.some((question) => question.value === "");
};

export const isQuestionIdRepeated = (questionsArray) => {
  const questionIdsSet = new Set();

  for (const question of questionsArray) {
    if (questionIdsSet.has(question.question_id)) {
      return true;
    }
    questionIdsSet.add(question.question_id);
  }

  return false;
};

export function hasNullOrEmpty(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === null || arr[i] === "") {
      return true;
    }
  }
  return false;
}

export function validateAustralianPhoneNumber(phoneNumber) {
  const phoneRegex = /^(\+?61|0)4\d{8}$/;

  return phoneRegex.test(phoneNumber);
}

export const convertStringToArr = (str) => {
  console.log(JSON.parse(str));
};

export function countWords(inputString) {
  // Use a regular expression to split the string by spaces
  // The regular expression /\s+/ matches one or more whitespace characters (spaces, tabs, etc.)
  const wordsArray = inputString?.split(/\s+/);

  // Filter out any empty strings from the array
  const nonEmptyWordsArray = wordsArray?.filter((word) => word.length > 0);

  // Return the length of the filtered array, which represents the total number of words
  return nonEmptyWordsArray?.length;
}

export const getFirst250Words = (text) => {
  const wordsArray = text.split(/\s+/);
  const nonEmptyWordsArray = wordsArray.filter((word) => word.length > 0);
  const first250Words = nonEmptyWordsArray.slice(0, 250);
  return first250Words.join(" ");
};

export function convertMinutesToHours(minutes) {
  if (typeof minutes !== "number" || minutes < 0) {
    throw new Error(
      "Invalid input. Please provide a non-negative number of minutes."
    );
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours === 0) {
    return `${remainingMinutes} ${
      remainingMinutes === 1 ? "minute" : "minutes"
    }`;
  }

  const hourString = hours === 1 ? "hour" : "hours";
  const minuteString =
    remainingMinutes > 0 ? ` ${remainingMinutes} minutes` : "";

  if (remainingMinutes === 0) {
    return `${hours} ${hourString}`;
  }

  const fractionHour = remainingMinutes / 60;
  return `${hours}${hourString} ${fractionHour} ${
    fractionHour === 1 ? "hour" : "hours"
  }`;
}

export function getFirstWords(inputString, numberOfWords) {
  // Remove leading and trailing whitespaces
  const trimmedString = inputString.trim();

  // Split the string into words
  const wordsArray = trimmedString.split(/\s+/);

  // Take the specified number of words or all if the requested number is greater than the total words
  const selectedWords = wordsArray.slice(0, numberOfWords);

  // Join the selected words back into a string
  const result = selectedWords.join(" ");

  return result;
}

export function DataURIToBlob(dataURI) {
  console.log(dataURI, "datauri");
  if (dataURI) {
    const splitDataURI = dataURI?.split(",");
    const byteString =
      splitDataURI[0]?.indexOf("base64") >= 0
        ? atob(splitDataURI[1])
        : decodeURI(splitDataURI[1]);
    const mimeString = splitDataURI[0]?.split(":")[1]?.split(";")[0];

    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++)
      ia[i] = byteString.charCodeAt(i);

    return new Blob([ia], { type: mimeString });
  }
}

export function dataURIToBlobTwo(dataURI, fileName) {
  if (dataURI) {
    const splitDataURI = dataURI?.split(",");
    const byteString =
      splitDataURI[0].indexOf("base64") >= 0
        ? atob(splitDataURI[1])
        : decodeURI(splitDataURI[1]);
    const mimeString = splitDataURI[0]?.split(":")[1]?.split(";")[0];

    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([ia], { type: mimeString });

    // Add a property to the blob with the file name
    blob.fileName = fileName;

    return blob;
  }
}

export function hasAtLeastTwoSameValues(arr) {
  const lowercasedArray = arr.map((value) => value.toLowerCase());

  for (let i = 0; i < lowercasedArray.length; i++) {
    for (let j = i + 1; j < lowercasedArray.length; j++) {
      if (lowercasedArray[i] === lowercasedArray[j]) {
        return true; // Found at least two same values (case-insensitive)
      }
    }
  }
  return false; // No two same values found
}
