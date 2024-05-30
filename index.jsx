Для реализации сортировки приемов по выбранному полю и направлению сортировки, мы можем использовать состояние для отслеживания выбранного поля и направления сортировки. Также добавим метод для сортировки массива приемов в зависимости от выбранного поля и направления.

Вот как это может быть реализовано:

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
// ... остальные импорты

const Main = () => {
  // ... остальный код

  const [sortField, setSortField] = useState('None');
  const [sortDirection, setSortDirection] = useState('asc');

  // ... остальный код

  const handleSortFieldChange = (e) => {
    setSortField(e.target.value);
  };

  const handleSortDirectionChange = (e) => {
    setSortDirection(e.target.value);
  };

  const sortAppointments = (appointments) => {
    if (sortField === 'None') {
      return appointments;
    }

    const sortedAppointments = [...appointments].sort((a, b) => {
      if (a[sortField] < b[sortField]) {
        return sortDirection === 'asc' ? -1 : 1;
      }
      if (a[sortField] > b[sortField]) {
        return sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });

    return sortedAppointments;
  };

  // ... остальный код

  return (
    <StyledWrapper>
      {/* ... остальный код */}

      <CustomSelector
        value={[
          { id: 'None', name: 'None' },
          { id: 'patientName', name: 'Имя' },
          { id: 'doctorName', name: 'Врач' },
          { id: 'appointmentDate', name: 'Дата' },
        ]}
        option="Выберите поле для сортировки"
        name="sortField"
        handleChangeInput={handleSortFieldChange}
        label="Поле для сортировки"
      />

      {sortField !== 'None' && (
        <CustomSelector
          value={[
            { id: 'asc', name: 'По возрастанию' },
            { id: 'desc', name: 'По убыванию' },
          ]}
          option="Выберите направление сортировки"
          name="sortDirection"
          handleChangeInput={handleSortDirectionChange}
          label="Направление сортировки"
        />
      )}

      <AppointmentList
        appointments={sortAppointments(appointments)}
        handleEditClick={handleEditClick}
      />

      {/* ... остальный код */}
    </StyledWrapper>
  );
};

export default Main;

В этом примере мы добавили состояние `sortField` и `sortDirection`, которые отслеживают выбранное поле и направление сортировки соответственно. Мы также добавили метод `sortAppointments`, который сортирует массив приемов в зависимости от выбранного поля и направления.

В компоненте `Main` мы используем наш кастомный селектор `CustomSelector` для выбора поля и направления сортировки. Направление сортировки отображается только тогда, когда выбранное поле не "None".

При рендеринге компонента `AppointmentList` мы используем отсортированный массив приемов, полученный из метода `sortAppointments`.

Обратите внимание, что в этом примере предполагается, что поля в приеме соответствуют именам свойств в объекте приема. Если имена полей отличаются, вам нужно будет адаптировать логику сортировки.