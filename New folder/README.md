# Usage

```
ng new <MY_PROJECT>
```

Create the `.npmrc` file in the root directory and paste the contents:
```
@ComraxLTD:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=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
```

#

### Note to Yair: 
Putting the token here is insecure to a certain extent, but we have to make it as easy as possible for the developers to start.

#

```
cd <MY_PROJECT>
```
#

```
$ ng add @angular/material
 Choose a prebuilt theme name, or "custom" for a custom theme: Custom
 Set up global Angular Material typography styles? No
 Set up browser animations for Angular Material? Yes
```
### Note:
Every project has it's own theme, chosen by the ComraxLTD team.

#

``` 
npm install @ComraxLTD/kakal-ui
```

In app.module:

```
import { KakalUiModule } from '@ComraxLTD/kakal-ui';
import { MaterialModule } from '../angular-material/material.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    ...
    KakalUiModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
```

### Create `angular-material` folder in the src directory and `material.module.ts` file in the angular-material directory and import and export all the modules you wish to use.

#

# Example of material.module.ts:

```
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [],
  imports: [
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
  ],
  exports: [
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
  ]
})

export class MaterialModule { }
```
