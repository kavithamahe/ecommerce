import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { ProductfilterPipe } from './productfilter.pipe';
@NgModule({
    declarations: [ProductfilterPipe],
    imports: [
        CommonModule
    ],
    exports: [
        ProductfilterPipe
    ]
})
export class ProductPipeModule {
    static forRoot() {
        return {
            ngModule: ProductPipeModule,
            providers: [],
        };
     }
}
