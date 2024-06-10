import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PchomeDataComponent } from './pchome-data.component';

describe('PchomeDataComponent', () => {
  let component: PchomeDataComponent;
  let fixture: ComponentFixture<PchomeDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PchomeDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PchomeDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
