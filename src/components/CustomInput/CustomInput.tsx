import { FormState } from "react-hook-form";

interface IFormInput {
  pronouns: String;
  additionInfo: String;
}
const CustomInput = ({
  register,
  title,
  name,
  formState,
}: {
  register: any;
  title: string;
  name: string;
  formState?: FormState<IFormInput>;
}) => {
  const getValidation = (name: string) => {
    var obj: { [key: string]: any } = {};

    switch (name) {
      case "additionInfo":
        obj.minLength = {
          value: 30,
          message: "minimum 30 character required",
        };
        return obj;

      default:
        return obj;
    }
  };
  return (
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
              type='text'
              name='pronouns'
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
              <h4>{title}</h4>
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
      {formState?.errors
        ? [`additonInfo`] && (
            <small className='text-danger'>
              {formState.errors[`${name}`]?.message}
            </small>
          )
        : null}
    </>
  );
};

export default CustomInput;
