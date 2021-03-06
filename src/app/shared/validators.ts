import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const imageRegex = new RegExp('(.*?)\.(jpg|png|jpeg)$');

export function imageValidator(control: AbstractControl): ValidationErrors | null {
    const imageFile = (control.value as string);

    if (!imageFile) {
        return null;
    };

    const imageName = imageFile.toLowerCase();
    const isValidImage = imageRegex.test(imageName);

    return isValidImage ? null : { imageValidator: true };
}

export function rePasswordValidatorFactory(targetControl: AbstractControl): ValidatorFn {
    return function rePasswordValidator(control: AbstractControl): ValidationErrors | null {
        const areTheSame = targetControl.value === control.value;
        return areTheSame ? null : { rePasswordValidator: true };
    };
}