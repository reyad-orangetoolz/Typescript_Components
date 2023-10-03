export const sortingFilters = (data: any): any => {
    let filter: Object;
    filter = data?.map((value: any, index: number) => {
        if (index === 0) {
            return { ...value, rules: 'WHERE' };
        } else {
            return { ...value, rules: value?.rules };
        }
    })

    return filter;
}

export const markingFilters = (data: any, id: number): any => {
    if (data?.length == 0) {
        return [...data, { rules: 'WHERE', id: 1, filter: 'select', condition: 'select', searchText: '' }]
    }

    return [...data, { rules: 'AND', id: id, filter: 'select', condition: 'select', searchText: '' }]
}
