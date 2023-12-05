import {toast} from 'react-toastify'

class ToastrNotificationsService{
    showSuccess(message) {
        toast.success(message);
      }
    
      showError(message) {
        toast.warning(message, {
          theme: "dark"
        });
      }
}
export default new ToastrNotificationsService()