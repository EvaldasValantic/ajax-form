import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AjaxFormComponent } from './ajax-form/ajax-form.component';
import { StaticHtmlRendererModule } from '@spryker/html-renderer';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { UnsavedChangesFormMonitorModule } from '@spryker/unsaved-changes.monitor.form';
import * as i0 from "@angular/core";
export class AjaxFormModule {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWpheC1mb3JtLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xpYnMvYWpheC1mb3JtL3NyYy9saWIvYWpheC1mb3JtLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUNwRSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNsRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDbEQsT0FBTyxFQUFFLCtCQUErQixFQUFFLE1BQU0sdUNBQXVDLENBQUM7O0FBT3hGLE1BQU0sT0FBTyxjQUFjOzs4SEFBZCxjQUFjOytIQUFkLGNBQWMsaUJBSFIsaUJBQWlCLGFBRHRCLFlBQVksRUFBRSx3QkFBd0IsRUFBRSxZQUFZLEVBQUUsK0JBQStCLGFBRXJGLGlCQUFpQjsrSEFFbEIsY0FBYyxZQUpiLFlBQVksRUFBRSx3QkFBd0IsRUFBRSxZQUFZLEVBQUUsK0JBQStCOzJGQUl0RixjQUFjO2tCQUwxQixRQUFRO21CQUFDO29CQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSx3QkFBd0IsRUFBRSxZQUFZLEVBQUUsK0JBQStCLENBQUM7b0JBQ2hHLFlBQVksRUFBRSxDQUFDLGlCQUFpQixDQUFDO29CQUNqQyxPQUFPLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQztpQkFDL0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEFqYXhGb3JtQ29tcG9uZW50IH0gZnJvbSAnLi9hamF4LWZvcm0vYWpheC1mb3JtLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTdGF0aWNIdG1sUmVuZGVyZXJNb2R1bGUgfSBmcm9tICdAc3ByeWtlci9odG1sLXJlbmRlcmVyJztcbmltcG9ydCB7IE56U3Bpbk1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvc3Bpbic7XG5pbXBvcnQgeyBVbnNhdmVkQ2hhbmdlc0Zvcm1Nb25pdG9yTW9kdWxlIH0gZnJvbSAnQHNwcnlrZXIvdW5zYXZlZC1jaGFuZ2VzLm1vbml0b3IuZm9ybSc7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgU3RhdGljSHRtbFJlbmRlcmVyTW9kdWxlLCBOelNwaW5Nb2R1bGUsIFVuc2F2ZWRDaGFuZ2VzRm9ybU1vbml0b3JNb2R1bGVdLFxuICAgIGRlY2xhcmF0aW9uczogW0FqYXhGb3JtQ29tcG9uZW50XSxcbiAgICBleHBvcnRzOiBbQWpheEZvcm1Db21wb25lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBBamF4Rm9ybU1vZHVsZSB7fVxuIl19