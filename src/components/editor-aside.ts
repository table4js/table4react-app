import { ITableRow } from "table/row";
import { EditorPlugin, Form } from "table4react";

export class AsideEditorPlugin extends EditorPlugin {
    private _form: any = undefined;
    name: string = "aside-editor";

    constructor(private _startEditCallback: () => void, private _endEditCallback: () => void) {
        super()
    }

    protected startEditRow(row: ITableRow) {
        super.startEditRow(row);
        this._form = new Form(this._table.columns);
        this._form.object = row.rowData;
        row.mode = "edit-aside";
        this._startEditCallback()
    }
    protected endEditRow(commit: boolean) {
        super.endEditRow(commit);
        if(!!this._form) {
            this._form.complete(commit);
            this._form = undefined;
        }
        if(!!this._editedRow) {
            this._editedRow.mode = "default";
            this._editedRow.update();
            this._editedRow = undefined as any;
        }
        this._endEditCallback()
    }
    onRowCreated(row: ITableRow): void {
    }
    get form(): any {
        return this._form;
    }
}
