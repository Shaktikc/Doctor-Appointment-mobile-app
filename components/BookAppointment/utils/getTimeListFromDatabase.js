import { getAvailableSlotsForDoctor } from "../../../data/DoctorAvailability";

export const getTimeListFromDatabase = async (doctorName, dateString) => {
    try {
        // await new Promise((res) => setTimeout(res, 200));

        const availableSlots = getAvailableSlotsForDoctor(
            doctorName,
            dateString
        );

        const formattedTimes = availableSlots.map((time, index) => ({
            id: index + 1,
            apptime: time,
        }));

        return formattedTimes;
    } catch (error) {
        console.error(error);
        return [];
    }
};
