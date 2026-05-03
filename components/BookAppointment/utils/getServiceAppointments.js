/**
 * Compute available and booked slots for a given day
 * Marks slots as booked if they're already in the system (avoiding double-booking)
 * 
 * @param {string} day - Date in YYYY-MM-DD format
 * @param {array} timeListData - Array of available time slots
 * @param {string} doctorName - Name of the doctor
 * @param {function} setServiceTimeList - State setter for the time list
 * @param {array} bookedAppointments - List of already booked appointments from context
 */
export const getServiceAppointments = async (day, timeListData, doctorName, setServiceTimeList, bookedAppointments = []) => {
    try {
        const availableTimes = timeListData.map((time) => {
            // Check if this exact slot (doctor + date + time) is already booked
            const isBooked = bookedAppointments.some(
                (apt) =>
                    apt.doctorName === doctorName &&
                    apt.appointmentDate === day &&
                    apt.appointmentTime === time.apptime
            );

            return {
                ...time,
                isBooked: isBooked,
            };
        });

        setServiceTimeList(availableTimes);
    } catch (error) {
        console.error(error);
    }
};
