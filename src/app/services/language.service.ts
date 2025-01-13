import { Injectable } from '@angular/core';

interface Language {
  code: string;  
  name: string; 
  flag: string; 
}


@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  private _selectedLanguage: Language = {
    code: 'en',
    name: 'English',
    flag: 'https://flagcdn.com/w40/us.png',
  };

  get selectedLanguage(): Language  {
    return this._selectedLanguage;
  }

  set selectedLanguage(language: Language ) {
    this._selectedLanguage = language;
  }
}
