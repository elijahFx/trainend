export default function getFormattedDateTime() {
    const now = new Date();
    
    // Get day, month, year, hours, and minutes
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    
    // Construct the formatted string
    return `${day}.${month}.${year} - ${hours}:${minutes}`;
  }
  
  