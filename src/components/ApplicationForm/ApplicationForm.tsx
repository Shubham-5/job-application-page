import Input from "../Input";
import "./ApplicationForm.css";
import { useForm, SubmitHandler } from "react-hook-form";
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
}
const ApplicationForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = handleSubmit((data) => console.log(data));
  console.log(watch("Email"));

  return (
    <div className='form-section'>
      <div className='wrapper'>
        <h4>SUBMIT YOUR APPLICATION</h4>
        <form onSubmit={onSubmit}>
          <Input
            title={"Resume/CV"}
            register={register}
            setValue={setValue}
            name={"Resume"}
            isResume={true}
            isRequire={true}
            customInput={false}
          />
          <Input
            title={"Full Name"}
            register={register}
            setValue={setValue}
            name={"FullName"}
            isResume={false}
            isRequire={true}
            customInput={false}
          />
          <Input
            title={"Email"}
            register={register}
            setValue={setValue}
            name={"Email"}
            isResume={false}
            isRequire={true}
            customInput={false}
          />
          <Input
            title={"Phone"}
            register={register}
            setValue={setValue}
            name={"Phone"}
            isResume={false}
            isRequire={true}
            customInput={false}
          />
          <Input
            title={"Current Company"}
            setValue={setValue}
            register={register}
            name={"CurrentCompany"}
            isResume={false}
            isRequire={true}
            customInput={false}
          />

          <h4>LINKS</h4>
          <Input
            title={"LinkedIn URL"}
            setValue={setValue}
            register={register}
            name={"LinkedInURL"}
            isResume={false}
            isRequire={false}
            customInput={false}
          />
          <Input
            title={"Twitter URL"}
            setValue={setValue}
            register={register}
            name={"TwitterURL"}
            isResume={false}
            isRequire={false}
            customInput={false}
          />
          <Input
            title={"Github URL"}
            setValue={setValue}
            register={register}
            name={"GithubURL"}
            isResume={false}
            isRequire={false}
            customInput={false}
          />
          <Input
            title={"Portfolio URL"}
            setValue={setValue}
            register={register}
            name={"PortfolioURL"}
            isResume={false}
            isRequire={false}
            customInput={false}
          />
          <Input
            title={"Other website"}
            setValue={setValue}
            register={register}
            name={"OtherWebsite"}
            isResume={false}
            isRequire={false}
            customInput={false}
          />

          <h4>PREFERRED PRONOUNS</h4>
          <Input
            title={"If you'd like, please share your pronouns with us."}
            setValue={setValue}
            register={register}
            name={"OtherWebsite"}
            isResume={false}
            isRequire={false}
            customInput={true}
          />

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
