import * as trainerHelper from '../../../../utils/getCourseTrainerName'

import '../../../../assets/styles/services.css'

export const WeightLossCourseDiv = ({ isVisible }) => {

  return isVisible 
  ? (
    <div className={"tt_class grid-item weight_loss"}>
      <div className="tt_class_title">Weight Loss</div>
      <div className="tt_class_instructor">{trainerHelper.getTrainerName('Weight Loss')}</div>
    </div>
  ) : (
    <div className="tt_class empty grid-item"></div>
  );
};
