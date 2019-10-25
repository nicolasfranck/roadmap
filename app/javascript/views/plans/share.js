import * as notifier from '../../utils/notificationHelper';
import { isObject, isString } from '../../utils/isType';

$(() => {
  $('#set_visibility [name="plan[visibility]"]').click((e) => {
    $(e.target).closest('form').submit();
  });
  $('#set_visibility').on('ajax:success', (e, data) => {
    if (isObject(data) && isString(data.msg)) {
      notifier.renderNotice(data.msg);
    }
  });
  $('#set_visibility').on('ajax:error', (e, xhr) => {
    if (isObject(xhr.responseJSON)) {
      notifier.renderAlert(xhr.responseJSON.msg);
    } else {
      notifier.renderAlert(`${xhr.statusCode} - ${xhr.statusText}`);
    }
  });

  $('#set_register').on('ajax:success', (e, data) => {
    $(e.target).find('.spinner').html('');
    if (isObject(data) && isString(data.msg)) {
      notifier.renderNotice(data.msg);
    }
  });
  $('#set_register').on('ajax:error', (e, xhr) => {
    $(e.target).find('.spinner').html('');
    if (isObject(xhr.responseJSON)) {
      notifier.renderAlert(`Unable to register your plan: ${xhr.responseJSON.msg[0]}`);
    } else {
      notifier.renderAlert(`Unable to register your plan: ${xhr.statusText}`);
    }
  });
  $('#set_register').on('submit', (e) => {
    $(e.target).find('.spinner').html('Registering your plan ... please wait');
  });
});
