import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeaturesUserManagementComponent } from './features-user-management.component';

describe('FeaturesUserManagementComponent', () => {
  let component: FeaturesUserManagementComponent;
  let fixture: ComponentFixture<FeaturesUserManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturesUserManagementComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FeaturesUserManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
