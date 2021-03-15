import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalizedPageComponent } from './personalized-page.component';

describe('PersonalizedPageComponent', () => {
  let component: PersonalizedPageComponent;
  let fixture: ComponentFixture<PersonalizedPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalizedPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalizedPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
