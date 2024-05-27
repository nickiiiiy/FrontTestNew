// Main.js
import React, { useState } from "react";
import EditAppointmentModal from "./EditAppointmentModal";
import AppointmentList from "./AppointmentList";

const Main = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const handleEdit = (appointment) => {
    setSelectedAppointment(appointment);
    setIsOpen(true);
  };

  const handleSave = (newAppointment) => {
    // Save the new appointment data
    console.log(newAppointment);
    setIsOpen(false);
  };

  return (
    <div>
      <AppointmentList appointments={appointments} onEdit={handleEdit} />
      {isOpen && (
        <EditAppointmentModal
          appointment={selectedAppointment}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};
