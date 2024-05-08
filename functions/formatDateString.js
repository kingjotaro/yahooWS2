async function formatDateString(dateString) {
    // Remove the first and last characters
    let date = dateString.slice(1, -1);
    
    // Split the date into parts
    let splitDate = date.split(', ');
    let monthDay = splitDate[0].split(' ');
    
    // Extract month, day, and year
    let month = monthDay[0];
    let day = monthDay[1];
    let year = splitDate[1];

    // Convert month and day to two digits if necessary
    function formatTwoDigits(str) {
        return str.length === 1 ? '0' + str : str;
    }

    // Map month names to month numbers
    const monthMap = {
        'Dec': '12', 'Nov': '11', 'Oct': '10', 'Sep': '09', 'Aug': '08', 'Jul': '07',
        'Jun': '06', 'May': '05', 'Apr': '04', 'Mar': '03', 'Feb': '02', 'Jan': '01'
    };

    // Format month and day to two digits
    month = formatTwoDigits(monthMap[month]);
    day = formatTwoDigits(day);

    // Return the formatted date string
    return day + month + year;
}

export default formatDateString;
