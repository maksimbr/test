import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoreStoreComponent } from './core-store.component';

describe('CoreStoreComponent', () => {
  let component: CoreStoreComponent;
  let fixture: ComponentFixture<CoreStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoreStoreComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CoreStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
