import '../../../../assets/styles/services.css'

export const SwimmingCourseDiv = ({ isVisible }) => {
  return isVisible ? (
    <div className="tt_class grid-item swimming">
      <div className="tt_class_title">Swimming</div>
      <div className="tt_class_instructor">Jessica Smith</div>
    </div>
  ) : (
    <div className="tt_class empty grid-item"></div>
  );
};
