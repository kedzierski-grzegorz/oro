import {Injectable} from '@angular/core';
import {NotificationsService, NotificationType} from 'angular2-notifications';

@Injectable({
  providedIn: 'root'
})
export class FormHelpersService {

  constructor(
    private notifications: NotificationsService
  ) {
  }

  getLabelsOfInvalidFields(form: HTMLFormElement): string[] {
    const labels = [] as string[];

    const invalidFields = form.querySelectorAll(':invalid');

    for (let i = 0; i < invalidFields.length; i++) {
      const label = document.querySelector(`label[for="${invalidFields[i].id}"]`);
      if (label) {
        const labelText = label.innerHTML.replace('*', '').replace(/(<([^>]+)>)/ig, '');
        labels.push(labelText);
      }
    }

    return labels;
  }

  getSequence(n: number): any[] {
    return new Array(n);
  }

  validateForm(form: HTMLFormElement, subtext = '', title = ''): void {
    form.classList.add('was-validated');
    if (!form.checkValidity()) {
      let error = !title ? 'Please fill correctly fields:' : title;
      if (subtext) {
        error += '<br/>' + subtext;
      }
      const labels = this.getLabelsOfInvalidFields(form);

      for (const label of labels) {
        error += '<br/>- ' + label;
      }

      this.notifications.error(
        'Failure',
        error,
        NotificationType.Error
      );
      throw new Error(error);
    }
  }
}
