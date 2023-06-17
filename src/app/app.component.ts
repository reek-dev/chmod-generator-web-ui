import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'chmod-generator';

  checkboxes: boolean[] = Array(9).fill(false);
  isResultVisible: boolean = false;
  octalResult: string = '';

  onCheckboxChange(checkboxNo: number) {
    switch (checkboxNo) {
      case 0:
        console.log('user-read is: ', this.checkboxes[0]);
        break;
      case 1:
        console.log('user-write is: ', this.checkboxes[1]);
        break;
      case 2:
        console.log('user-execute is: ', this.checkboxes[2]);
        break;
      case 3:
        console.log('group-read is: ', this.checkboxes[3]);
        break;
      case 4:
        console.log('group-write is: ', this.checkboxes[4]);
        break;
      case 5:
        console.log('group-execute is: ', this.checkboxes[5]);
        break;
      case 6:
        console.log('other-read is: ', this.checkboxes[6]);
        break;
      case 7:
        console.log('other-write is: ', this.checkboxes[7]);
        break;
      case 8:
        console.log('other-execute is: ', this.checkboxes[8]);
        break;
      default:
        console.log('N/A');
        break;
    }
    console.log(this.checkboxes);

    this.isResultVisible = true;

    this.octalResult = this.getOctalValueFromArray(this.checkboxes);
  }

  getOctalValueFromArray = (checkboxes: boolean[]): string => {
    let userPermissionNumber: number = 0;
    let groupPermissionNumber: number = 0;
    let otherPermissionNumber: number = 0;

    for (let i = 0; i <= 2; ++i) {
      if (checkboxes[i]) {
        if (i % 3 == 0) userPermissionNumber += 4;
        if (i % 3 == 1) userPermissionNumber += 2;
        if (i % 3 == 2) userPermissionNumber += 1;
      }
    }

    for (let i = 3; i <= 5; ++i) {
      if (checkboxes[i]) {
        if (i % 3 == 0) groupPermissionNumber += 4;
        if (i % 3 == 1) groupPermissionNumber += 2;
        if (i % 3 == 2) groupPermissionNumber += 1;
      }
    }

    for (let i = 6; i <= 8; ++i) {
      if (checkboxes[i]) {
        if (i % 3 == 0) otherPermissionNumber += 4;
        if (i % 3 == 1) otherPermissionNumber += 2;
        if (i % 3 == 2) otherPermissionNumber += 1;
      }
    }

    const permissionString: string =
      String(userPermissionNumber) +
      String(groupPermissionNumber) +
      String(otherPermissionNumber);

    return permissionString;
  };

  getSymbolicValueFromArray = (checkboxes: boolean[]): string => {
    return 'hello-symbolic';
  };

  symbolicResult: string = this.getSymbolicValueFromArray(this.checkboxes);
}
