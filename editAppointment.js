// EditAppointmentModal.js
import React from "react";
import Modal from "./Modal";
import AddAppointmentForm from "../AddAppointmentForm";

const EditAppointmentModal = ({ appointment, isOpen, onClose, onSave }) => {
  const [newAppointment, setNewAppointment] = React.useState({
    patientName: appointment.patientName,
    doctor: appointment.doctor,
    date: appointment.date,
    complaints: appointment.complaints,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(newAppointment);
  };

  const handleChangeInput = (e) => {
    setNewAppointment({
      ...newAppointment,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2>Редактировать приём</h2>
      <AddAppointmentForm
        newAppointment={newAppointment}
        handleSubmit={handleSubmit}
        handleChangeInput={handleChangeInput}
      />
    </Modal>
  );
};

export default EditAppointmentModal;
