# React Native Appointment Booking App - Architecture Documentation

## 📋 Overview

This is a production-ready React Native + Expo appointment booking application restructured using **professional enterprise architecture patterns** used by senior React Native engineers.

## 🏗️ Architecture Overview

```
src/
├── api/                    # API and external service integrations
├── components/             # Reusable UI components
│   ├── Button/
│   ├── CustomButton/
│   ├── ErrorHandler/
│   ├── TimeSlot/
│   ├── TopDoctor/
│   ├── TestimonialList/
│   ├── ViewDoctorProfile/
│   ├── BookAppointment/    # Feature component
│   └── index.js            # Central exports
├── context/                # React Context providers
│   ├── BookAppointmentContext.js
│   └── index.js
├── data/                   # Static data and database queries
│   ├── data.js             # Doctor data and availability
│   ├── DoctorAvailability.js
│   └── index.js
├── hooks/                  # Custom React hooks
│   ├── useBookAppointment.js
│   └── index.js
├── navigation/             # Navigation configuration
│   ├── AppNavigation.js
│   └── index.js
├── screens/                # Screen components (containers)
│   ├── HomeScreen.js
│   ├── DoctorListsScreen.js
│   ├── DoctorDetailsScreen.js
│   ├── MyAppointment.js
│   └── index.js
├── services/               # Business logic layer
│   ├── doctorService.js    # Doctor-related operations
│   ├── appointmentService.js # Appointment operations
│   └── index.js
├── styles/                 # Global styles and theme
│   ├── Theme.js
│   ├── Fonts.js
│   └── index.js
├── utils/                  # Utility functions
│   ├── imageUtils.js
│   ├── appointmentUtils.js
│   ├── timeSlotUtils.js
│   ├── errorHandler.js
│   └── index.js
├── constants/              # Application constants
│   ├── colors.js
│   ├── config.js
│   └── index.js
└── App.js                  # Root component

assets/                      # Images, fonts, static files
```

## 🔑 Key Architectural Principles

### 1. **Separation of Concerns**
- **Components**: Pure UI components with minimal business logic
- **Services**: Business logic and API operations
- **Context**: Global state management
- **Utils**: Helper functions

### 2. **Layered Architecture**
```
┌─────────────────────────┐
│    UI Layer (Screens)   │
├─────────────────────────┤
│   Components Layer      │
├─────────────────────────┤
│   Services/Logic Layer  │
├─────────────────────────┤
│   Data Access Layer     │
└─────────────────────────┘
```

### 3. **Single Responsibility Principle**
Each module has one reason to change:
- Services handle business logic only
- Components handle UI rendering only
- Utils provide reusable helper functions
- Constants centralize configuration

## 📁 Directory Structure Details

### `/src/components`
**Purpose**: Reusable UI components

**Structure**:
- Each component has its own folder
- `index.js` for clean exports
- Styles included or in separate files
- No business logic, only presentation

**Example**:
```javascript
// src/components/Button/Button.js
export default function Button({ onPress, text, theme = "primary" }) {
  return <TouchableOpacity onPress={onPress}>
    <Text>{text}</Text>
  </TouchableOpacity>;
}

// src/components/Button/index.js
export { default } from "./Button";
```

### `/src/screens`
**Purpose**: Screen/page-level containers

**Responsibilities**:
- Orchestrate component layouts
- Handle navigation
- Connect to context/services
- Manage screen-level state

### `/src/services`
**Purpose**: Business logic and data operations

**Features**:
- `doctorService.js`: Doctor-related operations
- `appointmentService.js`: Appointment validations and operations
- Pure functions (no side effects)
- Testable and reusable

**Example**:
```javascript
// src/services/doctorService.js
export const getAllDoctors = () => {
  return doctorsData;
};

export const getAvailableTimeSlotsWithBookedStatus = (
  doctorName,
  dateString,
  bookedAppointments
) => {
  // Business logic here
};
```

### `/src/context`
**Purpose**: Global state management using React Context

**Structure**:
- `BookAppointmentContext.js`: Appointment state provider
- Custom hook in `/src/hooks` for consuming context

**Usage**:
```javascript
import { useBookAppointment } from "../hooks";

const MyComponent = () => {
  const { bookedAppointments, saveAppointment } = useBookAppointment();
  // ...
};
```

### `/src/hooks`
**Purpose**: Custom React hooks for reusable logic

**Benefits**:
- Extract component logic into reusable hooks
- Share state logic between components
- Simplify component code

**Example**:
```javascript
// src/hooks/useBookAppointment.js
export const useBookAppointment = () => {
  const context = useContext(BookAppointmentContext);
  if (!context) {
    throw new Error("useBookAppointment must be used within BookAppointmentProvider");
  }
  return context;
};
```

### `/src/utils`
**Purpose**: Helper functions and utilities

**Modules**:
- `imageUtils.js`: Image handling
- `appointmentUtils.js`: Appointment utilities
- `timeSlotUtils.js`: Time slot operations
- `errorHandler.js`: Error messaging

