import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MixinComponent } from './mixin.component';

describe('MixinComponent', () => {
  let component: MixinComponent;
  let fixture: ComponentFixture<MixinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MixinComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MixinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
