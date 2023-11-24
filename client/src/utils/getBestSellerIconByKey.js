import pilatesIcon from "../assets/images/icon_1.png";
import swimmingPoolIcon from "../assets/images/icon_2.png";
import healthyDietPlanIcon from "../assets/images/icon_3.png";

const bestSellerImage = {
    "Pilates with Trainer" : pilatesIcon,
    "Swimming Pool": swimmingPoolIcon,
    "Healthy Diet Plan": healthyDietPlanIcon
}

export const getIcon = (bestSeller) =>{
return bestSellerImage[bestSeller]
}