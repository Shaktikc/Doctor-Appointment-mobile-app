# Quick Reference Guide

## 📁 Directory Quick Map

| Folder | Purpose | Contains |
|--------|---------|----------|
| `src/components/` | Reusable UI components | Button, CustomButton, TimeSlot, etc. |
| `src/screens/` | Full-page containers | HomeScreen, DoctorDetailsScreen, etc. |
| `src/services/` | Business logic | doctorService, appointmentService |
| `src/context/` | Global state | BookAppointmentContext |
| `src/hooks/` | Custom hooks | useBookAppointment |
| `src/utils/` | Helper functions | imageUtils, appointmentUtils, etc. |
| `src/constants/` | Configuration | colors, config |
| `src/styles/` | Global theme | Theme, Fonts |
| `src/navigation/` | Navigation setup | AppNavigation |
| `src/data/` | Static data | data.js, DoctorAvailability.js |

## 🎯 Where to Find Things

### I need to...

**Display a button**
```javascript
import { Button } from "../components";
// or
import Button from "../components/Button";
```

**Get all doctors**
```javascript
import { getAllDoctors } from "../services";
const doctors = getAllDoctors();
```

**Access booked appointments**
```javascript
import { useBookAppointment } from "../hooks";
const { bookedAppointments } = useBookAppointment();
```

**Use colors**
```javascript
import { colors } from "../constants";
const bgColor = colors.color_primary;
```

**Check if slot is booked**
```javascript
import { isSlotBooked } from "../utils";
const booked = isSlotBooked(appointments, doctorName, date, time);
```

**Show error message**
```javascript
import { showErrorMessage } from "../utils";
showErrorMessage("Something went wrong!");
```

**Get doctor availability**
```javascript
import { getAvailableTimeSlotsForDoctor } from "../services";
const slots = getAvailableTimeSlotsForDoctor(doctorName, dateString);
```

## 📋 Component Structure Template

```javascript
// src/components/MyComponent/MyComponent.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../../styles";

/**
 * MyComponent
 * Description of what this component does
 */
const MyComponent = ({ prop1, prop2 }) => {
  return (
    <View style={styles.container}>
      <Text>{prop1}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.color_white,
  },
});

export default MyComponent;

// src/components/MyComponent/index.js
export { default } from "./MyComponent";
```

## 🔄 Service Function Template

```javascript
// src/services/myService.js

/**
 * Do something
 * @param {type} param1 - Description
 * @returns {type} Description
 */
export const doSomething = (param1) => {
  // Pure function - no side effects
  return result;
};

/**
 * Do something else
 */
export const doSomethingElse = (param1, param2) => {
  // Validate
  if (!param1) return null;
  
  // Process
  const result = processData(param1, param2);
  
  // Return
  return result;
};

// Export in src/services/index.js
export { doSomething, doSomethingElse } from "./myService";
```

## 🎣 Custom Hook Template

```javascript
// src/hooks/useMyHook.js
import { useContext } from "react";
import MyContext from "../context/MyContext";

/**
 * useMyHook
 * Description of what this hook does
 */
export const useMyHook = () => {
  const context = useContext(MyContext);
  
  if (!context) {
    throw new Error("useMyHook must be used within MyProvider");
  }
  
  return context;
};

// Export in src/hooks/index.js
export { useMyHook } from "./useMyHook";
```

## 🧬 Context Template

```javascript
// src/context/MyContext.js
import React, { createContext, useCallback } from "react";

const MyContext = createContext();

export const MyProvider = ({ children }) => {
  // State
  const [state, setState] = useState(null);

  // Methods with useCallback for performance
  const method1 = useCallback((param) => {
    // Logic here
  }, [dependencies]);

  const value = {
    state,
    method1,
  };

  return (
    <MyContext.Provider value={value}>
      {children}
    </MyContext.Provider>
  );
};

export default MyContext;

// Export in src/context/index.js
export { MyProvider, default as MyContext } from "./MyContext";
```

