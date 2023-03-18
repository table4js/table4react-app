import { ArrayDataProvider } from 'table4react'
import declaration from '../assets/data/declaration.json'
import generated from '../assets/data/generated.json'

export function getDataProvider(entity: string): ArrayDataProvider {
    if(entity === 'declaration') {
        return new ArrayDataProvider(declaration)
    }
    if(entity === 'generated') {
        return new ArrayDataProvider(generated)
    }
    throw new Error('Unknown entity')
}