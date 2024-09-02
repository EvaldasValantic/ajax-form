import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Injector, OnChanges, OnDestroy, SimpleChanges, ViewContainerRef } from '@angular/core';
import { AjaxActionService } from '@spryker/ajax-action';
import { DataSerializerService } from '@spryker/data-serializer';
import { Subscription } from 'rxjs';
import { AjaxFormResponse } from '../types';
import * as i0 from "@angular/core";
export interface SubmitEvent extends Event {
    submitter: HTMLElement | null;
}
export declare class AjaxFormComponent implements OnDestroy, OnChanges {
    private ajaxActionService;
    private http;
    private cdr;
    private injector;
    private dataSerializerService;
    htmlRendererVcr?: ViewContainerRef;
    action?: string;
    method: string;
    subscription?: Subscription;
    submitSubscription?: Subscription;
    ajaxFormResponse?: AjaxFormResponse;
    isLoading: boolean;
    form?: string;
    formAction?: string;
    formMethod?: string;
    constructor(ajaxActionService: AjaxActionService, http: HttpClient, cdr: ChangeDetectorRef, injector: Injector, dataSerializerService: DataSerializerService);
    ngOnChanges(changes: SimpleChanges): void;
    refreshForm(): void;
    private fetchForm;
    ngOnDestroy(): void;
    submitHandler(form: HTMLFormElement, event: SubmitEvent): void;
    private responseHandler;
    static ɵfac: i0.ɵɵFactoryDeclaration<AjaxFormComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AjaxFormComponent, "spy-ajax-form", never, { "action": "action"; "method": "method"; }, {}, never, never, false, never>;
}
