import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateInfoJsXmplComponent } from './update-info-js-xmpl.component';

describe('UpdateInfoJsXmplComponent', () => {
  let component: UpdateInfoJsXmplComponent;
  let fixture: ComponentFixture<UpdateInfoJsXmplComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [UpdateInfoJsXmplComponent],
    teardown: { destroyAfterEach: false }
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateInfoJsXmplComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
