import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  includeLetters = false;
  includeNumbers = false;
  includeSymbols = false;
  passwordLength = 0;
  password = '';
  errorMessages = {
    passwordLength: '',
    includeOptions: '',
  };

  validateInputs(): boolean {
    let isValid = true;

    if (this.passwordLength <= 0) {
      this.errorMessages.passwordLength = 'Password length is required';
      isValid = false;
    } else {
      this.errorMessages.passwordLength = '';
    }
    if (!this.includeLetters && !this.includeNumbers && !this.includeSymbols) {
      this.errorMessages.includeOptions = 'Select at least one option';
      isValid = false;
    } else {
      this.errorMessages.includeOptions = '';
    }

    return isValid;
  }

  generatePassword() {
    const numbers = '1234567890';
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    const symbols = '!@#$%^&*()';

    let validChars = '';
    if (this.includeLetters) {
      validChars += letters;
    }
    if (this.includeNumbers) {
      validChars += numbers;
    }
    if (this.includeSymbols) {
      validChars += symbols;
    }

    let generatedPassword = '';
    for (let i = 0; i < this.passwordLength; i++) {
      const index = Math.floor(Math.random() * validChars.length);
      console.log(validChars);
      generatedPassword += validChars[index];
    }
    this.password = generatedPassword;
  }

  onChangeCheckBox(event: Event) {
    switch ((event.target as HTMLInputElement).id) {
      case 'includeLetters':
        this.includeLetters = !this.includeLetters;
        break;
      case 'includeNumbers':
        this.includeNumbers = !this.includeNumbers;
        break;
      case 'includeSymbols':
        this.includeSymbols = !this.includeSymbols;
        break;
    }
  }
  onPasswordLengthChange(event: Event) {
    if (isNaN(+(event.target as HTMLInputElement).value)) {
      this.passwordLength = 0;
      return;
    }
    this.passwordLength = +(event.target as HTMLInputElement).value;
  }
  onButtonClick() {
    if (this.validateInputs()) {
      this.generatePassword();
    }
  }
}
