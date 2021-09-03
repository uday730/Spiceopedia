import { Component } from '@angular/core';
import { ActivatedRoute,Router,NavigationEnd,RouterEvent } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'spiceopedia';

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
    //console.log(router.url);
    router.events.subscribe((event) => {
    //  console.log(event);
      if (event !== null && event !==undefined ){
      //  console.log(event)
        let x  = <RouterEvent>event
       // this.page = x.url;
      }
    });
   
  }
}
