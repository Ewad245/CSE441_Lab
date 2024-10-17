import React from "react";
import { SafeAreaView } from "react-native";
import EmployeeInfoScreen from "./EmployeeInfoScreen";

const App = () => {
  const handleUpdate = (employeeInfo) => {
    // Handle the updated employee information (e.g., send to a server or store locally)
    console.log("Updated Employee Info:", employeeInfo);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <EmployeeInfoScreen onUpdate={handleUpdate} />
    </SafeAreaView>
  );
};

export default App;
