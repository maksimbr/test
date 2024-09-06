import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeaturesUserManagementComponent } from './features-user-management.component';
import { provideMockStore } from '@ngrx/store/testing';
import { UsersFacade } from '../state/users/users.facade';
import { of } from 'rxjs';

describe('FeaturesUserManagementComponent', () => {
  let component: FeaturesUserManagementComponent;
  let fixture: ComponentFixture<FeaturesUserManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturesUserManagementComponent],
      providers: [
        provideMockStore(),
        {
          provide: UsersFacade,
          useValue: {
            allUsers$: of([]),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FeaturesUserManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
