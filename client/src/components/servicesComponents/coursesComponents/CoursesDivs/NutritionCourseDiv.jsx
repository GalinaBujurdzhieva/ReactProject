import '../../../../assets/styles/services.css'

export const NutritionCourseDiv = ({ isVisible }) => {
  return isVisible ? (
    <div className="tt_class grid-item nutrition">
      <div className="tt_class_title">Nutrition</div>
      <div className="tt_class_instructor">Jessica Smith</div>
    </div>
  ) : (
    <div className="tt_class empty grid-item"></div>
  );
};
