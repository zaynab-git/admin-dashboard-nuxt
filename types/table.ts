type Dessert = {
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
    iron: string,
}


type Header = {
    text: string,
    value: string,
    align?: string,
    sortable?: boolean
}


export {Header, Dessert}