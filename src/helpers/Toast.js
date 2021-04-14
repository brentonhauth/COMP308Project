import Toastify from 'toastify-js';

const SUCCESS_COLOR = '#5cb85c';
const ERROR_COLOR = '#d9534f';

function toast(text, backgroundColor) {
  Toastify({
    text,
    backgroundColor,
    position: 'center',
    duration: 1000,
  }).showToast();
}

export default {
  success(text) {
    toast(text, SUCCESS_COLOR);
  },

  error(text) {
    toast(text, ERROR_COLOR);
  }
};
