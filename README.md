[![NPM version](https://img.shields.io/npm/v/@webacad/ng-mat-codemirror.svg?style=flat-square)](https://www.npmjs.com/package/@webacad/ng-mat-codemirror)
[![Build Status](https://img.shields.io/travis/Web-ACAD/ng-mat-codemirror.svg?style=flat-square)](https://travis-ci.org/Web-ACAD/ng-mat-codemirror)

# WebACAD/MatCodeMirror

CodeMirror form component for angular material. Based on [@webacad/ng-codemirror](https://github.com/Web-ACAD/ng-codemirror).

## Dependencies

* `@angular/animations`
* `@angular/cdk`
* `@angular/common`
* `@angular/core`
* `@angular/forms`
* `@angular/material`
* `@angular/platform-browser`
* `@webacad/ng-codemirror`
* `codemirror`
* `rxjs`

## Installation

```bash
$ npm install --save @webacad/ng-mat-codemirror
```

or with yarn

```bash
$ yarn add @webacad/ng-mat-codemirror
```

## Register module

**app.module.ts:**

```typescript
import {MatCodemirrorModule} from '@webacad/ng-mat-codemirror';

@NgModule({
	imports: [
		MatCodemirrorModule,
	],
})
export class AppModule {}
```

## Usage

```html
<wa-mat-codemirror mode="javascript"></wa-codemirror>
```

Look [here](https://github.com/Web-ACAD/ng-codemirror#usage) for more details.

## Using in angular forms

This package implements all the necessary code for angular forms. That means that you can use it just like any other 
ordinary form control.

It is also fully ready for material's `<mat-form-field>` component.
