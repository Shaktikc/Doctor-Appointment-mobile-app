/**
 * Doctors Data
 * Contains all doctor information
 */

export const doctorsData = [
  {
    id: "1",
    name: "Christy Schumm",
    categories: ["Cardiologist", "Internal Medicine"],
    location: "New York",
    experience: "10 years",
    education: "MD, Cardiology",
    languages: ["English", "Spanish"],
    bio: "Christy Schumm is an experienced cardiologist with a passion for helping patients improve their heart health. She has a strong educational background and is fluent in multiple languages.",
    rating: 4.9,
    reviews: 150,
    photo:
      "https://plus.unsplash.com/premium_photo-1681996484614-6afde0d53071?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "2",
    name: "Natalia Stanton Jr.",
    categories: ["Dermatologist", "Allergist"],
    location: "Los Angeles",
    experience: "8 years",
    education: "MD, Dermatology",
    languages: ["English", "French"],
    bio: "Natalia Stanton Jr. specializes in dermatology and allergology. She is known for her compassionate care and expertise in treating skin conditions and allergies.",
    rating: 4.8,
    reviews: 120,
    photo:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "3",
    name: "Nola Murazik V",
    categories: ["Pediatrician"],
    location: "Chicago",
    experience: "12 years",
    education: "MD, Pediatrics",
    languages: ["English"],
    bio: "Nola Murazik V is a dedicated pediatrician with over a decade of experience. She provides comprehensive care for children from infancy to adolescence.",
    rating: 4.7,
    reviews: 100,
    photo:
      "https://images.unsplash.com/photo-1612349316228-5942a9b489c2?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "4",
    name: "Elyssa O'Kon",
    categories: ["Orthopedic Surgeon"],
    location: "San Francisco",
    experience: "15 years",
    education: "MD, Orthopedic Surgery",
    languages: ["English", "Spanish"],
    bio: "Elyssa O'Kon is a skilled orthopedic surgeon specializing in joint and bone-related surgeries. She is committed to helping patients regain mobility and strength.",
    rating: 4.9,
    reviews: 140,
    photo:
      "https://images.unsplash.com/photo-1484863137850-59afcfe05386?auto=format&fit=crop&q=80&w=2071&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "5",
    name: "Geovany Keebler",
    categories: ["Gynecologist", "Obstetrician"],
    location: "Miami",
    experience: "9 years",
    education: "MD, Obstetrics and Gynecology",
    languages: ["English", "Spanish"],
    bio: "Dr. Geovany Keebler provides comprehensive women's health services with a focus on gynecological and obstetric care. They are dedicated to ensuring the well-being of their patients.",
    rating: 4.7,
    reviews: 110,
    photo:
      "https://cdn.pixabay.com/photo/2017/01/29/21/16/nurse-2019420_1280.jpg",
  },
  {
    id: "6",
    name: "Ramy Malik",
    categories: ["Orthodontist"],
    location: "Chicago",
    experience: "30 years",
    education: "DMD, Orthodontics",
    languages: ["English"],
    bio: "Ramy Malik is an orthodontist who specializes in straightening teeth and correcting bites. He is known for creating beautiful smiles for his patients.",
    rating: 4.8,
    reviews: 130,
    photo:
      "https://cdn.pixabay.com/photo/2017/05/23/17/12/doctor-2337835_1280.jpg",
  },
];

/**
 * Doctor Availability Configuration
 * Defines working hours and timezone for each doctor
 */
export const doctorDataWithSchedule = [
  {
    name: "Christy Schumm",
    timezone: "Australia/Sydney",
    schedule: [
      { day_of_week: "Monday", available_at: "09:00", available_until: "17:30" },
      { day_of_week: "Tuesday", available_at: "08:00", available_until: "16:00" },
      { day_of_week: "Thursday", available_at: "09:00", available_until: "16:00" },
      { day_of_week: "Friday", available_at: "07:00", available_until: "14:00" },
    ],
  },
  {
    name: "Natalia Stanton Jr.",
    timezone: "Australia/Perth",
    schedule: [
      { day_of_week: "Tuesday", available_at: "08:00", available_until: "10:00" },
      { day_of_week: "Wednesday", available_at: "11:00", available_until: "18:00" },
      { day_of_week: "Saturday", available_at: "09:00", available_until: "15:00" },
      { day_of_week: "Sunday", available_at: "08:00", available_until: "15:00" },
    ],
  },
  {
    name: "Nola Murazik V",
    timezone: "Australia/Darwin",
    schedule: [
      { day_of_week: "Monday", available_at: "08:00", available_until: "10:00" },
      { day_of_week: "Tuesday", available_at: "11:00", available_until: "13:00" },
      { day_of_week: "Wednesday", available_at: "08:00", available_until: "10:00" },
      { day_of_week: "Saturday", available_at: "08:00", available_until: "11:00" },
      { day_of_week: "Sunday", available_at: "07:00", available_until: "09:00" },
    ],
  },
  {
    name: "Elyssa O'Kon",
    timezone: "Australia/Perth",
    schedule: [
      { day_of_week: "Monday", available_at: "09:00", available_until: "15:00" },
      { day_of_week: "Tuesday", available_at: "06:00", available_until: "13:00" },
      { day_of_week: "Wednesday", available_at: "06:00", available_until: "11:00" },
      { day_of_week: "Friday", available_at: "08:00", available_until: "12:00" },
      { day_of_week: "Saturday", available_at: "09:00", available_until: "16:00" },
      { day_of_week: "Sunday", available_at: "08:00", available_until: "10:00" },
    ],
  },
  {
    name: "Geovany Keebler",
    timezone: "Australia/Perth",
    schedule: [
      { day_of_week: "Thursday", available_at: "07:00", available_until: "14:00" },
      { day_of_week: "Thursday", available_at: "15:00", available_until: "17:00" },
    ],
  },
  {
    name: "Ramy Malik",
    timezone: "Australia/Perth",
    schedule: [
      { day_of_week: "Monday", available_at: "09:00", available_until: "15:00" },
      { day_of_week: "Tuesday", available_at: "06:00", available_until: "13:00" },
      { day_of_week: "Wednesday", available_at: "06:00", available_until: "11:00" },
      { day_of_week: "Friday", available_at: "08:00", available_until: "12:00" },
    ],
  },
];
