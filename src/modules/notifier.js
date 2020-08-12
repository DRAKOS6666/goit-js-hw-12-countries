import '../../node_modules/toastr/build/toastr.css';
const toastr = require('toastr');

toastr.options = {
  closeButton: true,
  debug: false,
  newestOnTop: false,
  progressBar: true,
  positionClass: 'toast-bottom-right',
  preventDuplicates: true,
  onclick: null,
  showDuration: '300',
  hideDuration: '1000',
  timeOut: '5000',
  extendedTimeOut: '1000',
  showEasing: 'swing',
  hideEasing: 'linear',
  showMethod: 'fadeIn',
  hideMethod: 'fadeOut',
};

function notify(action, status = true) {
  switch (action) {
    case 'isEmpty':
      if (!status) {
        toastr.success('Successful search');
      } else if (status) {
        toastr.error(
          'Enter text in the search box.',
          'Empty search input form',
        );
      }
      break;

    case 'isToMany':
      if (!status) {
        toastr.success('It was found a couple of results.');
      } else if (status) {
        toastr.warning(
          'Please enter a more specific query!',
          'Too many matches found',
        );
      }
      break;

    case 'isError':
      if (status) {
        toastr.error('Try a different search query.', 'Search error');
      }
      break;

    default:
      console.log('Error. Unknow notify action: notify(action, status)');

      break;
  }
}

export default notify;
