import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwitterConnectComponent } from './twitter-connect.component';

describe('TwitterConnectComponent', () => {
  let component: TwitterConnectComponent;
  let fixture: ComponentFixture<TwitterConnectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwitterConnectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwitterConnectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
