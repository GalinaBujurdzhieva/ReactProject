import '../../../../assets/styles/services.css'

export const FitnessCourseDiv = ({ isVisible }) => {
  return isVisible ? (
    <div className="tt_class grid-item fitness">
      <div className="tt_class_title">Fitness</div>
      <div className="tt_class_instructor">Jessica Smith</div>
    </div>
  ) : (
    <div className="tt_class empty grid-item"></div>
  );
};
