import weightLossIcon from "../assets/images/weight-loss-class-icon.png";
import yogaClassesIcon from "../assets/images/yoga-class-icon.png";
import swimmingClassIcon from "../assets/images/swimming-class-icon.png";
import privateFitClassIcon from "../assets/images/private-fit-class-icon.png";
import nutritionClassesIcon from "../assets/images/nutrition-class-icon.png";
import pilatesClassesIcon from "../assets/images/pilates-class-icon.png";

const images = {
    'Weight Loss': weightLossIcon,
    'Yoga': yogaClassesIcon,
    'Swimming': swimmingClassIcon,
    'Private Fit': privateFitClassIcon,
    'Nutrition': nutritionClassesIcon,
    'Pilates': pilatesClassesIcon,
}

export const getIcon= (courseName) =>{
return images[courseName]
}