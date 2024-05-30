import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AddAppointmentForm from "../../AddAppointmentForm";
import Header from "../../Header";
import AppointmentList from "../../AppointmentList";
import Modal from "../../Modal";
import EditAppointmentForm from "../../EditAppointments";
import { Snackbar } from "@mui/material";
import { doctors } from "../../../constants";
import { StyledWrapper } from "./style";
import CustomSelector from "../../CustomSelector";

const Main = () => {
  const [newAppointment, setNewAppointment] = useState({
    patientName: "",
    doctorName: "",
    appointmentDate: "",
    complaints: "",
  });
  const [error, setError] = useState({
    patientNameError: "",
    doctorNameError: "",
    appointmentDateError: "",
    complaintsError: "",
  });
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [editError, setEditError] = useState({
    patientNameError: "",
    doctorNameError: "",
    appointmentDateError: "",
    complaintsError: "",
  });
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const { appointments, errors } = useSelector((state) => state.appointment);

  const dispatch = useDispatch();
  const { createAppointment, getAppointment, editAppointment } = useAction();

  useEffect(() => {
    getAppointment();
  }, []);

  useEffect(() => {
    if (errors && errors.length > 0) {
      setSnackbar({
        ...snackbar,
        open: true,
        message:
          "Извините, произошла ошибка. Проверьте даннные, которые вы вводили.",
      });
    }
  }, [errors]);

  const handleEditClick = (id) => {
    const oldAppointments = [...appointments];
    const appointment = oldAppointments.find(
      (appointment) => appointment._id === id
    );
    setSelectedAppointment(appointment);
    setModalOpen(true);
  };

  const handleInputChange = (e) => {
    setSelectedAppointment({
      ...selectedAppointment,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditSave = () => {
    if (!selectedAppointment.patientName.trim()) {
      setEditError({
        ...editError,
        patientNameError: "Поле не может быть пустым ",
      });
      return;
    }

    if (!selectedAppointment.doctorName.trim()) {
      setEditError({
        ...editError,
        doctorNameError: "Поле не может быть пустым ",
      });
      return;
    }

    if (!selectedAppointment.complaints.trim()) {
      setEditError({
        ...editError,
        complaintsError: "Поле не может быть пустым ",
      });
      return;
    }

    const date = new Date(selectedAppointment.appointmentDate);
    if (date < new Date()) {
      setEditError({
        ...editError,
        appointmentDateError: "Дата не может быть в прошлом",
      });
      return;
    }

    editAppointment(selectedAppointment);
    setEditError({
      patientNameError: "",
      doctorNameError: "",
      appointmentDateError: "",
      complaintsError: "",
    });
    setSelectedAppointment(null);
    setModalOpen(false);
  };

  const handleEditModalClose = () => {
    setModalOpen(false);
    setSelectedAppointment(null);
    setEditError({
      patientNameError: "",
      doctorNameError: "",
      appointmentDateError: "",
      complaintsError: "",
    });
  };

  const handleChangeInput = (e) => {
    setNewAppointment({
      ...newAppointment,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!newAppointment.patientName.trim()) {
      setError({
        ...error,
        patientNameError: "Поле не может быть пустым ",
      });
      return;
    }

    if (!newAppointment.doctorName.trim()) {
      setError({
        ...error,
        doctorNameError: "Поле не может быть пустым ",
      });
      return;
    }

    if (!newAppointment.complaints.trim()) {
      setError({
        ...error,
        complaintsError: "Поле не может быть пустым ",
      });
      return;
    }

    const date = new Date(newAppointment.appointmentDate);
    if (date < new Date()) {
      setError({
        ...error,
        appointmentDateError: "Дата не может быть в прошлом",
      });
      return;
    }

    createAppointment(newAppointment);
    setError({
      patientNameError: "",
      doctorNameError: "",
      appointmentDateError: "",
      complaintsError: "",
    });

    setNewAppointment({
      patientName: "",
      doctorName: "",
      appointmentDate: "",
      complaints: "",
    });
  };

  const handleSortChange = (e) => {
    const field = e.target.value;
    if (field === "None") {
      setSortField(null);
      setSortDirection("asc");
    } else {
      setSortField(field);
      // сохраняем направление сортировки
      const currentSort = e.target.options[e.target.selectedIndex];
      setSortDirection(currentSort.dataset.direction);
    }
  };

  const handleDirectionChange = (e) => {
    setSortDirection(e.target.value);
  };

  return (
    <StyledWrapper>
      <Header title="Приёмы" isShowButton={true} />
      <CustomSelector
        value={[
          { id: 1, name: "Имя" },
          { id: 2, name: "Врач" },
          { id: 3, name: "Дата" },
          { id: 4, name: "None" },
        ]}
        option="Сортировать по"
        name="sortField"
        handleChangeInput={handleSortChange}
        label="Сортировать по"
      />
      {sortField && (
        <CustomSelector
          value={[
            { id: 1, name: "По возрастанию", "data-direction": "asc" },
            { id: 2, name: "По убыванию", "data-direction": "desc" },
          ]}
          option="Направление"
          name="sortDirection"
          handleChangeInput={handleDirectionChange}
          label="Направление"
        />
      )}
      <AddAppointmentForm
        error={error}
        newAppointment={newAppointment}
        handleSubmit={handleSubmit}
        handleChangeInput={handleChangeInput}
        doctors={doctors}
      />
      <AppointmentList
        appointments={appointments}
        handleEditClick={handleEditClick}
        sortField={sortField}
        sortDirection={sortDirection}
      />
      {modalOpen && (
        <Modal
          title="Изменить приём"
          titleButton="Сохранить"
          isOpen={modalOpen}
          onClose={handleEditModalClose}
          handleEditSave={handleEditSave}
        >
          <EditAppointmentForm
            error={editError}
            doctors={doctors}
            handleChangeInput={handleInputChange}
            appointment={selectedAppointment}
          />
        </Modal>
      )}
      {snackbar.open && (
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar({ open: false, message: "" })}
          message={snackbar.message}
        />
      )}
    </StyledWrapper>
  );
};

export default Main;
// Изменения:

// Добавлен CustomSelector: Компонент CustomSelector используется для создания выпадающих списков для сортировки.
// Добавлены состояния:
// sortField: хранит имя поля, по которому нужно сортировать.
// sortDirection: хранит направление сортировки ("asc" или "desc").
// Функция handleSortChange:
// Обновляет sortField и sortDirection в зависимости от выбранного значения в списке сортировки.
// Если выбрано "None", очищает sortField и sortDirection.
// Функция handleDirectionChange: Обновляет sortDirection в зависимости от выбранного направления в списке направления.
// Отображение списков сортировки: Списки сортировки отображаются условно. Списки сортировки отображаются только в том случае, если sortField не null.
// Передача информации в AppointmentList: Передаются sortField и sortDirection в компонент AppointmentList, чтобы он мог сортировать данные.
