import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  user = {
    urlPrefix: 'forestry', // change to education 
    name: 'יוסי',
    lastName: 'שאולי',
    imgSrc: 'assets/images/userImage.jpg',
  };

  componentType = {
    forestry: {
      platformName: 'מפ"ק -  מערכת ניהול יער',
      leftLogoUrl: 'assets/images/left-logo-years-new.svg',
      productionProcess: { name: 'f' },

      dashboardScreen: {
        navbarComponent: 'steps',
        backgroundImage:
          'url(../../../assets/images/new-dashboard-background.jpg)',
        iconsArray: [
          {
            svgUrl: 'assets/images/forest.svg',
            name: 'ניהול יער',
            url: '/search',
          },
          {
            svgUrl: 'assets/images/trees.svg',
            name: 'תכנון תוכניות עבודה',
            url: '/search',
          },
        ],
      },
      navbarProjectSteps: [
        {
          text: 'בתכנון',
          src: 'assets/images/reload.svg',
          count: 2,
        },
        { text: 'בביצוע', src: 'assets/images/time-left.svg', count: 8 },
        { text: 'בהקפאה', src: 'assets/images/freezing.svg', count: 0 },
      ],
      wizardItems: [
        {
          src: 'assets/images/strategy(1).svg',
          text: 'תוכניות ייצור',
          url:'forestry/production-process'
        },
        {
          src: 'assets/images/logs.svg',
          text: 'יחידות עבודה',
          url:'work-unit'
          // text: ' תוכניות',
          // secondText: 'עבודה חדשות',
        },

      ],
    },

    education: {
      platformName: 'קק"ל חינוך - הזמנות טיולים',
      leftLogoUrl: 'assets/images/education-left-logo.svg',
      dashboardScreen: {
        navbarComponent: 'steps',
        backgroundImage:
          'url(../../../assets/images/education-table-background.jpg)',
        iconsArray: [
          {
            svgUrl: 'assets/images/05-destination.svg',
            name: 'הטיולים שלי',
            url: 'search',
          },
          {
            svgUrl: 'assets/images/button.svg',
            name: 'טיול חדש',
            url: 'search',
          },
          {
            svgUrl: 'assets/images/report.svg',
            name: 'הטיולים שלי',
            url: 'search',
          },
        ],
      },
      navbarProjectSteps: [
        {
          text: 'בתהליך',
          src: 'assets/images/reload.svg',
          count: 3,
        },
        { text: 'מחכה לאישור', src: 'assets/images/report.svg', count: 1 },
        { text: 'סגור', src: 'assets/images/finish-flag.svg', count: 20 },
      ],
      wizardItems: [
        {
          src: 'assets/images/05-destination.svg',
          text: 'הטיולים שלי',
        },
        {
          src: 'assets/images/button.svg',
          text: 'טיול חדש',
        },
        {
          src: 'assets/images/report.svg',
          text: 'דוחות',
        },
      ],
    },
  };

  constructor() { }
}
