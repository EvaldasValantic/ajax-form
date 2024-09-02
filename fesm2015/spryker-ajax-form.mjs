import * as i0 from '@angular/core';
import { InjectionToken, ViewContainerRef, Component, ViewEncapsulation, ChangeDetectionStrategy, ViewChild, Input, NgModule } from '@angular/core';
import * as i4 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i5 from '@spryker/html-renderer';
import { HtmlRendererComponent, StaticHtmlRendererModule } from '@spryker/html-renderer';
import * as i1 from '@spryker/ajax-action';
import * as i2 from '@angular/common/http';
import * as i3 from '@spryker/data-serializer';
import * as i6 from 'ng-zorro-antd/spin';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import * as i7 from '@spryker/unsaved-changes.monitor.form';
import { UnsavedChangesFormMonitorModule } from '@spryker/unsaved-changes.monitor.form';

const AjaxFormRequestToken = new InjectionToken('AjaxFormRequest');

class AjaxFormComponent {
    constructor(ajaxActionService, http, cdr, injector, dataSerializerService) {
        this.ajaxActionService = ajaxActionService;
        this.http = http;
        this.cdr = cdr;
        this.injector = injector;
        this.dataSerializerService = dataSerializerService;
        this.method = 'POST';
        this.isLoading = false;
    }
    ngOnChanges(changes) {
        if ('action' in changes) {
            this.fetchForm();
        }
    }
    refreshForm() {
        this.fetchForm();
    }
    fetchForm() {
        if (this.action) {
            this.isLoading = true;
            this.subscription = this.http.get(this.action).subscribe({
                next: (response) => this.responseHandler(response),
                error: (response) => this.responseHandler(response),
            });
        }
    }
    ngOnDestroy() {
        var _a, _b;
        (_a = this.subscription) === null || _a === void 0 ? void 0 : _a.unsubscribe();
        (_b = this.submitSubscription) === null || _b === void 0 ? void 0 : _b.unsubscribe();
    }
    submitHandler(form, event) {
        var _a, _b, _c, _d;
        event.preventDefault();
        const submitElem = event.submitter;
        const submitForm = new FormData(form);
        if (submitElem) {
            const submitName = submitElem.getAttribute('name');
            const submitValue = (_a = submitElem.getAttribute('value')) !== null && _a !== void 0 ? _a : '';
            if (submitName) {
                submitForm.append(submitName, submitValue);
            }
        }
        this.isLoading = true;
        if (this.action) {
            (_b = this.submitSubscription) === null || _b === void 0 ? void 0 : _b.unsubscribe();
            this.submitSubscription = this.http
                .request(((_c = this.formMethod) !== null && _c !== void 0 ? _c : this.method) || 'POST', (_d = this.formAction) !== null && _d !== void 0 ? _d : this.action, {
                body: this.dataSerializerService.serialize(AjaxFormRequestToken, submitForm),
            })
                .subscribe({
                next: (response) => this.responseHandler(response),
                error: (response) => this.responseHandler(response),
            });
        }
    }
    responseHandler(response) {
        var _a, _b;
        this.ajaxFormResponse = response;
        if (response.form) {
            this.form = response.form;
        }
        this.formAction = response.action;
        this.formMethod = response.method;
        this.isLoading = false;
        this.ajaxActionService.handle(response, (_b = (_a = this.htmlRendererVcr) === null || _a === void 0 ? void 0 : _a.injector) !== null && _b !== void 0 ? _b : this.injector);
        // TODO: investigate ExpressionChangedAfterItHasBeenCheckedError
        this.cdr.markForCheck();
    }
}
/** @nocollapse */ AjaxFormComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AjaxFormComponent, deps: [{ token: i1.AjaxActionService }, { token: i2.HttpClient }, { token: i0.ChangeDetectorRef }, { token: i0.Injector }, { token: i3.DataSerializerService }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ AjaxFormComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: AjaxFormComponent, selector: "spy-ajax-form", inputs: { action: "action", method: "method" }, host: { classAttribute: "spy-ajax-form" }, viewQueries: [{ propertyName: "htmlRendererVcr", first: true, predicate: HtmlRendererComponent, descendants: true, read: ViewContainerRef }], usesOnChanges: true, ngImport: i0, template: "<div class=\"spy-ajax-form-container\" [class.spy-ajax-form-container--loading]=\"isLoading\">\n    <form #submitForm (submit)=\"submitHandler(submitForm, $event)\" spyUnsavedChangesFormMonitor>\n        <spy-html-renderer *ngIf=\"form\" [html]=\"form\"></spy-html-renderer>\n    </form>\n</div>\n\n<nz-spin *ngIf=\"isLoading\" class=\"spy-ajax-form-empty-state\"></nz-spin>\n", styles: ["@import\"https://fonts.googleapis.com/css?family=Montserrat:400,500,600&display=swap\";.ctx-spy-bg-white{background:var(--spy-global-bg-white, var(--spy-white, #fff))}.ctx-spy-bg-gray{background:var(--spy-global-bg-gray, var(--spy-gray-lighter, #f5f5f5))}.spy-ajax-form{display:block;width:100%;height:100%;position:relative}.spy-ajax-form-container{width:100%;height:100%}.spy-ajax-form-container--loading{background-color:var(--spy-gray-lighter, #f5f5f5);opacity:var(--spy-ajax-form-container-loading-opacity, 60%)}.spy-ajax-form-empty-state,.spy-ajax-form-empty-state.ant-spin-nested-loading{position:absolute;top:50%;left:50%}\n"], dependencies: [{ kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i5.HtmlRendererComponent, selector: "spy-html-renderer", inputs: ["spinnerSize"], outputs: ["htmlRendered"] }, { kind: "directive", type: i5.StaticHtmlRendererDirective, selector: "spy-html-renderer[html]", inputs: ["html"], exportAs: ["staticHtmlRendererProvider"] }, { kind: "component", type: i6.NzSpinComponent, selector: "nz-spin", inputs: ["nzIndicator", "nzSize", "nzTip", "nzDelay", "nzSimple", "nzSpinning"], exportAs: ["nzSpin"] }, { kind: "directive", type: i7.UnsavedChangesFormMonitorDirective, selector: "form[spyUnsavedChangesFormMonitor]", inputs: ["spyUnsavedChangesFormMonitor"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AjaxFormComponent, decorators: [{
            type: Component,
            args: [{ selector: 'spy-ajax-form', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        class: 'spy-ajax-form',
                    }, template: "<div class=\"spy-ajax-form-container\" [class.spy-ajax-form-container--loading]=\"isLoading\">\n    <form #submitForm (submit)=\"submitHandler(submitForm, $event)\" spyUnsavedChangesFormMonitor>\n        <spy-html-renderer *ngIf=\"form\" [html]=\"form\"></spy-html-renderer>\n    </form>\n</div>\n\n<nz-spin *ngIf=\"isLoading\" class=\"spy-ajax-form-empty-state\"></nz-spin>\n", styles: ["@import\"https://fonts.googleapis.com/css?family=Montserrat:400,500,600&display=swap\";.ctx-spy-bg-white{background:var(--spy-global-bg-white, var(--spy-white, #fff))}.ctx-spy-bg-gray{background:var(--spy-global-bg-gray, var(--spy-gray-lighter, #f5f5f5))}.spy-ajax-form{display:block;width:100%;height:100%;position:relative}.spy-ajax-form-container{width:100%;height:100%}.spy-ajax-form-container--loading{background-color:var(--spy-gray-lighter, #f5f5f5);opacity:var(--spy-ajax-form-container-loading-opacity, 60%)}.spy-ajax-form-empty-state,.spy-ajax-form-empty-state.ant-spin-nested-loading{position:absolute;top:50%;left:50%}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.AjaxActionService }, { type: i2.HttpClient }, { type: i0.ChangeDetectorRef }, { type: i0.Injector }, { type: i3.DataSerializerService }]; }, propDecorators: { htmlRendererVcr: [{
                type: ViewChild,
                args: [HtmlRendererComponent, { read: ViewContainerRef }]
            }], action: [{
                type: Input
            }], method: [{
                type: Input
            }] } });

class AjaxFormModule {
}
/** @nocollapse */ AjaxFormModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AjaxFormModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ AjaxFormModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: AjaxFormModule, declarations: [AjaxFormComponent], imports: [CommonModule, StaticHtmlRendererModule, NzSpinModule, UnsavedChangesFormMonitorModule], exports: [AjaxFormComponent] });
/** @nocollapse */ AjaxFormModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AjaxFormModule, imports: [CommonModule, StaticHtmlRendererModule, NzSpinModule, UnsavedChangesFormMonitorModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AjaxFormModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, StaticHtmlRendererModule, NzSpinModule, UnsavedChangesFormMonitorModule],
                    declarations: [AjaxFormComponent],
                    exports: [AjaxFormComponent],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { AjaxFormComponent, AjaxFormModule, AjaxFormRequestToken };
//# sourceMappingURL=spryker-ajax-form.mjs.map
