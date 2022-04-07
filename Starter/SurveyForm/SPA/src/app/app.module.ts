import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LocationStrategy, HashLocationStrategy, PathLocationStrategy } from '@angular/common';
import { NgxSpinnerModule } from "ngx-spinner";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//shared modules
import { SharedAppModule } from '../app/SHARED/shared-app.module';

// //B2B / B2C 
// import { IPublicClientApplication, PublicClientApplication, InteractionType, BrowserCacheLocation, LogLevel } from '@azure/msal-browser';
// import { MsalGuard, MsalInterceptor, MsalBroadcastService, MsalInterceptorConfiguration, MsalModule, MsalService, MSAL_GUARD_CONFIG, MSAL_INSTANCE, MSAL_INTERCEPTOR_CONFIG, MsalGuardConfiguration, MsalRedirectComponent } from '@azure/msal-angular';

// import {environment} from '../environments/environment';



// const isIE = window.navigator.userAgent.indexOf("MSIE ") > -1 || window.navigator.userAgent.indexOf("Trident/") > -1;

// export function loggerCallback(logLevel: LogLevel, message: string) {
// //  console.log(message);
// }

// export function MSALInstanceFactory(): IPublicClientApplication {
//   return new PublicClientApplication({
//     auth: {
//       clientId: environment.b2cConfig.clientId,
//       authority: environment.b2cConfig.authorities.signUpSignIn.authority,
//       redirectUri: environment.b2cConfig.redirectUrl,
//       postLogoutRedirectUri: '/',
//       knownAuthorities: [environment.b2cConfig.authorityDomain]
//     },
//     cache: {
//       cacheLocation: BrowserCacheLocation.LocalStorage,
//       storeAuthStateInCookie: isIE, // set to true for IE 11
//     },
//     system: {
//       loggerOptions: {
//         loggerCallback,
//         logLevel: LogLevel.Info,
//         piiLoggingEnabled: false
//       }
//     }
//   });
// }

// export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
//   const protectedResourceMap = new Map<string, Array<string>>();
//   protectedResourceMap.set(environment.b2cConfig.resources.webApiUrl, environment.b2cConfig.resources.scopes);

//   return {
//     interactionType: InteractionType.Redirect,
//     protectedResourceMap,
//   };
// }


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxSpinnerModule,
    SharedAppModule
  ],
  providers: [
    {
        provide: LocationStrategy,
        useClass: HashLocationStrategy
    }
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: MsalInterceptor,
    //   multi: true
    // },{
    //   provide: MSAL_INSTANCE,
    //   useFactory: MSALInstanceFactory
    // },{
    //   provide: MSAL_INTERCEPTOR_CONFIG,
    //   useFactory: MSALInterceptorConfigFactory
    // },
    // MsalService,
    // MsalBroadcastService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
