import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePersonalizedPageComponent } from './update-personalized-page.component';

describe('UpdatePersonalizedPageComponent', () => {
  let component: UpdatePersonalizedPageComponent;
  let fixture: ComponentFixture<UpdatePersonalizedPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [UpdatePersonalizedPageComponent],
    teardown: { destroyAfterEach: false }
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePersonalizedPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
