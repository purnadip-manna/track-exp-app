import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApplicationStateService {
  public getIsMobileResolution(): boolean {
    return (window.innerWidth < 768) ? true : false;
  }
}
