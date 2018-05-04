import {Component, OnChanges, DoCheck, OnDestroy, SimpleChanges, ElementRef, Input, Optional, Self, Inject} from '@angular/core';
import {NgControl, NgForm, FormGroupDirective, FormControl} from '@angular/forms';
import {ErrorStateMatcher, CanUpdateErrorState} from '@angular/material/core';
import {MatFormFieldControl} from '@angular/material/form-field';
import {CodemirrorComponent, WA_CODEMIRROR_DEFAULTS} from '@webacad/ng-codemirror';
import {Subject} from 'rxjs';
import * as CodeMirror from 'codemirror';


let nextUniqueId: number = 0;


@Component({
	selector: 'wa-mat-codemirror',
	template: '',
	providers: [
		{
			provide: MatFormFieldControl,
			useExisting: MatCodemirrorComponent,
		},
	],
})
export class MatCodemirrorComponent extends CodemirrorComponent implements
	OnChanges,
	DoCheck,
	OnDestroy,
	MatFormFieldControl<string>,
	CanUpdateErrorState
{


	@Input()
	public placeholder: string;

	@Input()
	public required: boolean = false;

	@Input()
	public errorStateMatcher: ErrorStateMatcher;

	public errorState: boolean = false;

	public readonly stateChanges: Subject<void> = new Subject<void>();

	public readonly shouldLabelFloat: boolean = true;

	private _disabled: boolean = false;

	private _id: string;

	private _uid: string = `wa-codemirror-${nextUniqueId++}`;


	constructor(
		el: ElementRef,
		private _defaultErrorStateMatcher: ErrorStateMatcher,
		@Optional() private _parentForm: NgForm,
		@Optional() private _parentFormGroup: FormGroupDirective,
		@Self() @Optional() public readonly ngControl: NgControl,
		@Inject(WA_CODEMIRROR_DEFAULTS) @Optional() defaults: CodeMirror.EditorConfiguration,
	) {
		super(el, defaults);

		if (this.ngControl !== null) {
			this.ngControl.valueAccessor = this;
		}
	}


	@Input()
	get value(): string
	{
		return this.codemirror ? this.codemirror.getValue() : '';
	}

	set value(value: string)
	{
		if (this.codemirror) {
			if (value !== this.value) {
				this.codemirror.setValue(value);
				this.stateChanges.next();
			}
		}
	}


	@Input()
	get disabled(): boolean
	{
		if (this.ngControl && this.ngControl.disabled !== null) {
			return this.ngControl.disabled;
		}

		return this._disabled;
	}

	set disabled(disabled: boolean)
	{
		this._disabled = disabled;
	}


	@Input()
	get id(): string
	{
		return this._id;
	}

	set id(id: string)
	{
		this._id = id || this._uid;
	}


	get empty(): boolean
	{
		return this.value !== '';
	}


	get focused(): boolean
	{
		if (this.codemirror) {
			return this.codemirror.hasFocus();
		}

		return false;
	}


	public ngOnChanges(changes: SimpleChanges): void
	{
		super.ngOnChanges(changes);

		if (typeof changes['value'] !== 'undefined' || typeof changes['required'] !== 'undefined') {
			this.stateChanges.next();
		}
	}


	public ngDoCheck(): void
	{
		if (this.ngControl) {
			this.updateErrorState();
		}
	}


	public ngOnDestroy(): void
	{
		this.stateChanges.complete();
	}


	public onContainerClick(event: MouseEvent): void
	{
		this.focus();
	}


	public focus(): void
	{
		if (this.codemirror) {
			this.codemirror.focus();
			this.stateChanges.next();
		}
	}


	public updateErrorState(): void
	{
		const oldState = this.errorState;
		const parent = this._parentFormGroup || this._parentForm;
		const matcher = this.errorStateMatcher || this._defaultErrorStateMatcher;
		const control = this.ngControl ? <FormControl>this.ngControl.control : null;
		const newState = matcher.isErrorState(control, parent);

		if (newState !== oldState) {
			this.errorState = newState;
			this.stateChanges.next();
		}
	}


	public setDescribedByIds(ids: Array<string>): void
	{
	}

}
