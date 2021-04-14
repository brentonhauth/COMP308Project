import Toastify from 'toastify-js';

const SUCCESS_COLOR = '#5cb85c';
const ERROR_COLOR = '#d9534f';

function show(text, backgroundColor) {
  Toastify({
    text,
    backgroundColor,
    position: 'center',
    duration: 1000,
  }).showToast();
}

const Toast = {
  success(text) {
    show(text, SUCCESS_COLOR);
  },

  error(err) {
    if (typeof err === 'string') {
      show(err, ERROR_COLOR)
    } else {
      show(err.message || String(err), ERROR_COLOR);
    }
  }
};

export default Toast;
