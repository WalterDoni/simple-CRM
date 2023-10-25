import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditBuyedProductsComponent } from './dialog-edit-buyed-products.component';

describe('DialogEditBuyedProductsComponent', () => {
  let component: DialogEditBuyedProductsComponent;
  let fixture: ComponentFixture<DialogEditBuyedProductsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogEditBuyedProductsComponent]
    });
    fixture = TestBed.createComponent(DialogEditBuyedProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
