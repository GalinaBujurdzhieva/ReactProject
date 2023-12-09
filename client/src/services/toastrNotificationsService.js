import {toast} from 'react-toastify'

class ToastrNotificationsService{
    showSuccess(message) {
        toast.success(message, {
          theme: "dark"
        });
      }
    
      showError(message) {
        toast.warning(message, {
          theme: "dark"
        });
      }
}
export default new ToastrNotificationsService()