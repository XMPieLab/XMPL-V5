import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateWithAngularSyntaxPersonalizedPageComponent } from './update-with-angular-syntax-personalized-page.component';

describe('UpdateWithAngularSyntaxPersonalizedPageComponent', () => {
  let component: UpdateWithAngularSyntaxPersonalizedPageComponent;
  let fixture: ComponentFixture<UpdateWithAngularSyntaxPersonalizedPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [UpdateWithAngularSyntaxPersonalizedPageComponent],
    teardown: { destroyAfterEach: false }
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateWithAngularSyntaxPersonalizedPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
