import { ArrayDataProvider, Table, Table4 } from 'table4react';
import { sampleData } from '../data';
import 'table4react/table4.css';

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
  
  export default function List() {
    return (
      <div className="App">
        <section style={{display: "block", width: "100%", height: "calc(100vh - 16px)"}}>
          <Table4 model={model}/>
        </section>
      </div>
    );
  }