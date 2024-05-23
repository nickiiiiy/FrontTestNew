Для создания главной страницы приложения с использованием React.js и Redux, вам потребуется несколько компонентов. Вот пример того, как это может выглядеть:

1. Компонент `AppointmentForm` для отображения формы добавления приема:

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addAppointment } from './actions';

const AppointmentForm = () => {
  const [patientName, setPatientName] = useState('');
  const [doctor, setDoctor] = useState('');
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addAppointment({ patientName, doctor, date, notes }));
    setPatientName('');
    setDoctor('');
    setDate('');
    setNotes('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Patient Name"
        value={patientName}
        onChange={(e) => setPatientName(e.target.value)}
        required
      />
      <select
        value={doctor}
        onChange={(e) => setDoctor(e.target.value)}
        required
      >
        <option value="">Select Doctor</option>
        {/* Add options for doctors */}
      </select>
      <input
        type="text"
        placeholder="Date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <textarea
        placeholder="Notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        required
      />
      <button type="submit" disabled={!patientName || !doctor || !date || !notes}>
        Add Appointment
      </button>
    </form>
  );
};

export default AppointmentForm;

2. Компонент `AppointmentList` для отображения списка приемов:

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editAppointment, deleteAppointment } from './actions';

const AppointmentList = () => {
  const appointments = useSelector((state) => state.appointments);
  const dispatch = useDispatch();

  return (
    <table>
      <thead>
        <tr>
          <th>Patient Name</th>
          <th>Doctor</th>
          <th>Date</th>
          <th>Notes</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {appointments.map((appointment) => (
          <tr key={appointment.id}>
            <td>{appointment.patientName}</td>
            <td>{appointment.doctor}</td>
            <td>{appointment.date}</td>
            <td>{appointment.notes}</td>
            <td>
              <button onClick={() => dispatch(editAppointment(appointment.id))}>
                Edit
              </button>
              <button onClick={() => dispatch(deleteAppointment(appointment.id))}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AppointmentList;

3. Компонент `App` для отображения главной страницы:

import React from 'react';
import AppointmentForm from './AppointmentForm';
import AppointmentList from './AppointmentList';

const App = () => {
  return (
    <div>
      <AppointmentForm />
      <AppointmentList />
    </div>
  );
};

export default App;

4. Для реализации функциональности редактирования и удаления приемов, вам потребуются соответствующие action creators в файле `actions.js`:

export const addAppointment = (appointment) => ({
  type: 'ADD_APPOINTMENT',
  payload: appointment,
});

export const editAppointment = (id) => ({
  type: 'EDIT_APPOINTMENT',
  payload: id,
});

export const deleteAppointment = (id) => ({
  type: 'DELETE_APPOINTMENT',
  payload: id,
});

5. И, наконец, вам потребуется редьюсер в файле `reducer.js` для обработки этих action:

const initialState = {
  appointments: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_APPOINTMENT':
      return {
        ...state,
        appointments: [...state.appointments, action.payload],
      };
    case 'EDIT_APPOINTMENT':
      // Logic for editing an appointment
      return state;
    case 'DELETE_APPOINTMENT':
      return {
        ...state,
        appointments: state.appointments.filter(
          (appointment) => appointment.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default reducer;

Обратите внимание, что в приведенном выше коде не реализованы функции редактирования и удаления приемов, так как они требуют дополнительной логики, которая зависит от вашего конкретного сценария использования. Вы должны реализовать эти функции в соответствии с вашими требованиями.

Также, вам нужно будет настроить Redux store и подключить его к вашему приложению. Это обычно делается в файле `index.js`:

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducer';
import App from './App';

const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

Этот код создает Redux store, используя ваш редьюсер, и оборачивает ваше приложение в компонент `Provider`, который предоставляет доступ к Redux store для всех компонентов в вашем приложении.