## 📊 Data Flow Diagram

```
┌─────────────────────────┐
│     UI (Component)      │
│   onPress → setState    │
└────────────┬────────────┘
             │
      ┌──────▼──────┐
      │   Hooks     │
      │  useContext │
      └──────┬──────┘
             │
      ┌──────▼──────┐
      │   Context   │
      │  Global     │
      │  State      │
      └──────┬──────┘
             │
      ┌──────▼──────────┐
      │   Services      │
      │   Business      │
      │   Logic         │
      └──────┬──────────┘
             │
      ┌──────▼──────┐
      │   Utils     │
      │  Helpers    │
      └─────────────┘
```

## 🎨 Styling Guide

```javascript
// Use centralized colors
import { colors } from "../constants";

const styles = StyleSheet.create({
  primary: { color: colors.color_primary },
  secondary: { color: colors.color_secondary },
});

// Use theme from styles
import { colors, sizes } from "../styles";

const styles = StyleSheet.create({
  container: {
    width: sizes.width,
    backgroundColor: colors.color_white,
  },
});
```

## 📦 Common Imports Cheat Sheet

```javascript
// Components
import { Button, TopDoctor, CustomButton } from "../components";

// Screens
import { HomeScreen, DoctorListsScreen } from "../screens";

// Services
import { getAllDoctors, validateAppointment } from "../services";

// Hooks
import { useBookAppointment } from "../hooks";

// Context
import { BookAppointmentProvider } from "../context";

// Utils
import { isSlotBooked, showErrorMessage } from "../utils";

// Constants
import { colors, APPOINTMENT_TIME_INTERVAL } from "../constants";

// Styles
import { colors, sizes, fonts } from "../styles";

// Navigation
import AppNavigation from "../navigation";
```

## ✅ Code Quality Checklist

Before committing code:

- [ ] Component has no business logic
- [ ] Services are pure functions
- [ ] Constants are centralized
- [ ] Imports use index.js files
- [ ] Error handling implemented
- [ ] Comments added for complex logic
- [ ] Follows naming conventions
- [ ] No prop drilling (use context if needed)
- [ ] No hardcoded strings/colors
- [ ] No console.log in production code

## 🚀 Quick Start for New Feature

1. **Create service** - `src/services/featureService.js`
2. **Export in** - `src/services/index.js`
3. **Create component** - `src/components/Feature/`
4. **Export component** - `src/components/index.js`
5. **Use in screen** - `src/screens/FeatureScreen.js`
6. **Add to navigation** - `src/navigation/AppNavigation.js`

## 🐛 Debugging Tips

| Issue | Solution |
|-------|----------|
| Import not found | Check `src/*/index.js` exports |
| Context undefined | Ensure provider wraps component in App.js |
| Service not working | Check if function is exported |
| Styles not applying | Check colors object spelling |
| Hook error | Ensure within provider component |

## 📞 File Location Reminders

```
Need colors? → src/constants/colors.js
Need date logic? → src/utils/timeSlotUtils.js
Need doctor data? → src/services/doctorService.js
Need to validate? → src/services/appointmentService.js
Need UI component? → src/components/*/
Need screen? → src/screens/
Need global state? → src/context/
Need helper function? → src/utils/
Need configuration? → src/constants/config.js
```

## 💡 Pro Tips

1. Always use `index.js` for exports - makes refactoring easier
2. Keep services pure - easier to test
3. Keep components presentational - easier to reuse
4. Use constants - no magic strings
5. Comment complex logic - helps future you
6. Follow file structure - consistency matters
7. Test at layers - services first, then components

## 🔗 Documentation Files

- **ARCHITECTURE.md** - Detailed architecture explanation
- **MIGRATION_GUIDE.md** - How to use new structure
- **This file** - Quick reference

---

**Happy coding!** 🚀

For detailed information, see `ARCHITECTURE.md`
