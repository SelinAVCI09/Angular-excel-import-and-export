import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
import { RouterOutlet } from '@angular/router';
import { NgFor, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgFor, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Angular İmport ve Export Yapımı ';
  ExcelData: any;

  ReadExcel(event: any) {
    let file = event.target.files[0];
    let fileReader = new FileReader();
    fileReader.readAsBinaryString(file);
    fileReader.onload = (e) => {
      var workBook = XLSX.read(fileReader.result, { type: "binary" });
      var sheetNames = workBook.SheetNames;
      this.ExcelData = XLSX.utils.sheet_to_json(workBook.Sheets[sheetNames[0]]);
      console.log(this.ExcelData);
    }
  }

  getKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  exportToExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.ExcelData);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    
    XLSX.writeFile(wb, 'exportedData.xlsx');
  }
}
