import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  public name = 'Angular';

  // decrear form angular
  public form: FormGroup;
  public allChecked: boolean = false;
  public checkNo = 0;
  public selectedOrderIds: any[] = [];
  public lists = [
    { id: 100, name: 'order 1' },
    { id: 200, name: 'order 2' },
    { id: 300, name: 'order 3' },
    { id: 400, name: 'order 4' }
  ];

  constructor(private formBuilder: FormBuilder) {
    // Create a new array with a form control for each order
    const controls = this.lists.map(c => new FormControl(false));
    controls[0].setValue(true); this.checkNo += 1; // Set the first checkbox to true (checked)

    this.formBuilderGroup(controls);
  }

  public submit() {
    const checked = this.checked();
    console.log(checked);
  }

  public checked() {
    const selectedOrderIds = this.form.value.lists
      .map((v, i) => v ? this.lists[i].id : null)
      .filter(v => v !== null);

    return selectedOrderIds;
  }

  public checkAll(value: boolean) {
    if(!value) {
      this.checkNo = this.lists.length;
    } else {
      this.checkNo = 0;
    }

    // Create a new array with a form control for each order
    const controls = this.lists.map(c => new FormControl(false));
    
    const checkAllControls = controls.map(control => {
      control.setValue(!value);
      return control;
    });

    this.formBuilderGroup(checkAllControls);
  }

  public chicking(event) {
    const check = event.target.checked;
    
    if(check) {
      this.checkNo += 1;
    }else{
      this.checkNo -= 1;
    }

    if ( this.checkNo === this.lists.length) {
      this.allChecked = true;
    } else {
      this.allChecked = false;
    }
  }

  public formBuilderGroup(controls) {
    this.form = this.formBuilder.group({
      lists: new FormArray(controls)
    });
  }
}
