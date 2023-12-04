import * as trainerHelper from '../../../../utils/getCourseTrainerName'

import '../../../../assets/styles/services.css'

export const PilatesCourseDiv = ({ isVisible }) => {
  return isVisible ? (
    <div className="tt_class grid-item pilates">
      <div className="tt_class_title">Pilates</div>
      <div className="tt_class_instructor">{trainerHelper.getTrainerName('Pilates')}</div>
    </div>
  ) : (
    <div className="tt_class empty grid-item"></div>
  );
};
