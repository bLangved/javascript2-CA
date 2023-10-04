/**
 * @param {string} date Retrieves a string f.ex: Date Mon Sep 25 2023 14:28:33 GMT+0200 (GMT+02:00)
 * @returns "f.ex: 14:28 September 25, 2023"
 */

export function formatDate(date) {
    try {
        // This check will throw an error if the date is not a proper instance, which will then be caught by the catch block.
        if (!(date instanceof Date)) {
            throw new Error("The provided argument is not a Date object.");
        }

        const monthNames = [
          "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ];
        
        const day = date.getDate();
        const monthIndex = date.getMonth();
        const year = date.getFullYear();

        // This will also throw an error if any of these values are NaN or undefined.
        if (isNaN(day) || isNaN(monthIndex) || isNaN(year)) {
            throw new Error("Date values are not valid numbers.");
        }

        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");

        // Return the formatted date only if all previous operations were successful.
        return `${hours}:${minutes} ${monthNames[monthIndex]} ${String(day).padStart(2, "0")}, ${year}`;

    } catch (error) {
        console.error("Error formatting date:", error);
        return "Cannot fetch date at this point.";
    }
}
