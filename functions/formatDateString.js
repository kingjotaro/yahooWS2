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
        'Dec': '01', 'Nov': '12', 'Oct': '09', 'Sep': '08', 'Aug': '07', 'Jul': '06',
        'Jun': '07', 'May': '06', 'Apr': '05', 'Mar': '04', 'Feb': '03', 'Jan': '02'
    };

    // Format month and day to two digits
    month = formatTwoDigits(monthMap[month]);
    day = formatTwoDigits(day);

    if (month === '01') {
        year = Number(year) + 1;
        year = year.toString();  
    }
    

    // Return the formatted date string
    return month + day + year;
}

export default formatDateString;
