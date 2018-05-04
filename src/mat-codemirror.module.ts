import {NgModule} from '@angular/core';
import {CodemirrorModule} from '@webacad/ng-codemirror';

import {MatCodemirrorComponent} from './mat-codemirror.component';


@NgModule({
	imports: [
		CodemirrorModule,
	],
	declarations: [
		MatCodemirrorComponent,
	],
	exports: [
		CodemirrorModule,
		MatCodemirrorComponent,
	],
})
export class MatCodemirrorModule {}
