import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditUserNameEmailComponent } from './dialog-edit-user-name-email.component';

describe('DialogEditUserNameEmailComponent', () => {
  let component: DialogEditUserNameEmailComponent;
  let fixture: ComponentFixture<DialogEditUserNameEmailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogEditUserNameEmailComponent]
    });
    fixture = TestBed.createComponent(DialogEditUserNameEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
