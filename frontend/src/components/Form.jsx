import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputMask from "react-input-mask";
import "./Form.css";

const schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  mobileNumber: yup.string().required().min(11).max(11),
  gender: yup.string().required(),
  dateOfBirth: yup.string().required(),
  comments: yup.string(),
});

export default function Form() {
  const [formStep, setFormStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [disable, setDisable] = useState(false);
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const nextHandler = (param1, param2, param3) => {
    trigger([param1, param2, param3]).then((valid) => {
      valid && setFormStep(formStep + 1);
    });
  };

  const onSubmit = async (data, e) => {
    setDisable(true);
    setIsLoading(true);
    await fetch("https://taufikur-rahman.com/projects/fv-api/public/api/data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setIsLoading(false);
    e.target.reset();
  };
  return (
    <div className="form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="item">
          <div onClick={() => setFormStep(1)} className="title">
            <h2>Step 1: Your details</h2>
          </div>
          <div className={formStep === 1 ? "content show" : "content"}>
            {" "}
            <div className="form-control">
              <div>
                <p>{errors.firstName && <span>First name is required</span>}</p>
                <label htmlFor="firstName">First Name</label>
                <input
                  {...register("firstName")}
                  type="text"
                  name="firstName"
                />
              </div>
              <div>
                <p>{errors.lastName && <span>Surname is required</span>}</p>
                <label htmlFor="lastName">Surname</label>
                <input {...register("lastName")} type="text" name="lastName" />
              </div>
            </div>
            <div className="form-control">
              <div>
                <p>{errors.email && <span>Email is required</span>}</p>
                <label htmlFor="email">Email address:</label>
                <input {...register("email")} name="email" type="email" />
              </div>
            </div>
            <div className="next-button">
              <div
                className="button"
                onClick={() => nextHandler("firstName", "lastName", "email")}
              >
                {"Next >"}
              </div>
            </div>
          </div>
        </div>
        <div className="item">
          <div onClick={() => setFormStep(2)} className="title">
            <h2>Step 2: More comments</h2>
          </div>
          <div className={formStep === 2 ? "content show" : "content"}>
            <div className="form-control">
              <div>
                <p>
                  {errors.mobileNumber && <span>Valid UK number required</span>}
                </p>
                <label htmlFor="mobileNumber">Telephone number</label>

                <InputMask
                  mask="07999999999"
                  maskChar={null}
                  {...register("input")}
                >
                  {() => (
                    <input
                      type="tel"
                      name="mobileNumber"
                      {...register("mobileNumber")}
                    />
                  )}
                </InputMask>
              </div>
              <div>
                <p>{errors.gender && <span>Gender is required</span>}</p>
                <label htmlFor="gender">Gender</label>
                <select
                  {...register("gender")}
                  defaultValue="Select a Gender"
                  name="gender"
                  id=""
                >
                  <option disabled>Select a Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>
            <div className="form-control">
              <div>
                <p>
                  {errors.dateOfBirth && <span>Date of birth is required</span>}
                </p>
                <label htmlFor="dateOfBirth">Date of birth</label>
                <input
                  {...register("dateOfBirth")}
                  name="dateOfBirth"
                  type="date"
                />
              </div>
            </div>
            <div className="next-button">
              <div
                className="button"
                onClick={() =>
                  nextHandler("mobileNumber", "gender", "dateOfBirth")
                }
              >
                {"Next >"}
              </div>
            </div>
          </div>
        </div>
        <div className="item">
          <div onClick={() => setFormStep(3)} className="title">
            <h2>Step 3: Final comments</h2>
          </div>
          <div className={formStep === 3 ? "content show" : "content"}>
            <div className="form-control">
              <div>
                <label htmlFor="comments">Comments</label>
                <textarea
                  {...register("comments")}
                  rows="10"
                  cols="30"
                  type="textarea"
                  name="comments"
                ></textarea>
              </div>
              <div>
                <div className="next-button">
                  <button disabled={disable} type="submit" className="button">
                    {isLoading ? "Sending" : "Next >"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
