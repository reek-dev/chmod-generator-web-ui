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
  symbolicResult: string = '';

  placeholderForFileOrFolder: string = '[your-file-name-here]';
  generatedOctalResult: string = '';
  generatedSymbolicResult: string = '';

  checkIfAllFalse(arr: boolean[]): boolean {
    return arr.every((value) => value === false);
  }

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
    this.generatedOctalResult =
      'chmod ' + this.octalResult + ' ' + this.placeholderForFileOrFolder;

    if (this.checkIfAllFalse(this.checkboxes))
      this.generatedSymbolicResult =
        'chmod a-rwx ' + this.placeholderForFileOrFolder;
    else {
      this.generatedSymbolicResult =
        'chmod a+rwx' +
        this.getSymbolicValueFromArray(this.checkboxes) +
        ' ' +
        this.placeholderForFileOrFolder;
    }
  }

  getOctalValueFromArray = (checkboxes: boolean[]): string => {
    let userPermissionNumber: number = 0;
    let groupPermissionNumber: number = 0;
    let otherPermissionNumber: number = 0;

    for (let i = 0; i <= 2; ++i) {
      if (checkboxes[i]) {
        if (i % 3 == 0) userPermissionNumber += 4;
        else if (i % 3 == 1) userPermissionNumber += 2;
        else if (i % 3 == 2) userPermissionNumber += 1;
      }
    }

    for (let i = 3; i <= 5; ++i) {
      if (checkboxes[i]) {
        if (i % 3 == 0) groupPermissionNumber += 4;
        else if (i % 3 == 1) groupPermissionNumber += 2;
        else if (i % 3 == 2) groupPermissionNumber += 1;
      }
    }

    for (let i = 6; i <= 8; ++i) {
      if (checkboxes[i]) {
        if (i % 3 == 0) otherPermissionNumber += 4;
        else if (i % 3 == 1) otherPermissionNumber += 2;
        else if (i % 3 == 2) otherPermissionNumber += 1;
      }
    }

    const permissionString: string =
      String(userPermissionNumber) +
      String(groupPermissionNumber) +
      String(otherPermissionNumber);

    return permissionString;
  };

  getSymbolicValueFromArray = (checkboxes: boolean[]): string => {
    const userPermissionArray: boolean[] = checkboxes.slice(0, 3);
    const groupPermissionArray: boolean[] = checkboxes.slice(3, 6);
    const otherPermissionArray: boolean[] = checkboxes.slice(6, 9);

    let userPermissionString = this.getSubarrayAndGeneratePermissionString(
      userPermissionArray,
      'u'
    );
    let groupPermissionString = this.getSubarrayAndGeneratePermissionString(
      groupPermissionArray,
      'g'
    );
    let otherPermissionString = this.getSubarrayAndGeneratePermissionString(
      otherPermissionArray,
      'o'
    );

    let entirePermissionString = '';

    if (userPermissionArray.length != 0) {
      entirePermissionString += userPermissionString;
    }
    if (groupPermissionString.length != 0) {
      entirePermissionString += groupPermissionString;
    }
    if (otherPermissionString.length != 0) {
      entirePermissionString += otherPermissionString;
    }

    return entirePermissionString;
  };

  getSubarrayAndGeneratePermissionString = (
    arr: boolean[],
    entity: string
  ): string => {
    let userPermissionNumber: number = 0;
    for (let i = 0; i < arr.length; ++i) {
      if (arr[i]) {
        if (i == 0) userPermissionNumber += 4;
        else if (i == 1) userPermissionNumber += 2;
        else if (i == 2) userPermissionNumber += 1;
      }
    }

    let generatedPermissionStringForEntity: string = '';
    switch (userPermissionNumber) {
      case 0:
        generatedPermissionStringForEntity = ',' + entity + '-rwx';
        break;
      case 1:
        generatedPermissionStringForEntity = ',' + entity + '-rw';
        break;
      case 2:
        generatedPermissionStringForEntity = ',' + entity + '-rx';
        break;
      case 3:
        generatedPermissionStringForEntity = ',' + entity + '-r';
        break;
      case 4:
        generatedPermissionStringForEntity = ',' + entity + '-wx';
        break;
      case 5:
        generatedPermissionStringForEntity = ',' + entity + '-w';
        break;
      case 6:
        generatedPermissionStringForEntity = ',' + entity + '-x';
        break;
      case 7:
        generatedPermissionStringForEntity = '';
        break;
      default:
        console.log('N/A');
        break;
    }

    return generatedPermissionStringForEntity;
  };
}
