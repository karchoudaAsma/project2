import { Component } from "@angular/core";

@Component({
    selector: 'app-header',
    templateUrl:'./header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {

    title: string = 'OrangeLink  ';
    text: string = ' Votre lien essentiel vers un avenir connecté et innovant  ';

   
}