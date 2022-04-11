import "./Input.css";

const Input = ({
  register,
  title,
  name,
}: {
  register: any;
  title: string;
  name: string;
}) => {
  return (
    // {errors.lastName && <p>Last name is required.</p>}

    <div>
      <li className='application-que'>
        <label>
          <div className='application-label'>
            {title}
            <span className='required'>✱</span>
          </div>
          <div className='application-field'>
            <input type={name} {...register(name)} required />
          </div>
        </label>
      </li>
    </div>
  );
};

export default Input;
