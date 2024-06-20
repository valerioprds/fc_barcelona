import { Component, OnInit, isDevMode } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'fc_barcelona';
  constructor(private translate: TranslateService) {
    // Set the default language
    this.translate.setDefaultLang('en');
    // Use the default language
    this.translate.use('en');
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }

  ngOnInit() {
    if (isDevMode()) {
      console.log('Development!');
    } else {
      console.log('Production!');
    }
  }
}
