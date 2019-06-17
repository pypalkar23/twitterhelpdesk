import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {
  months =['Jan','Feb','Mar','April','May','June','July','Aug','Sep','Oct','Nov','Dec'];
  transform(date: string, args?: any): any {
    let tempDate = new Date(date);
    let day=tempDate.getDate();
    let month=this.months[tempDate.getMonth()];
    let year=tempDate.getFullYear();
    let hour = this.getDoubleDigits(tempDate.getHours());
    let seconds = this.getDoubleDigits(tempDate.getSeconds());

    return day+" "+month+" "+year+" "+hour+":"+seconds;
  }

  getDoubleDigits(number){
    let result=(number<10)?"0"+number:""+number;
    return result;
  }
}
