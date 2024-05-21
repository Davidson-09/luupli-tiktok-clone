export function convertToCustomTimeString(dateTime: string): string {
  // Parse the date-time string to a Date object
  const date = new Date(dateTime);

  // Extract the hours and minutes
  let hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();

  // Convert hours to the range [0, 12)
  hours = hours % 12;

  // If hours is 0, set it to 12 (for 12-hour clock format)
  if (hours === 0) {
    hours = 12;
  }

  // Add 35 minutes to the time
  const totalMinutes = hours * 60 + minutes + 35;
  const newHours = Math.floor(totalMinutes / 60);
  const newMinutes = totalMinutes % 60;

  // Convert the new hours to the range [0, 12)
  const finalHours = newHours % 12;

  // If final hours is 0, set it to 12 (for 12-hour clock format)
  const formattedHours = finalHours === 0 ? 12 : finalHours;

  // Format the time string
  const formattedMinutes = newMinutes.toString().padStart(2, '0');

  return `${formattedHours}:${formattedMinutes}`;
}
