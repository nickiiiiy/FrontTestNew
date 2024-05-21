// RegistrationContext.js
import React, { createContext, useState } from "react";

const RegistrationContext = createContext();

export const RegistrationProvider = ({ children }) => {
  const [register, setRegister] = useState({
    login: "",
    password: "",
    passwordConfirm: "",
  });
  const [error, setError] = useState({
    loginError: "",
    passwordError: "",
    passwordConfirmError: "",
  });

  const handleChangeInput = (e) => {
    setRegister({
      ...register,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // ... ваша логика валидации и отправки формы
  };

  return (
    <RegistrationContext.Provider
      value={{ register, error, handleChangeInput, handleSubmit }}
    >
      {children}
    </RegistrationContext.Provider>
  );
};

export default RegistrationContext;


// RegistrationPage.js
import React from "react";
import Header from "../Header";
import Registration from "../Registration";
import { StyledWrapper } from "./syle";
import { RegistrationProvider } from "./RegistrationContext";

const RegistrationPage = () => {
  return (
    <StyledWrapper>
      <Header title="Зарегистрироваться в системе" />
      <RegistrationProvider>
        <Registration />
      </RegistrationProvider>
    </StyledWrapper>
  );
};

export default RegistrationPage;


// Registration.js
import React, { useContext } from "react";
import FormData from "../FormData";
import RegistrationContext from "./RegistrationContext";

const Registration = () => {
  const { register, error, handleChangeInput, handleSubmit } = useContext(RegistrationContext);

  return (
    <FormData
      handleSubmit={handleSubmit}
      title="Регистрация"
      error={error}
      register={register}
      handleChangeInput={handleChangeInput}
    />
  );
};

export default Registration;


// FormData.js
import React from "react";
import { Link } from "react-router-dom";
import CustomInput from "../CustomInput";
import building from "../../image/Building.svg";
import {
  StyledWrapper,
  StyledForm,
  StyledTitle,
  StyledBlock,
  StyledButton,
} from "./styled";

const FormData = ({ handleSubmit, title, error, register, handleChangeInput }) => {
  return (
    <StyledWrapper>
      <img src={building} alt=""></img>
      <StyledForm onSubmit={handleSubmit}>
        <StyledTitle>{title}</StyledTitle>
        <CustomInput
          error={error}
          name="login"
          type="text"
          value={register.login}
          handleChangeInput={handleChangeInput}
          placeholder="Логин"
          label="Логин:"
          required
        />
        <CustomInput
          error={error}
          name="password"
          type="password"
          value={register.password}
          handleChangeInput={handleChangeInput}
          placeholder="Пароль"
          label="Пароль:"
          required
        />
        <CustomInput
          error={error}
          name="passwordConfirm"
          type="password"
          value={register.passwordConfirm}
          handleChangeInput={handleChangeInput}
          placeholder="Повторить пароль"
          label="Повторить пароль:"
          required
        />
        <StyledBlock>
          <StyledButton type="submit">Зарегистрироваться</StyledButton>
          <Link to="/authorization">Авторизоваться</Link>
        </StyledBlock>
      </StyledForm>
    </StyledWrapper>
  );
};

export default FormData;

// CustomInput.js
import React, { useContext } from "react";
import {
  StyledLabel,
  StyledInput,
  StyledBlock,
  StyledBlockError,
} from "./styled";
import RegistrationContext from "./RegistrationContext";

const CustomInput = ({ name, type, placeholder, label, required }) => {
  const { register, error, handleChangeInput } = useContext(RegistrationContext);

  return (
    <StyledBlock>
      <StyledLabel htmlFor={name}>{label}</StyledLabel>
      <StyledInput
        name={name}
        type={type}
        placeholder={placeholder}
        value={register[name]}
        onChange={handleChangeInput}
        required={required}
      />
      {error[name + "Error"] && (
        <StyledBlockError>{error[name + "Error"]}</StyledBlockError>
      )}
    </StyledBlock>
  );
};

export default CustomInput;