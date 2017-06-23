import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchMetierComponent } from './search-metier.component';

describe('SearchMetierComponent', () => {
  let component: SearchMetierComponent;
  let fixture: ComponentFixture<SearchMetierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchMetierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchMetierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
