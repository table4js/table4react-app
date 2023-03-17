import { ArrayDataProvider, Table, Table4, registerComponent } from 'table4react';
import { sampleData } from '../data';
import 'table4react/table4.css';
import './List.scss'

var options: any = {
    enableEdit: true,
    columns: [
        {
            name: "word",
            title: "Word"
        },
        {
            name: "num",
            title: "Number",
            type: "number"
        },
        {
            name: "text",
            title: "Text",
        }
    ],
  };
  
  var model = new Table(options);
  model.dataProvider = new ArrayDataProvider(sampleData);
  
  export function List() {
    return (
      <div className="abris-list-view">
          <Table4 model={model}/>
      </div>
    );
  }

  registerComponent("abris-list", List);