import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEditionComponent } from './user-edition.component';

describe('UserEditionComponent', () => {
  let component: UserEditionComponent;
  let fixture: ComponentFixture<UserEditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserEditionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
