import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rupiahFormat',
  standalone: true,
})
export class RupiahFormatPipe implements PipeTransform {

  transform(value: number): string {
    // Convert value to string and remove any non-numeric characters
    const stringValue = value.toString().replace(/\D/g, '');
    
    // Format the string as Rupiah
    const formattedValue = Number(stringValue).toLocaleString('id-ID', {
      style: 'currency',
      currency: 'IDR'
    });

    // Remove the decimal part if it equals "00"
    const hasDecimal = formattedValue.includes(',00');
    if (hasDecimal) {
      return formattedValue.replace(',00', '');
    }

    return formattedValue;
  }

}
