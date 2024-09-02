import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Injector, Input, ViewChild, ViewContainerRef, ViewEncapsulation, } from '@angular/core';
import { AjaxActionService } from '@spryker/ajax-action';
import { DataSerializerService } from '@spryker/data-serializer';
import { HtmlRendererComponent } from '@spryker/html-renderer';
import { AjaxFormRequestToken } from './tokens';
import * as i0 from "@angular/core";
import * as i1 from "@spryker/ajax-action";
import * as i2 from "@angular/common/http";
import * as i3 from "@spryker/data-serializer";
import * as i4 from "@angular/common";
import * as i5 from "@spryker/html-renderer";
import * as i6 from "ng-zorro-antd/spin";
import * as i7 from "@spryker/unsaved-changes.monitor.form";
export class AjaxFormComponent {
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
        this.subscription?.unsubscribe();
        this.submitSubscription?.unsubscribe();
    }
    submitHandler(form, event) {
        event.preventDefault();
        const submitElem = event.submitter;
        const submitForm = new FormData(form);
        if (submitElem) {
            const submitName = submitElem.getAttribute('name');
            const submitValue = submitElem.getAttribute('value') ?? '';
            if (submitName) {
                submitForm.append(submitName, submitValue);
            }
        }
        this.isLoading = true;
        if (this.action) {
            this.submitSubscription?.unsubscribe();
            this.submitSubscription = this.http
                .request((this.formMethod ?? this.method) || 'POST', this.formAction ?? this.action, {
                body: this.dataSerializerService.serialize(AjaxFormRequestToken, submitForm),
            })
                .subscribe({
                next: (response) => this.responseHandler(response),
                error: (response) => this.responseHandler(response),
            });
        }
    }
    responseHandler(response) {
        this.ajaxFormResponse = response;
        if (response.form) {
            this.form = response.form;
        }
        this.formAction = response.action;
        this.formMethod = response.method;
        this.isLoading = false;
        this.ajaxActionService.handle(response, this.htmlRendererVcr?.injector ?? this.injector);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWpheC1mb3JtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvYWpheC1mb3JtL3NyYy9saWIvYWpheC1mb3JtL2FqYXgtZm9ybS5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9saWJzL2FqYXgtZm9ybS9zcmMvbGliL2FqYXgtZm9ybS9hamF4LWZvcm0uY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2xELE9BQU8sRUFDSCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxRQUFRLEVBQ1IsS0FBSyxFQUlMLFNBQVMsRUFDVCxnQkFBZ0IsRUFDaEIsaUJBQWlCLEdBQ3BCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBSS9ELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLFVBQVUsQ0FBQzs7Ozs7Ozs7O0FBa0JoRCxNQUFNLE9BQU8saUJBQWlCO0lBZTFCLFlBQ1ksaUJBQW9DLEVBQ3BDLElBQWdCLEVBQ2hCLEdBQXNCLEVBQ3RCLFFBQWtCLEVBQ2xCLHFCQUE0QztRQUo1QyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQ3BDLFNBQUksR0FBSixJQUFJLENBQVk7UUFDaEIsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUFDdEIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUNsQiwwQkFBcUIsR0FBckIscUJBQXFCLENBQXVCO1FBZi9DLFdBQU0sR0FBRyxNQUFNLENBQUM7UUFLekIsY0FBUyxHQUFHLEtBQUssQ0FBQztJQVdmLENBQUM7SUFF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QUFpQixDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLGVBQWUsRUFBRSxRQUFRLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3pGLGdFQUFnRTtRQUNoRSxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzVCLENBQUM7O2lJQTdGUSxpQkFBaUI7cUhBQWpCLGlCQUFpQixpTUFDZixxQkFBcUIsMkJBQVUsZ0JBQWdCLGtEQ3ZDOUQsMFhBT0E7MkZEK0JhLGlCQUFpQjtrQkFWN0IsU0FBUzsrQkFDSSxlQUFlLGlCQUdWLGlCQUFpQixDQUFDLElBQUksbUJBQ3BCLHVCQUF1QixDQUFDLE1BQU0sUUFDekM7d0JBQ0YsS0FBSyxFQUFFLGVBQWU7cUJBQ3pCOzROQUlELGVBQWU7c0JBRGQsU0FBUzt1QkFBQyxxQkFBcUIsRUFBRSxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRTtnQkFHbkQsTUFBTTtzQkFBZCxLQUFLO2dCQUNHLE1BQU07c0JBQWQsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQge1xuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENoYW5nZURldGVjdG9yUmVmLFxuICAgIENvbXBvbmVudCxcbiAgICBJbmplY3RvcixcbiAgICBJbnB1dCxcbiAgICBPbkNoYW5nZXMsXG4gICAgT25EZXN0cm95LFxuICAgIFNpbXBsZUNoYW5nZXMsXG4gICAgVmlld0NoaWxkLFxuICAgIFZpZXdDb250YWluZXJSZWYsXG4gICAgVmlld0VuY2Fwc3VsYXRpb24sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWpheEFjdGlvblNlcnZpY2UgfSBmcm9tICdAc3ByeWtlci9hamF4LWFjdGlvbic7XG5pbXBvcnQgeyBEYXRhU2VyaWFsaXplclNlcnZpY2UgfSBmcm9tICdAc3ByeWtlci9kYXRhLXNlcmlhbGl6ZXInO1xuaW1wb3J0IHsgSHRtbFJlbmRlcmVyQ29tcG9uZW50IH0gZnJvbSAnQHNwcnlrZXIvaHRtbC1yZW5kZXJlcic7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgQWpheEZvcm1SZXNwb25zZSB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IEFqYXhGb3JtUmVxdWVzdFRva2VuIH0gZnJvbSAnLi90b2tlbnMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFN1Ym1pdEV2ZW50IGV4dGVuZHMgRXZlbnQge1xuICAgIC8vIFNlZSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvU3VibWl0RXZlbnQvc3VibWl0dGVyXG4gICAgLy8gU2VlIGh0dHBzOi8vaHRtbC5zcGVjLndoYXR3Zy5vcmcvbXVsdGlwYWdlL2Zvcm0tY29udHJvbC1pbmZyYXN0cnVjdHVyZS5odG1sI2RvbS1zdWJtaXRldmVudC1zdWJtaXR0ZXJcbiAgICBzdWJtaXR0ZXI6IEhUTUxFbGVtZW50IHwgbnVsbDtcbn1cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdzcHktYWpheC1mb3JtJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vYWpheC1mb3JtLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9hamF4LWZvcm0uY29tcG9uZW50Lmxlc3MnXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdzcHktYWpheC1mb3JtJyxcbiAgICB9LFxufSlcbmV4cG9ydCBjbGFzcyBBamF4Rm9ybUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uRGVzdHJveSwgT25DaGFuZ2VzIHtcbiAgICBAVmlld0NoaWxkKEh0bWxSZW5kZXJlckNvbXBvbmVudCwgeyByZWFkOiBWaWV3Q29udGFpbmVyUmVmIH0pXG4gICAgaHRtbFJlbmRlcmVyVmNyPzogVmlld0NvbnRhaW5lclJlZjtcblxuICAgIEBJbnB1dCgpIGFjdGlvbj86IHN0cmluZztcbiAgICBASW5wdXQoKSBtZXRob2QgPSAnUE9TVCc7XG5cbiAgICBzdWJzY3JpcHRpb24/OiBTdWJzY3JpcHRpb247XG4gICAgc3VibWl0U3Vic2NyaXB0aW9uPzogU3Vic2NyaXB0aW9uO1xuICAgIGFqYXhGb3JtUmVzcG9uc2U/OiBBamF4Rm9ybVJlc3BvbnNlO1xuICAgIGlzTG9hZGluZyA9IGZhbHNlO1xuICAgIGZvcm0/OiBzdHJpbmc7XG4gICAgZm9ybUFjdGlvbj86IHN0cmluZztcbiAgICBmb3JtTWV0aG9kPzogc3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgYWpheEFjdGlvblNlcnZpY2U6IEFqYXhBY3Rpb25TZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsXG4gICAgICAgIHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IsXG4gICAgICAgIHByaXZhdGUgZGF0YVNlcmlhbGl6ZXJTZXJ2aWNlOiBEYXRhU2VyaWFsaXplclNlcnZpY2UsXG4gICAgKSB7fVxuXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgICAgICBpZiAoJ2FjdGlvbicgaW4gY2hhbmdlcykge1xuICAgICAgICAgICAgdGhpcy5mZXRjaEZvcm0oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlZnJlc2hGb3JtKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmZldGNoRm9ybSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZmV0Y2hGb3JtKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5hY3Rpb24pIHtcbiAgICAgICAgICAgIHRoaXMuaXNMb2FkaW5nID0gdHJ1ZTtcblxuICAgICAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24gPSB0aGlzLmh0dHAuZ2V0PEFqYXhGb3JtUmVzcG9uc2U+KHRoaXMuYWN0aW9uKS5zdWJzY3JpYmUoe1xuICAgICAgICAgICAgICAgIG5leHQ6IChyZXNwb25zZSkgPT4gdGhpcy5yZXNwb25zZUhhbmRsZXIocmVzcG9uc2UpLFxuICAgICAgICAgICAgICAgIGVycm9yOiAocmVzcG9uc2UpID0+IHRoaXMucmVzcG9uc2VIYW5kbGVyKHJlc3BvbnNlKSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uPy51bnN1YnNjcmliZSgpO1xuICAgICAgICB0aGlzLnN1Ym1pdFN1YnNjcmlwdGlvbj8udW5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICBzdWJtaXRIYW5kbGVyKGZvcm06IEhUTUxGb3JtRWxlbWVudCwgZXZlbnQ6IFN1Ym1pdEV2ZW50KTogdm9pZCB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgY29uc3Qgc3VibWl0RWxlbSA9IGV2ZW50LnN1Ym1pdHRlcjtcbiAgICAgICAgY29uc3Qgc3VibWl0Rm9ybSA9IG5ldyBGb3JtRGF0YShmb3JtKTtcblxuICAgICAgICBpZiAoc3VibWl0RWxlbSkge1xuICAgICAgICAgICAgY29uc3Qgc3VibWl0TmFtZSA9IHN1Ym1pdEVsZW0uZ2V0QXR0cmlidXRlKCduYW1lJyk7XG4gICAgICAgICAgICBjb25zdCBzdWJtaXRWYWx1ZSA9IHN1Ym1pdEVsZW0uZ2V0QXR0cmlidXRlKCd2YWx1ZScpID8/ICcnO1xuXG4gICAgICAgICAgICBpZiAoc3VibWl0TmFtZSkge1xuICAgICAgICAgICAgICAgIHN1Ym1pdEZvcm0uYXBwZW5kKHN1Ym1pdE5hbWUsIHN1Ym1pdFZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaXNMb2FkaW5nID0gdHJ1ZTtcblxuICAgICAgICBpZiAodGhpcy5hY3Rpb24pIHtcbiAgICAgICAgICAgIHRoaXMuc3VibWl0U3Vic2NyaXB0aW9uPy51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgdGhpcy5zdWJtaXRTdWJzY3JpcHRpb24gPSB0aGlzLmh0dHBcbiAgICAgICAgICAgICAgICAucmVxdWVzdDxBamF4Rm9ybVJlc3BvbnNlPigodGhpcy5mb3JtTWV0aG9kID8/IHRoaXMubWV0aG9kKSB8fCAnUE9TVCcsIHRoaXMuZm9ybUFjdGlvbiA/PyB0aGlzLmFjdGlvbiwge1xuICAgICAgICAgICAgICAgICAgICBib2R5OiB0aGlzLmRhdGFTZXJpYWxpemVyU2VydmljZS5zZXJpYWxpemUoQWpheEZvcm1SZXF1ZXN0VG9rZW4sIHN1Ym1pdEZvcm0pLFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZSh7XG4gICAgICAgICAgICAgICAgICAgIG5leHQ6IChyZXNwb25zZSkgPT4gdGhpcy5yZXNwb25zZUhhbmRsZXIocmVzcG9uc2UpLFxuICAgICAgICAgICAgICAgICAgICBlcnJvcjogKHJlc3BvbnNlKSA9PiB0aGlzLnJlc3BvbnNlSGFuZGxlcihyZXNwb25zZSksXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHJlc3BvbnNlSGFuZGxlcihyZXNwb25zZTogQWpheEZvcm1SZXNwb25zZSk6IHZvaWQge1xuICAgICAgICB0aGlzLmFqYXhGb3JtUmVzcG9uc2UgPSByZXNwb25zZTtcblxuICAgICAgICBpZiAocmVzcG9uc2UuZm9ybSkge1xuICAgICAgICAgICAgdGhpcy5mb3JtID0gcmVzcG9uc2UuZm9ybTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZm9ybUFjdGlvbiA9IHJlc3BvbnNlLmFjdGlvbjtcbiAgICAgICAgdGhpcy5mb3JtTWV0aG9kID0gcmVzcG9uc2UubWV0aG9kO1xuXG4gICAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuYWpheEFjdGlvblNlcnZpY2UuaGFuZGxlKHJlc3BvbnNlLCB0aGlzLmh0bWxSZW5kZXJlclZjcj8uaW5qZWN0b3IgPz8gdGhpcy5pbmplY3Rvcik7XG4gICAgICAgIC8vIFRPRE86IGludmVzdGlnYXRlIEV4cHJlc3Npb25DaGFuZ2VkQWZ0ZXJJdEhhc0JlZW5DaGVja2VkRXJyb3JcbiAgICAgICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgfVxufVxuIiwiPGRpdiBjbGFzcz1cInNweS1hamF4LWZvcm0tY29udGFpbmVyXCIgW2NsYXNzLnNweS1hamF4LWZvcm0tY29udGFpbmVyLS1sb2FkaW5nXT1cImlzTG9hZGluZ1wiPlxuICAgIDxmb3JtICNzdWJtaXRGb3JtIChzdWJtaXQpPVwic3VibWl0SGFuZGxlcihzdWJtaXRGb3JtLCAkZXZlbnQpXCIgc3B5VW5zYXZlZENoYW5nZXNGb3JtTW9uaXRvcj5cbiAgICAgICAgPHNweS1odG1sLXJlbmRlcmVyICpuZ0lmPVwiZm9ybVwiIFtodG1sXT1cImZvcm1cIj48L3NweS1odG1sLXJlbmRlcmVyPlxuICAgIDwvZm9ybT5cbjwvZGl2PlxuXG48bnotc3BpbiAqbmdJZj1cImlzTG9hZGluZ1wiIGNsYXNzPVwic3B5LWFqYXgtZm9ybS1lbXB0eS1zdGF0ZVwiPjwvbnotc3Bpbj5cbiJdfQ==