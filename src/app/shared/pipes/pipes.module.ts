import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegexPipe } from './regex.pipe';



@NgModule({
  declarations: [RegexPipe],
  imports: [
    CommonModule
  ],
  exports: [RegexPipe],
})
export class PipesModule { }
