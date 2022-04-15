import "./ApplicationForm.css";
import { useState, useRef } from "react";

import Input from "../Input";
import SelectBox from "../SelectBox";

import { useForm, SubmitHandler } from "react-hook-form";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";

import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { db } from "../firebase/Firebase";

enum GenderEnum {
  male = "male",
  female = "female",
  DeclineToSelfIdentify = "Decline to self identify",
}
enum Race {
  hispanic = "Hispanic or Latino",
  white = "White (Not Hispanic or Latino)",
  black = "Black or African American (Not Hispanic or Latino)",
  hawaiian = "Native Hawaiian or Other Pacific Islander (Not Hispanic or Latino)",
  asian = "Asian (Not Hispanic or Latino)",
  american = "American Indian or Alaska Native (Not Hispanic or Latino)",
  mixed = "Two or More Races (Not Hispanic or Latino)",
  decline = "Decline to self-identify",
}

enum Veteran {
  veteran = "I am a veteran",
  notVeteran = "I am not a veteran",
  decline = "Decline to self identify",
}

const ApplicationForm = () => {
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
    gender: GenderEnum;
    race: Race;
    veteran: Veteran;
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
    formState,
  } = useForm<IFormInput>();

  const [isCaptcha, setCaptcha] = useState(false);
  const [token, setToken] = useState<string[]>([]);
  const captchaRef = useRef<HCaptcha>(null);

  const onExpire = () => {
    console.log("hCaptcha Token Expired");
  };

  const onError = (err: any) => {
    console.log(`hCaptcha Error: ${err}`);
  };

  const onErrors = (errors: Object) => {
    console.log(errors);
  };

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log(data);

    async function applicationUpload(data: any) {
      const resume = data.Resume[0];
      console.log(resume);
      const storage = getStorage();
      const storageRef = ref(storage, resume.name);
      const upload = uploadBytesResumable(storageRef, resume);

      try {
        const res = await addDoc(collection(db, "applications"), {
          resumeLink: "",
          FullName: data.FullName,
          Email: data.Email,
          Phone: data.Phone,
          CurrentCompany: data.CurrentCompany,
          LinkedInURL: data.LinkedInURL,
          TwitterURL: data.TwitterURL,
          GithubURL: data.GithubURL,
          PortfolioURL: data.PortfolioURL,
          OtherWebsite: data.OtherWebsite,
          pronouns: data.pronouns,
          addInfo: data.additionInfo,
          gender: data.gender,
          race: data.race,
          veteran: data.veteran,
        });

        try {
          const uploadToStrapi = async (data: any) => {
            await fetch("http://localhost:1337/api/applications", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                resume: data.Resume[0],
                fullname: data.FullName,
                email: data.Email,
                phone: data.Phone,
                company: data.CurrentCompany,
                linkedin: data.LinkedInURL,
                twitter: data.TwitterURL,
                github: data.GithubURL,
                portfolio: data.PortfolioURL,
                otherwebsite: data.OtherWebsite,
                pronouns: data.pronouns,
                addinfo: data.additionInfo,
                gender: data.gender,
              }),
            });
          };
        } catch {
          (err: Object) => console.log(err);
        }

        const getResumeURL = async () => {
          getDownloadURL(upload.snapshot.ref).then(async (url) => {
            console.log(`resume url ${url}`);
            await updateDoc(doc(db, "applications", res.id), {
              resumeURL: (data.resumeLink = url),
            });
          });
        };

        getResumeURL();
        alert("Submit Sucessfull");
      } catch (error) {
        console.log(error);
      }
    }
    if (token) {
      applicationUpload(data);
    } else {
      alert("Captcha Not Verified..");
    }
  };

  const onLoad = (): void => {
    captchaRef.current?.execute();
  };

  return (
    <div className='form-section'>
      <div className='wrapper'>
        <h4>SUBMIT YOUR APPLICATION</h4>
        <form onSubmit={handleSubmit(onSubmit, onErrors)}>
          <Input
            title={"Resume/CV"}
            register={register}
            name={"Resume"}
            isResume={true}
            customInput={false}
            formState={formState}
          />
          <Input
            title={"Full Name"}
            register={register}
            name={"FullName"}
            isResume={false}
            customInput={false}
            formState={formState}
          />
          <Input
            title={"Email"}
            register={register}
            name={"Email"}
            isResume={false}
            customInput={false}
            formState={formState}
          />
          <Input
            title={"Phone"}
            register={register}
            name={"Phone"}
            isResume={false}
            customInput={false}
            formState={formState}
          />
          <Input
            title={"Current Company"}
            register={register}
            name={"CurrentCompany"}
            isResume={false}
            customInput={false}
            formState={formState}
          />

          <h4>LINKS</h4>
          <Input
            title={"LinkedIn URL"}
            register={register}
            name={"LinkedInURL"}
            isResume={false}
            customInput={false}
            formState={formState}
          />
          <Input
            title={"Twitter URL"}
            register={register}
            name={"TwitterURL"}
            isResume={false}
            customInput={false}
            formState={formState}
          />
          <Input
            title={"Github URL"}
            register={register}
            name={"GithubURL"}
            isResume={false}
            customInput={false}
            formState={formState}
          />
          <Input
            title={"Portfolio URL"}
            register={register}
            name={"PortfolioURL"}
            isResume={false}
            customInput={false}
            formState={formState}
          />
          <Input
            title={"Other website"}
            register={register}
            name={"OtherWebsite"}
            isResume={false}
            customInput={false}
            formState={formState}
          />

          <h4>PREFERRED PRONOUNS</h4>
          <Input
            title={"If you'd like, please share your pronouns with us."}
            register={register}
            name={"OtherWebsite"}
            isResume={false}
            customInput={true}
            formState={formState}
          />
          <div className='wrapper'>
            <hr />
            <h4>
              U.S. Equal Employment Opportunity information
              <span className='light-text'>
                (Completion is voluntary and will not subject you to adverse
                treatment)
              </span>
            </h4>
            <p>
              Our company values diversity. To ensure that we comply with
              reporting requirements and to learn more about how we can increase
              diversity in our candidate pool, we invite you to voluntarily
              provide demographic information in a confidential survey at the
              end of this application. Providing this information is optional.
              It will not be accessible or used in the hiring process, and has
              no effect on your opportunity for employment.
            </p>

            <SelectBox register={register} />
          </div>

          <div className='captcha'>
            <HCaptcha
              sitekey='10000000-ffff-ffff-ffff-000000000001'
              onVerify={(string) => setToken([string])}
              onError={onError}
              onExpire={onExpire}
              ref={captchaRef}
            />
            {token && (
              <small className='text-danger'>Verification Required</small>
            )}
          </div>

          <div className='submit-btn-container'>
            <button className='submit-btn' type='submit'>
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplicationForm;
