import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-category-image',
  standalone: true,
  imports: [],
  templateUrl: './category-image.component.html',
  styleUrl: './category-image.component.css'
})
export class CategoryImageComponent {
@Input({required:true}) obj !:{cuisine:string,image:string}

}
