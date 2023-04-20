import { Action, EditorPlugin, Form, Icons, ITableRow } from 'table4react'

import './editor-aside.scss'

export class AsideEditorPlugin extends EditorPlugin {
    private _form: any = undefined
    name: string = 'aside-editor'

    constructor(private _startEditCallback: () => void, private _endEditCallback: () => void) {
        super()
    }

    protected startEditRow(row: ITableRow) {
        super.startEditRow(row)
        this._form = new Form(this._table.columns)
        this._form.addAction(new Action({
            name: 'save-form-action',
            title: 'Save',
            action: () => {
                this.endEditRow(true)
                this.save()
            },
            svg: Icons.save,
            container: 'bottom'
        }))
        this._form.addAction(new Action({
            name: 'cancel-form-action',
            title: 'Cancel',
            action: () => {
                this.endEditRow(false)
            },
            svg: Icons.cancel,
            container: 'bottom'
        }))
        this._form.object = row.rowData
        row.mode = 'edit-aside'
        this._startEditCallback()
    }
    protected endEditRow(commit: boolean) {
        if(!!this._form) {
            this._form.complete(commit)
            this._form = undefined
        }
        super.endEditRow(commit)
        this._endEditCallback()
    }
    onRowCreated(row: ITableRow): void {
    }
    get form(): any {
        return this._form
    }
}
