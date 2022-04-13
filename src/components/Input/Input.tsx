import "./Input.css";
import React, { useState } from "react";

const Input = ({
  register,
  setValue,
  title,
  name,
  isResume,
  isRequire,
  customInput,
}: {
  register: any;
  setValue: any;
  title: string;
  name: string;
  isResume: boolean;
  isRequire: boolean;
  customInput: boolean;
}) => {
  const [resumeName, setResumeName] = useState("");
  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.files && e.currentTarget.files[0]) {
      setResumeName(e.currentTarget.files[0].name);
    }
  };

  return (
    // {errors.lastName && <p>Last name is required.</p>}
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
                  {...(register(name),
                  isRequire ? { required: true } : { required: false })}
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
                    {...(register(name),
                    isRequire ? { required: true } : { required: false })}
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
              {isRequire && <span className='required'>✱</span>}
            </div>
            <div className='application-field'>
              {isResume ? (
                <a href='#' className='visible-resume'>
                  {resumeName ? (
                    <span className='filename'>{resumeName}</span>
                  ) : (
                    <span className='default-lable'>ATTACH RESUME/CV</span>
                  )}
                  <input
                    className='hidden-inp'
                    type='file'
                    {...(register(name), { required: true })}
                    onChange={(e) => handleOnChange(e)}
                  />
                </a>
              ) : (
                <input
                  type={name}
                  {...(register(name),
                  isRequire ? { required: true } : { required: false })}
                />
              )}
            </div>
          </label>
        </li>
      )}
    </div>
  );
};

export default Input;
