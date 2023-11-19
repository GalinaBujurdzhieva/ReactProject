import { useEffect, useRef, useState } from "react";

import * as trainerService from "../../../services/trainerService"

import "../../../assets/styles/register.css";
import "../../../assets/styles/about_team_member_forms.css";

export const AboutTeamMemberCreate = () => {
    const [values, setValues] = useState({
        name: "",
        age: 18, 
        courses: [],
        description: ""
    })
    const [checkboxes, setCheckboxes] = useState([{
        "Weight Loss": false,
        Yoga: false,
        Spinning: false,
        "Private Fitness": false,
        Nutrition: false,
        Pillates: false,
}]);
    const [trainerFormHasErrors, setTrainerFormHasErrors] = useState({
        name: "",
        age: "", 
        // courses: [],
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

      const createTrainerSubmitHandler = (e) => {
        e.preventDefault();
        //console.log(checkboxes);
        const trainerCourses = Object.keys(checkboxes).filter(key => checkboxes[key]);
        values.courses = trainerCourses.slice(1);
        //console.log(values.courses);
        const trainer = trainerService.create(values);
        console.log(trainer);
        // addBlogFunc(newBlog);
        // navigate("/blog/all");
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
                    {/* {blogFormHasErrors.text && (
                        <span className="error_message">
                          Text should be between 50 and 5000 characters
                        </span>
                      )} */}
                    <div>
                    <div className="form-check form-check-inline">
                      <input
                        type="checkbox"
                        name="Weight Loss"
                        className="newsletter_input_checkbox"
                        id="weight_loss"
                        value={checkboxes.weight_loss}
                        onChange={checkboxChangeHandler}
                        //onBlur={}
                      />
                      <label className="newsletter_input_label" htmlFor="weight_loss">Weight Loss</label>
                      <input
                        type="checkbox"
                        name="Yoga"
                        className="newsletter_input_checkbox"
                        id="yoga"
                        value={checkboxes.yoga}
                        onChange={checkboxChangeHandler}
                        //onBlur={}
                      />
                      <label className="newsletter_input_label" htmlFor="yoga">Yoga</label>
                      <input
                        type="checkbox"
                        name="Spinning"
                        className="newsletter_input_checkbox"
                        id="spinning"
                        value={checkboxes.spinning}
                        onChange={checkboxChangeHandler}
                        //onBlur={}
                      />
                      <label className="newsletter_input_label" htmlFor="spinning">Spinning</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        type="checkbox"
                        name="Private Fitness"
                        className="newsletter_input_checkbox"
                        id="private_fitness"
                        value={checkboxes.private_fitness}
                        onChange={checkboxChangeHandler}
                        //onBlur={}
                      />
                      <label className="newsletter_input_label" htmlFor="private_fitness">Private Fitness</label>
                      <input
                        type="checkbox"
                        name="Nutrition"
                        className="newsletter_input_checkbox"
                        id="nutrition"
                        value={checkboxes.nutrition}
                        onChange={checkboxChangeHandler}
                        //onBlur={}
                      />
                      <label className="newsletter_input_label" htmlFor="nutrition">Nutrition</label>
                      <input
                        type="checkbox"
                        name="Pillates"
                        className="newsletter_input_checkbox"
                        id="pillates"
                        value={checkboxes.pillates}
                        onChange={checkboxChangeHandler}
                        //onBlur={}
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
                        //   disabled={Object.values(blogFormHasErrors).some(
                        //     (x) => x
                        //   )}
                        className="newsletter_button text-center"
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
