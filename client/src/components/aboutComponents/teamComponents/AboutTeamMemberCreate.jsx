import { useEffect, useRef, useState, useContext } from "react";
import { useNavigate} from "react-router-dom";

import * as trainerService from "../../../services/trainerService"
import { TrainerContext } from "../../../contexts/Trainers/TrainerContext";

import "../../../assets/styles/register.css";
import "../../../assets/styles/about_team_member_forms.css";

export const AboutTeamMemberCreate = ({handleClick}) => {
    const [values, setValues] = useState({
        name: "",
        age: 18, 
        imageUrl: "",
        courses: [],
        description: ""
    })
    const [checkboxes, setCheckboxes] = useState([{
        "Weight Loss": false,
        Yoga: false,
        Swimming: false,
        "Private Fitness": false,
        Nutrition: false,
        Pilates: false,
}]);
    const [trainerFormHasErrors, setTrainerFormHasErrors] = useState({
        name: "",
        age: "", 
        imageUrl: "",
        description: ""
      }); 

    const nameInputRef = useRef();
    useEffect(() =>{
        nameInputRef.current.focus()
    },[])

    const {addTrainerFunc} = useContext(TrainerContext);
    const navigate = useNavigate();

    const changeHandler = (e) => {
        setValues((state) => ({
          ...state,
          [e.target.name]: e.target.value,
        }));
      };

      const checkboxChangeHandler = (e) => {
        setCheckboxes((state) => ({
          ...state,
          [e.target.name]: e.target.checked,
        }));
      }; 

      const createTrainerSubmitHandler = (e) => {
        e.preventDefault();
        const trainerCourses = Object.keys(checkboxes).filter(key => checkboxes[key]);
        values.courses = trainerCourses.slice(1);
        const trainer = trainerService.create(values);
        addTrainerFunc(trainer);
        navigate('/about');
      };

      const trainerNameAndDescriptionErrorHandler = (e, minLength, maxLength) => {
        setTrainerFormHasErrors((state) => ({
          ...state,
          [e.target.name]:
            values[e.target.name].length < minLength ||
            values[e.target.name].length > maxLength ||
            values[e.target.name].trim().length === 0,
        }));
      };

      const isMoreThanEighteen = (e) => {
        let number = Number(e.target.value);
        setTrainerFormHasErrors(state => ({
            ...state,
            [e.target.name] : number < 18
        }))
      }
      const imageUrlErrorHandler = (e) => {
        const regex = new RegExp("^https?://.+/");
        setTrainerFormHasErrors((state) => ({
          ...state,
          [e.target.name]: !regex.test(e.target.value) 
        }));
      };

  return (
    <div className="footer">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 offset-lg-2">
            <div className="footer_container">
              <div className="footer_content ">
                <div className="newsletter_container">
                  <h2 className="register text-center">Add New Trainer</h2>
                  <form
                    onSubmit={createTrainerSubmitHandler}
                    action="#"
                    id="newsletter_form"
                    className="newsletter_form"
                  >
                     {trainerFormHasErrors.name && (
                        <span className="error_message">
                          Name should be between 3 and 100 characters
                        </span>
                      )} 
                    <input
                      type="text"
                      name="name"
                      className="newsletter_input"
                      placeholder="Name"
                      required="required"
                      value={values.name}
                      onChange={changeHandler}
                      onBlur={(e) => trainerNameAndDescriptionErrorHandler(e, 3, 100)}
                      ref={nameInputRef}
                    />
                    {trainerFormHasErrors.imageUrl && (
                      <span className="error_message">
                        Please, type correct image url
                      </span>
                    )}
                    <input
                      type="text"
                      name="imageUrl"
                      className="newsletter_input"
                      placeholder="Image"
                      required="required"
                      value={values.imageUrl}
                      onChange={changeHandler}
                      onBlur={(e) => imageUrlErrorHandler(e)}
                    />
                    {trainerFormHasErrors.age && (
                        <span className="error_message">
                          Age must be higher or equal to 18.
                        </span>
                      )} 
                    <input
                      type="number"
                      name="age"
                      className="newsletter_input"
                      placeholder="Age"
                      required="required"
                      value={values.age}
                      onChange={changeHandler}
                      onBlur={isMoreThanEighteen}
                    />
                    <div>
                    <div className="form-check form-check-inline">
                      <input
                        type="checkbox"
                        name="Weight Loss"
                        className="newsletter_input_checkbox"
                        id="weight_loss"
                        value={checkboxes.weight_loss}
                        onChange={checkboxChangeHandler}
                      />
                      <label className="newsletter_input_label" htmlFor="weight_loss">Weight Loss</label>
                      <input
                        type="checkbox"
                        name="Yoga"
                        className="newsletter_input_checkbox"
                        id="yoga"
                        value={checkboxes.yoga}
                        onChange={checkboxChangeHandler}
                      />
                      <label className="newsletter_input_label" htmlFor="yoga">Yoga</label>
                      <input
                        type="checkbox"
                        name="Swimming"
                        className="newsletter_input_checkbox"
                        id="swimming"
                        value={checkboxes.swimming}
                        onChange={checkboxChangeHandler}
                      />
                      <label className="newsletter_input_label" htmlFor="swimming">Swimming</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        type="checkbox"
                        name="Private Fitness"
                        className="newsletter_input_checkbox"
                        id="private_fitness"
                        value={checkboxes.private_fitness}
                        onChange={checkboxChangeHandler}
                      />
                      <label className="newsletter_input_label" htmlFor="private_fitness">Private Fitness</label>
                      <input
                        type="checkbox"
                        name="Nutrition"
                        className="newsletter_input_checkbox"
                        id="nutrition"
                        value={checkboxes.nutrition}
                        onChange={checkboxChangeHandler}
                      />
                      <label className="newsletter_input_label" htmlFor="nutrition">Nutrition</label>
                      <input
                        type="checkbox"
                        name="Pilates"
                        className="newsletter_input_checkbox"
                        id="pilates"
                        value={checkboxes.pilates}
                        onChange={checkboxChangeHandler}
                      />
                      <label className="newsletter_input_label" htmlFor="pilates">Pilates</label>
                    </div>
                    </div>
                    {trainerFormHasErrors.description && (
                        <span className="error_message">
                          Description should be between 50 and 1000 characters
                        </span>
                      )} 
                    <textarea
                      name="description"
                      className="newsletter_textarea"
                      placeholder="About trainer"
                      required="required"
                      value={values.description}
                      onChange={changeHandler}
                      onBlur={(e) => trainerNameAndDescriptionErrorHandler(e, 50, 1000)}
                    ></textarea>
                    <div className="d-flex justify-content-center">
                      <button
                        type="submit"
                          disabled={Object.values(trainerFormHasErrors).some(
                            (x) => x
                          )}
                        className="newsletter_button text-center"
                        onClick={handleClick}
                      >
                        add trainer
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
