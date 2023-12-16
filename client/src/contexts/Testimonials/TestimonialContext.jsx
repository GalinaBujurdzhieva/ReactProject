import {createContext, useState, useEffect } from 'react';
import * as testimonialService from '../../services/testimonialService'

const TestimonialContext = createContext();

const TestimonialProvider = ({children}) => {
    const [testimonials, setTestimonials] = useState([]);
    const [reloadTestimonialsAfterCreate, setReloadTestimonialsAfterCreate] = useState(false);
    const [reloadTestimonialsAfterDelete, setReloadTestimonialsAfterDelete] = useState(false);
    const [reloadTestimonialsAfterEdit, setReloadTestimonialsAfterEdit] = useState(false);

    useEffect(() => {
      testimonialService.getAll()
      .then((testimonials) => setTestimonials(testimonials))
      .catch((error) =>{
        throw error;
      });
    }, [reloadTestimonialsAfterCreate, reloadTestimonialsAfterEdit, reloadTestimonialsAfterDelete]);

    const addTestimonialFunc = (newTestimonial) => {
      const testimonialListAfterCreate = [...testimonials, newTestimonial];
      setTestimonials(testimonialListAfterCreate);
      setReloadTestimonialsAfterCreate(!reloadTestimonialsAfterCreate);
    };

    const deleteTestimonialFunc = (deletedTestimonial) =>{
      const testimonialListAfterDelete = testimonials.filter(testimonial => testimonial._id !== deletedTestimonial._id);
      setTestimonials(testimonialListAfterDelete);
      setReloadTestimonialsAfterDelete(!reloadTestimonialsAfterDelete);
    }
  
    const updateTestimonialFunc = (updatedTestimonial) => {
      const testimonialListAfterUpdate = testimonials.map(testimonial =>
        testimonial._id === updatedTestimonial._id ? updatedTestimonial : testimonial
      );
      setTestimonials(testimonialListAfterUpdate);
      setReloadTestimonialsAfterEdit(!reloadTestimonialsAfterEdit);
    };

  return (
    <TestimonialContext.Provider value={{testimonials, addTestimonialFunc, deleteTestimonialFunc, updateTestimonialFunc}}>
      {children}
    </TestimonialContext.Provider>
  );
};
export {TestimonialContext, TestimonialProvider};