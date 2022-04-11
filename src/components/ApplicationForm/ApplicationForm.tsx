import Input from "../Input";
import "./ApplicationForm.css";
import { useForm } from "react-hook-form";
const ApplicationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => console.log(data);
  return (
    <div className='form-section'>
      <div className='wrapper'>
        <h4>SUBMIT YOUR APPLICATION</h4>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input title={"Full Name"} register={register} name={"FullName"} />
          <Input title={"Email"} register={register} name={"Email"} />
          <Input title={"Phone"} register={register} name={"Phone"} />
          <Input
            title={"Current Company"}
            register={register}
            name={"CurrentCompany"}
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
