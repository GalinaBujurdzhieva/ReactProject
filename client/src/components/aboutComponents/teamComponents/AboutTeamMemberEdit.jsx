import { useEffect, useRef, useState, useContext } from "react";
import { useNavigate, useParams} from "react-router-dom";

import * as trainerService from "../../../services/trainerService"
import { TrainerContext } from "../../../contexts/Trainers/TrainerContext";
import * as imageHelper from "../../../utils/getImageByKey";

import "../../../assets/styles/register.css";
import "../../../assets/styles/about_team_member_forms.css";

export const AboutTeamMemberEdit = ({handleClick}) => {
    const {trainers, updateTrainerFunc} = useContext(TrainerContext);
    const {_id} = useParams();
    const navigate = useNavigate();
    const trainerToBeEdited = Object.values(trainers).find(trainer => trainer._id === _id);

    const initialInputValues = {
      _id: trainerToBeEdited._id,
      name: trainerToBeEdited.name,
      age: trainerToBeEdited.age, 
      imageUrl: trainerToBeEdited.imageUrl !== undefined ? trainerToBeEdited.imageUrl : imageHelper.getImage(trainerToBeEdited.name),
      courses: trainerToBeEdited.courses,
      description: trainerToBeEdited.description
  }

    const [values, setValues] = useState({
        _id: trainerToBeEdited._id,
        name: trainerToBeEdited.name,
        age: trainerToBeEdited.age, 
        imageUrl: trainerToBeEdited.imageUrl !== undefined ? trainerToBeEdited.imageUrl : imageHelper.getImage(trainerToBeEdited.name),
        courses: trainerToBeEdited.courses,
        description: trainerToBeEdited.description
    })

    const initialCheckboxValues = {
        "Weight Loss": values.courses.includes('Weight Loss') ? true : false,
        Yoga: values.courses.includes('Yoga') ? true : false,
        Spinning: values.courses.includes('Spinning') ? true : false,
        "Private Fitness": values.courses.includes('Private Fitness') ? true : false,
        Nutrition: values.courses.includes('Nutrition') ? true : false,
        Pillates: values.courses.includes('Pillates') ? true : false,
    }

    const [checkboxes, setCheckboxes] = useState(initialCheckboxValues);
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

      const editTrainerSubmitHandler = (e) => {
        e.preventDefault();
        const trainerCourses = Object.keys(checkboxes).filter(key => checkboxes[key]);
        values.courses = trainerCourses;

        const trainer = trainerService.edit(_id, values);
        updateTrainerFunc(trainer);
        navigate('/about');
      };

      const trainerNameAndDescriptionErrorHandler = (e, minLength, maxLength) => {
        setTrainerFormHasErrors((state) => ({
          ...state,
          [e.target.name]:
            values[e.target.name].length < minLength ||
            values[e.target.name].length > maxLength,
        }));
      };

      const isPositive = (e) => {
        let number = Number(e.target.value);
        setTrainerFormHasErrors(state => ({
            ...state,
            [e.target.name] : number < 18
        }))
      }

      const imageUrlErrorHandler = (e) => {
        const regex = new RegExp("^https?://.+/");
        if (!values.imageUrl.includes('/src/assets/images/')) {
          setTrainerFormHasErrors((state) => ({
            ...state,
            [e.target.name]: !regex.test(e.target.value),
          }));
        }
      };
    return (
        <div className="footer">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 offset-lg-2">
                <div className="footer_container">
                  <div className="footer_content ">
                    <div className="newsletter_container">
                      <h2 className="register text-center">Edit Trainer</h2>
                      <form
                        onSubmit={editTrainerSubmitHandler}
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
                          onBlur={isPositive}
                        />
                        <div>
                        <div className="form-check form-check-inline">
                          <input
                            type="checkbox"
                            name="Weight Loss"
                            className="newsletter_input_checkbox"
                            id="weight_loss"
                            checked={checkboxes['Weight Loss']}
                            value={checkboxes.weight_loss}
                            onChange={checkboxChangeHandler}
                          />
                          <label className="newsletter_input_label" htmlFor="weight_loss">Weight Loss</label>
                          <input
                            type="checkbox"
                            name="Yoga"
                            className="newsletter_input_checkbox"
                            id="yoga"
                            checked={checkboxes['Yoga']}
                            value={checkboxes.yoga}
                            onChange={checkboxChangeHandler}
                          />
                          <label className="newsletter_input_label" htmlFor="yoga">Yoga</label>
                          <input
                            type="checkbox"
                            name="Spinning"
                            className="newsletter_input_checkbox"
                            id="spinning"
                            checked={checkboxes['Spinning']}
                            value={checkboxes.spinning}
                            onChange={checkboxChangeHandler}
                          />
                          <label className="newsletter_input_label" htmlFor="spinning">Spinning</label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            type="checkbox"
                            name="Private Fitness"
                            className="newsletter_input_checkbox"
                            id="private_fitness"
                            checked={checkboxes['Private Fitness']}
                            value={checkboxes.private_fitness}
                            onChange={checkboxChangeHandler}
                          />
                          <label className="newsletter_input_label" htmlFor="private_fitness">Private Fitness</label>
                          <input
                            type="checkbox"
                            name="Nutrition"
                            className="newsletter_input_checkbox"
                            id="nutrition"
                            checked={checkboxes['Nutrition']}
                            value={checkboxes.nutrition}
                            onChange={checkboxChangeHandler}
                          />
                          <label className="newsletter_input_label" htmlFor="nutrition">Nutrition</label>
                          <input
                            type="checkbox"
                            name="Pillates"
                            className="newsletter_input_checkbox"
                            id="pillates"
                            checked={checkboxes['Pillates']}
                            value={checkboxes.pillates}
                            onChange={checkboxChangeHandler}
                          />
                          <label className="newsletter_input_label" htmlFor="pillates">Pillates</label>
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
                            edit trainer
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
}