**Pattern**: Pure functions, no side effects
```javascript
export const isSlotBooked = (appointments, doctorName, date, time) => {
  return appointments.some(apt => 
    apt.doctorName === doctorName &&
    apt.appointmentDate === date &&
    apt.appointmentTime === time
  );
};
```

### `/src/constants`
**Purpose**: Centralize application configuration

**Sections**:
- `colors.js`: Theme colors
- `config.js`: App configuration (timeouts, ranges, etc.)

**Usage**:
```javascript
import { colors, APPOINTMENT_BOOKING_RANGE_MONTHS } from "../constants";
```

### `/src/styles`
**Purpose**: Global styling and theme

**Files**:
- `Theme.js`: Colors and dimensions
- `Fonts.js`: Font imports and definitions

**Pattern**: Centralized theme for consistency
```javascript
export const colors = {
  color_primary: "#6A5ACD",
  color_secondary: "#DDA0DD",
  // ...
};
```

## 🔄 Data Flow Pattern

```
User Interaction (Screen)
        ↓
Component Handler (onPress, onChange)
        ↓
Service Method (validation, logic)
        ↓
Context Update (global state)
        ↓
Component Re-render (via hook)
```

## 📊 State Management Strategy

### Global State (Context)
- **Appointments**: Managed in `BookAppointmentContext`
- **Pattern**: Provider wrapper at root, hook consumption in components

### Local State (Component)
- **UI State**: Loading, modals, selection states
- **Pattern**: `useState` in component

### Static Data (Services)
- **Doctors**: In `src/data/data.js`
- **Constants**: In `src/constants/`
- **Accessed via**: Service functions

## 🧪 Testing Advantages

The new architecture enables easy testing:

```javascript
// Service testing (pure functions)
import { validateAppointment } from "../services/appointmentService";

test("validates appointment data", () => {
  const result = validateAppointment({ selectedTime: "10:00" });
  expect(result.valid).toBe(false);
});

// Component testing (isolated, no business logic)
// Component tests focus only on rendering and user interactions
```

## 🚀 Benefits of This Architecture

1. **Scalability**: Easy to add new features
2. **Maintainability**: Clear organization and responsibility
3. **Testability**: Pure functions and separation of concerns
4. **Reusability**: Components and utilities can be shared
5. **Performance**: Optimized imports and lazy loading potential
6. **Collaboration**: Clear structure for team development
7. **IDE Support**: Better autocomplete with index.js exports
8. **Refactoring**: Safe refactoring with clear interfaces

## 📝 Import Patterns

### Old Pattern (Avoid)
```javascript
import BookAppointment from "../../../components/BookAppointment/BookAppointment";
import { doctorsData } from "../../../data/data";
import theme from "../../../components/styles/Theme";
```

### New Pattern (Use)
```javascript
import BookAppointment from "../components";
import { doctorsData } from "../services/doctorService";
import { colors } from "../constants";
```

## 🔌 Central Export Files

All folders have `index.js` for clean imports:

```javascript
// src/components/index.js - Export all components
export { default as Button } from "./Button";
export { default as BookAppointment } from "./BookAppointment";
// ...

// Usage
import { Button, BookAppointment } from "../components";
```

## 🛠️ Adding New Features

### Example: Add a Doctor Filters Feature

1. **Create Service** (`src/services/filterService.js`)
   ```javascript
   export const filterDoctorsByCategory = (doctors, category) => {
     return doctors.filter(doc => doc.categories.includes(category));
   };
   ```

2. **Create Component** (`src/components/Filter/Filter.js`)
   - UI for filter selection

3. **Update Screen** (`src/screens/DoctorListsScreen.js`)
   - Use filter service
   - Pass filtered data to components

4. **Export** in `src/components/index.js`

## 📦 Dependencies Overview

- **@react-navigation**: Navigation
- **react-native-calendars**: Calendar UI
- **moment**: Date manipulation
- **@expo/vector-icons**: Icons
- **axios**: HTTP requests (prepared for API integration)
- **react-native-flash-message**: Toast notifications

## ✅ Best Practices Implemented

1. ✅ Folder-based component structure
2. ✅ Central exports via index.js
3. ✅ Services layer for business logic
4. ✅ Context for global state
5. ✅ Custom hooks for logic reuse
6. ✅ Constants centralization
7. ✅ Error handling utilities
8. ✅ Documentation and comments
9. ✅ Consistent naming conventions
10. ✅ No prop drilling with context

## 🔮 Future Enhancements

- [ ] Add Redux for complex state management
- [ ] Implement API integration layer
- [ ] Add TypeScript for type safety
- [ ] Implement error boundaries
- [ ] Add analytics/logging
- [ ] Implement offline persistence
- [ ] Add unit and integration tests
- [ ] Implement CI/CD pipeline

## 📞 Support

For architecture questions or improvements, follow the patterns established in each layer and maintain consistency across the codebase.

---

**Architecture Version**: 1.0  
**Last Updated**: 2026-05-03  
**Status**: Production Ready
