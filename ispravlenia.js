import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Appointment from "./Appointment";
import { getAppointment } from "../../redux/actions/appointment";

const AppointmentList = () => {
  const dispatch = useDispatch();
  const appointments = useSelector((state) => state.appointment.appointments);

  useEffect(() => {
    dispatch(getAppointment());
  }, [dispatch]);

  return (
    <table>
      <thead>
        <tr>
          <th>Имя</th>
          <th>Врач</th>
          <th>Дата</th>
          <th>Жалобы</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {appointments.map((appointment, index) => (
          <Appointment key={index} appointment={appointment} />
        ))}
      </tbody>
    </table>
  );
};

export default AppointmentList;


import React from "react";

const Appointment = ({ appointment }) => {
  return (
    <tr>
      <td>{appointment.patientName}</td>
      <td>{appointment.doctor}</td>
      <td>{appointment.date}</td>
      <td>{appointment.complaints}</td>
      <td>
        {/* Add actions here */}
      </td>
    </tr>
  );
};

export default Appointment;


// вёрстка
// Components/AppointmentList.styles.js
import styled from "styled-components";

export const AppointmentListWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
`;

export const AppointmentTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const AppointmentThead = styled.thead`
  background-color: #f2f2f2;
`;

export const AppointmentTbody = styled.tbody``;

export const AppointmentTr = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

export const AppointmentTd = styled.td`
  padding: 8px;
  border: 1px solid #ddd;
`;

export const AppointmentTh = styled.th`
  padding: 8px;
  border: 1px solid #ddd;
`;

// Components/AppointmentList.js
import React from "react";
import {
  AppointmentListWrapper,
  AppointmentTable,
  AppointmentThead,
  AppointmentTbody,
  AppointmentTr,
  AppointmentTd,
  AppointmentTh,
} from "./AppointmentList.styles";
import Appointment from "./Appointment";

const AppointmentList = ({ appointments }) => {
  return (
    <AppointmentListWrapper>
      <AppointmentTable>
        <AppointmentThead>
          <AppointmentTr>
            <AppointmentTh>Имя</AppointmentTh>
            <AppointmentTh>Врач</AppointmentTh>
            <AppointmentTh>Дата</AppointmentTh>
            <AppointmentTh>Жалобы</AppointmentTh>
          </AppointmentTr>
        </AppointmentThead>
        <AppointmentTbody>
          {appointments.map((appointment) => (
            <Appointment key={appointment.id} appointment={appointment} />
          ))}
        </AppointmentTbody>
      </AppointmentTable>
    </AppointmentListWrapper>
  );
};

export default AppointmentList;

// Components/Appointment.js
import React from "react";
import { AppointmentTr, AppointmentTd } from "./AppointmentList.styles";

const Appointment = ({ appointment }) => {
  return (
    <AppointmentTr>
      <AppointmentTd>{appointment.patientName}</AppointmentTd>
      <AppointmentTd>{appointment.doctor}</AppointmentTd>
      <AppointmentTd>{appointment.date}</AppointmentTd>
      <AppointmentTd>{appointment.complaints}</AppointmentTd>
    </AppointmentTr>
  );
};

export default Appointment;


// ///////////////
Да, вы правы. Компонент `AppointmentList` использует `useEffect` для запуска действия, которое загружает данные приемов из Redux store. Когда данные загружены, Redux store обновляется, и все компоненты, которые подписаны на эти данные, перерендерятся с новыми данными.

Вот как это работает:

1. Когда компонент `AppointmentList` рендерится, хук `useEffect` выполняется.
2. Хук `useEffect` отправляет действие `getAppointments` в Redux store.
3. Redux store обрабатывает это действие и загружает данные приемов.
4. Когда данные загружены, Redux store обновляется, и все компоненты, которые подписаны на эти данные, перерендерятся с новыми данными.
5. В частности, компонент `AppointmentList` перерендерится с новыми данными и каждый компонент `Appointment` внутри него будет отображать информацию о соответствующем приеме.

Вот пример того, как это может выглядеть в коде:

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAppointments } from '../actions/appointments';
import Appointment from './Appointment';

const AppointmentList = () => {
  const dispatch = useDispatch();
  const appointments = useSelector(state => state.appointments.appointments);

  useEffect(() => {
    dispatch(getAppointments());
  }, [dispatch]);

  return (
    <div>
      {appointments.map(appointment => (
        <Appointment key={appointment.id} appointment={appointment} />
      ))}
    </div>
  );
};

export default AppointmentList;

В этом примере, `useEffect` вызывает `getAppointments` при каждом рендере компонента `AppointmentList`. Это гарантирует, что данные будут загружены при каждом рендере компонента. Функция `getAppointments` должна быть определена в файле `actions/appointments.js` и отправлять действие, которое запускает асинхронный запрос к серверу для получения данных приемов.

Обратите внимание, что в `useEffect` передается массив зависимостей `[dispatch]`. Это означает, что эффект будет вызываться только при изменении функции `dispatch`, что помогает избежать бесконечных циклов при перерендеринге компонента.