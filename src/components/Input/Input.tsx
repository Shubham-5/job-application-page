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
  additionInfo: String;
}

const Input = ({
  register,
  title,
  name,
  isResume,
  formState,
}: {
  register: any;
  title: string;
  name: string;
  isResume: boolean;
  formState?: FormState<IFormInput>;
}) => {
  const [resumeName, setResumeName] = useState("");

  function handleOnChange(e: React.FormEvent<HTMLInputElement>) {
    if (e.currentTarget.files && e.currentTarget.files[0]) {
      if (e.currentTarget.files[0].size > 50000000) {
        alert("file size greater than 5 MB");
      } else {
        setResumeName(e.currentTarget.files[0].name);
      }
    }
  }

  const getValidation = (name: string) => {
    var obj: { [key: string]: any } = {};

    switch (name) {
      case "Resume":
        obj.required = { value: true, message: "Resume is required" };
        obj.pattern = {
          value: /[0-9]+[.][0-9A-Za-z]+[.][Pp][Dd][Ff]/,
          message: "only pdf file allowed",
        };
        return obj;

      case "FullName":
        obj.required = { value: true, message: "Full name is required" };
        obj.minLength = {
          value: 10,
          message: "minimun 10 character is required",
        };
        return obj;

      case "Email":
        obj.pattern = {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
          message: "invalid email",
        };
        obj.required = { value: true, message: "Email is required" };
        return obj;

      case "Phone":
        obj.pattern = {
          value: /(\+[\d]{1,5}|0)[7-9]\d{9}$/,
          message: "invalid phone number",
        };
        obj.minLength = { value: 13, message: "country code required" };
        obj.required = { value: true, message: " Phone number is required" };
        return obj;

      case "LinkedinURL":
        obj.pattern = {
          value:
            /((https?:\/\/)?((www|\w\w)\.)?linkedin\.com\/)((([\w]{2,3})?)|([^/]+\/(([\w|\d-&#?=])+\/?){1,}))$/,
          message: "invalid linkedin Url",
        };
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
                  accept='application/pdf'
                  {...register("Resume", getValidation(name))}
                  onChange={(e) => handleOnChange(e)}
                />
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
                  <small className='text-danger '>
                    {formState.errors[`${name}`]?.message}
                  </small>
                )
              : null}
          </div>
        </label>
      </li>
    </div>
  );
};

export default Input;
