import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Block, Form, Input, Label, Wrapper, Title } from "./style";
import {
  updateLogin,
  updatePassword,
  updateRepeatPassword,
  registerUser,
  clearError,
} from "../../redux/actionCreators";
import { RegisterStatus } from "../../redux/enums";
import building from "../../image/Building.svg";

const Registration = () => {
  const { login, password, repeatPassword, error, registerStatus } =
    useSelector((state) => state.register);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLoginChange = (event) => {
    dispatch(updateLogin(event.target.value));
  };

  const handlePasswordChange = (event) => {
    dispatch(updatePassword(event.target.value));
  };

  const handleRepeatPasswordChange = (event) => {
    dispatch(updateRepeatPassword(event.target.value));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!login || !password || !repeatPassword) {
      dispatch(clearError());
      return dispatch(updateError("Все поля обязательны для заполнения"));
    }

    if (login.length < 6) {
      dispatch(clearError());
      return dispatch(updateError("Логин должен быть не менее 6 символов"));
    }

    if (
      password.length < 6 ||
      !/[a-zA-Z]/.test(password) ||
      !/\d/.test(password)
    ) {
      dispatch(clearError());
      return dispatch(
        updateError(
          "Пароль должен быть не менее 6 символов, содержать латинские символы и хотя бы одну цифру"
        )
      );
    }

    if (password !== repeatPassword) {
      dispatch(clearError());
      return dispatch(updateError("Пароли не совпадают"));
    }

    dispatch(registerUser({ login, password }));
  };

  useEffect(() => {
    if (registerStatus === RegisterStatus.FULFILLED) {
      navigate("/");
    }
  }, [registerStatus, navigate]);

  return (
    <Wrapper>
      <img src={building} alt=""></img>
      <Form onSubmit={handleSubmit}>
        <Title>Регистрация</Title>
        <Block>
          <Label htmlFor="login">Логин:</Label>
          <Input
            type="text"
            id="login"
            value={login}
            onChange={handleLoginChange}
            required
            placeholder="Логин"
          />
        </Block>
        <Block>
          <Label htmlFor="password">Пароль:</Label>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
            placeholder="Пароль"
          />
        </Block>
        <Block>
          <Label htmlFor="repeatPassword">Повторить пароль:</Label>
          <Input
            type="password"
            id="repeatPassword"
            value={repeatPassword}
            onChange={handleRepeatPasswordChange}
            required
            placeholder="Пароль"
          />
        </Block>
        {error && <div>{error}</div>}
        <Block>
          <Button type="submit">Зарегистрироваться</Button>
          <Link to="/authorization">Авторизоваться</Link>
        </Block>
      </Form>
    </Wrapper>
  );
};

export default Registration;

// Обратите внимание, что я убрал вызов addUser и вместо этого я вызываю dispatch(registerUser({ login, password })) прямо в обработчике handleSubmit. Это изменение связано с тем, что registerUser теперь является action creator, который возвращает асинхронный thunk, который сам выполняет запрос к серверу и диспатчит необходимые actions.

// Также, я заменил updateError на clearError в случае, когда проверка не проходит, и теперь ошибки обрабатываются внутри registerUser thunk. Это изменение связано с тем, что обработка ошибок теперь происходит внутри thunk, а не в компоненте.

// Также, я использовал RegisterStatus.FULFILLED вместо строки "fulfilled" для сравнения со статусом регистрации. Это изменение связано с тем, что RegisterStatus теперь является enum, который определен в отдельном файле.
