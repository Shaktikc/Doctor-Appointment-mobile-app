// Mock bookings (replace with real data if needed)
const bookedApps = [];

export const getServiceAppointments = async (day, timeListData, serviceId, setServiceTimeList) => {
    try {
        const allBookings = [...bookedApps];

        const serviceBookings = allBookings.filter(
            (app) =>
                app.serviceId === serviceId &&
                app.bookedDate === day
        );

        const availableTimes = timeListData.map((time) => {
            const bookedHour = serviceBookings.some(
                (app) => app.bookedTime === time.apptime
            );

            return {
                ...time,
                isBooked: bookedHour,
            };
        });

        setServiceTimeList(availableTimes);
    } catch (error) {
        console.error(error);
    }
};
