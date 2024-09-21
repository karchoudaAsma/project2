import { Component } from "@angular/core";

@Component({
    selector: 'app-banner',
    templateUrl: 'banner.component.html',
    styleUrls: ['./banner.component.css']

})

export class BannerComponent {
    business: string = '';
    logo: string = 'https://www.liblogo.com/lib/orange-logo.html';
    
}
