import "./SelectBox.css";
const SelectBox = ({ register }: { register: any }) => {
  return (
    <>
      <div className='application-que'>
        <div className='application-label'>Gender</div>
        <div className='application-field'>
          <div className='application-selectbox'>
            <select id='selectBox' {...register("gender", { required: true })}>
              <option value=''>Select...</option>
              <option value='male'>Male</option>
              <option value='female'>Female</option>
              <option value='DeclineToSelfIdentify'>
                Decline to self identify
              </option>
            </select>
          </div>
        </div>
      </div>
      <div className='application-que'>
        <div className='application-label'>Race</div>
        <div className='application-field'>
          <div className='application-selectbox'>
            <select id='selectBox' {...register("race", { required: true })}>
              <option value=''>Select...</option>
              <option value='Hispanic or Latino'>Hispanic or Latino</option>
              <option value='White (Not Hispanic or Latino)'>
                White (Not Hispanic or Latino)
              </option>
              <option value='Black or African American (Not Hispanic or Latino)'>
                Black or African American (Not Hispanic or Latino)
              </option>
              <option value='Native Hawaiian or Other Pacific Islander (Not Hispanic or Latino)'>
                Native Hawaiian or Other Pacific Islander (Not Hispanic or
                Latino)
              </option>
              <option value='Asian (Not Hispanic or Latino)'>
                Asian (Not Hispanic or Latino)
              </option>
              <option value='American Indian or Alaska Native (Not Hispanic or Latino)'>
                American Indian or Alaska Native (Not Hispanic or Latino)
              </option>
              <option value='Two or More Races (Not Hispanic or Latino)'>
                Two or More Races (Not Hispanic or Latino)
              </option>
              <option value='Decline to self-identify'>
                Decline to self-identify
              </option>
            </select>
          </div>
        </div>
      </div>
      <div className='application-que'>
        <div className='application-label'>Veteran</div>
        <div className='application-field'>
          <div className='application-selectbox'>
            <select id='selectBox' {...register("veteran", { required: true })}>
              <option value=''>Select...</option>
              <option value='I am a veteran'>I am a veteran</option>
              <option value='I am not a veteran'>I am not a veteran</option>
              <option value='Decline to self identify'>
                Decline to self identify
              </option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectBox;
