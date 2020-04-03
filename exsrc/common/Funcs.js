export function GetComponent(path) {
    return import('../view'+path).then(component=>{
        return component.default;
    }).catch(error=>{
        console.log(path);
        return 'An error occurred while loading the component '+error
    });
}

export function GetDocComponent(path) {
    return import('../doc/components'+path).then(component=>{
        return component.default;
    }).catch(error=>{
        console.log(path);
        return 'An error occurred while loading the component '+error
    });
}

export function GetModal(path) {
    return import('../modalview'+path).then(component=>{
        return component.default;
    }).catch(error=>{
        console.log(path);
        return 'An error occurred while loading the component '+error
    });
}

export function GetMarkdownRaw(path) {
    return import('../md'+path).then(component=>{
        return component.default;
    }).catch(error=>{
        console.log(path);
        return 'An error occurred while loading the markdown raw file '+error
    });
}