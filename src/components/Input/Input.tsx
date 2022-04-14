import "./Input.css";
import React, { useState } from "react";
import { IoAttach } from "react-icons/io5";
import { FormState } from "react-hook-form";

interface IFormInput {
  Resume: Object;
  FullName: String;
  CurrentCompany: String;
  Email: String;
  LinkedInURL: String;
  TwitterURL: String;
  GithubURL: String;
  PortfolioURL: String;
  OtherWebsite: String;
  pronouns: String;
  additionalInfo: String;
}

const Input = ({
  register,
  title,
  name,
  isResume,
  formState,
  customInput,
}: {
  register: any;
  title: string;
  name: string;
  isResume: boolean;
  formState?: FormState<IFormInput>;
  customInput: boolean;
}) => {
  const [resumeName, setResumeName] = useState("");

  function handleOnChange(e: React.FormEvent<HTMLInputElement>) {
    if (e.currentTarget.files && e.currentTarget.files[0]) {
      setResumeName(e.currentTarget.files[0].name);
    }
  }

  const getValidation = (name: string) => {
    var obj: { [key: string]: any } = {};

    switch (name) {
      case "Resume":
        obj.required = { value: true, message: "this field is required" };
        return obj;

      case "FullName":
        obj.required = { value: true, message: "this field is required" };
        obj.minLength = { value: 10, message: "minimun character is 10" };
        return obj;

      case "Email":
        obj.pattern = {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
          message: "invalid email",
        };
        obj.required = { value: true, message: "this field is required" };
        return obj;

      case "Phone":
        obj.pattern = {
          value: /(\+[\d]{1,5}|0)[7-9]\d{9}$/,
          message: "invalid phone number",
        };
        obj.minLength = { value: 13, message: "country code required" };
        obj.required = { value: true, message: "this field is required" };
        return obj;

      case "LinkedinURL":
        obj.pattern = {
          value:
            /((https?:\/\/)?((www|\w\w)\.)?linkedin\.com\/)((([\w]{2,3})?)|([^/]+\/(([\w|\d-&#?=])+\/?){1,}))$/,
          message: "invalid linkedin Url",
        };
        obj.required = { value: true, message: "this field is required" };
        return obj;

      default:
        return obj;
    }
  };

  const req = (name: String): boolean => {
    return (
      name === "Email" ||
      name === "FullName" ||
      name === "Resume" ||
      name === "Phone"
    );
  };
  return (
    <div>
      {customInput ? (
        <>
          <li className='application-que custom-inp'>
            <div className='application-label full-width text'>
              <label>
                <div className='text'>
                  If you'd like, please share your pronouns with us.
                </div>
              </label>
              <div className='application-field full-width'>
                <input
                  type={name}
                  placeholder='Type your response'
                  {...register("pronouns")}
                />
              </div>
            </div>
          </li>
          <li className='application-que custom-inp'>
            <div className='application-label full-width text'>
              <label>
                <div className='text'>
                  <h4>ADDITIONAL INFORMATION</h4>
                </div>
              </label>
              <div className='application-field full-width'>
                <div className='textarea'>
                  <textarea
                    placeholder='Add a cover letter or anything else you want to share.'
                    {...register("additionInfo", getValidation(name))}
                  />
                </div>
              </div>
            </div>
          </li>
        </>
      ) : (
        <li className='application-que'>
          <label>
            <div className='application-label'>
              {title}
              {req(name) && <span className='required'>✱</span>}
            </div>
            <div className='application-field'>
              {isResume ? (
                <a href='#' className='visible-resume'>
                  {resumeName ? (
                    <span className='filename'>{resumeName}</span>
                  ) : (
                    <span className='default-lable'>
                      <IoAttach size={23} />
                      ATTACH RESUME/CV
                    </span>
                  )}
                  <input
                    className='hidden-inp'
                    type='file'
                    name={name}
                    {...register("Resume", getValidation(name))}
                    onChange={(e) => handleOnChange(e)}
                  />
                  {formState?.errors
                    ? [`${name}`] && (
                        <small className='text-danger'>
                          {formState.errors[`${name}`]?.message}
                        </small>
                      )
                    : null}
                </a>
              ) : (
                <input
                  type={name}
                  name={name}
                  {...register(name, getValidation(name))}
                />
              )}

              {formState?.errors
                ? [`${name}`] && (
                    <small className='text-danger'>
                      {formState.errors[`${name}`]?.message}
                    </small>
                  )
                : null}
            </div>
          </label>
        </li>
      )}
    </div>
  );
};

export default Input;
