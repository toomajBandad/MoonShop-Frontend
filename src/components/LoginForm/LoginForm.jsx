import { useForm } from "react-hook-form";
import { useState } from "react";
import "./LoginForm.css";
import { useNavigate } from "react-router";
import { IoMdArrowRoundBack } from "react-icons/io";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import axios from "axios";

export default function LoginForm() {
  const navigate = useNavigate();
  const appUrl = import.meta.env.VITE_BACKEND_URL;
  const [formType, setFormType] = useState("Login");

  const { login, updateCart } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    formType === "Login" ? handleLogin(data) : handleRegister(data);
  };

  const handleRegister = (data) => {
    console.log("data:", data);

    axios
      .post(`${appUrl}/user/newUser`, data)
      .then((response) => {
        login(response.data.token, response.data.user);
        updateCart(response.data.cart.items);
      })
      .then(() => {
        navigate("/");
        Swal.fire({
          title: "Congratulations!",
          text: "You have successfully registered.",
          icon: "success",
        });
      })
      .catch((error) => {
        console.error("Axios error:", error);
        Swal.fire({
          title: "Error!",
          text: "Registration failed. Please try again.",
          icon: "error",
        });
      });
  };
  const handleLogin = (data) => {
    let loginData = {
      email: data.email,
      password: data.password,
    };
    axios
      .post(`${appUrl}/user/login`, loginData)
      .then((response) => {
        console.log("Fetched data:", response.data);
        login(response.data.token, response.data.user);
        updateCart(response.data.cart.items);
      })
      .then(() => {
        navigate("/");
        Swal.fire({
          title: "Congratulations!",
          text: "You have successfully registered.",
          icon: "success",
        });
      })
      .catch((error) => {
        console.error("Axios error:", error);
        Swal.fire({
          title: "Error!",
          text: "Registration failed. Please try again.",
          icon: "error",
        });
      });
  };

  return (
    <div className="loginForm__container flex flex-col items-center justify-center p-12 border-1 border-gray-300 rounded-lg shadow-lg w-lg">
      <div className="flex items-center justify-center gap-8 w-full relative">
        <IoMdArrowRoundBack className="text-gray-500 text-2xl absolute start-10" />
        <h1 className="mainTitle text-center text-default-red">
          {formType} Form
        </h1>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-0 p-4 w-full rounded-lg"
      >
        {formType === "Register" && (
          <>
            <label htmlFor="username" className="loginForm__input__label">
              Username :
            </label>
            <input
              type="text"
              name="usernameInput"
              id="Username"
              placeholder="Username"
              className="loginForm__input"
              {...register("username", {
                required: true,
                minLength: 6,
                maxLength: 20,
                pattern: /^[A-Za-z]+$/i, // Only letters allowed
              })}
              aria-invalid={errors.username ? "true" : "false"}
            />
            {errors.username && (
              <span className="loginForm__errorTxt">
                Please enter correct value
              </span>
            )}
          </>
        )}

        <label htmlFor="email" className="loginForm__input__label">
          Email address :
        </label>
        <input
          type="text"
          name="emailInput"
          id="email"
          placeholder="email"
          className="loginForm__input"
          {...register("email", {
            required: true,
            minLength: 6,
            maxLength: 20,
            pattern: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/i, // Email pattern
          })}
          aria-invalid={errors.email ? "true" : "false"}
        />
        {errors.email && (
          <span className="loginForm__errorTxt">
            Please enter correct value
          </span>
        )}

        <label htmlFor="password" className="loginForm__input__label">
          Password :
        </label>
        <input
          type="text"
          name="passwordInput"
          id="password"
          placeholder="password"
          className="loginForm__input"
          {...register("password", {
            required: true,
            minLength: 6,
            maxLength: 20,
          })}
          aria-invalid={errors.password ? "true" : "false"}
        />
        {errors.password && (
          <span className="loginForm__errorTxt">
            Please enter correct value
          </span>
        )}

        <button
          type="submit"
          className="bg-default-red text-white py-3 rounded-2xl mt-16 text-lg cursor-pointer"
        >
          {formType}
        </button>

        <div className="text-center flex justify-center items-center gap-4 mt-1">
          {formType === "Login" ? (
            <>
              <span>Not registered yet?</span>
              <span
                className="text-default-red cursor-pointer underline "
                onClick={() => setFormType("Register")}
              >
                click here!
              </span>
            </>
          ) : (
            <>
              <span>Are you a member?</span>
              <span
                className="text-default-red cursor-pointer underline "
                onClick={() => setFormType("Login")}
              >
                click here to login!
              </span>
            </>
          )}
        </div>
      </form>
    </div>
  );
}
