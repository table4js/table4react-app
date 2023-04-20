import { ArrayDataProvider } from 'table4react'
import declaration from '../assets/data/declaration.json'
import generated from '../assets/data/generated.json'

const dataProviders = {
    'declaration': new ArrayDataProvider(declaration),
    'generated': new ArrayDataProvider(generated),
}

export function getDataProvider(entity: keyof typeof dataProviders): ArrayDataProvider {
    return dataProviders[entity]
}