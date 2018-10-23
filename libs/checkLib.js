// for checking undefinded,empty or null
// trim is for removing unneccesary space
let trim = (x) =>{
    let value = String(x);
    return value.replace(/^\s+|\s+$/gm, '');
}

let isEmpty = (value) =>{
    if(value === undefined || trim(value) === '' || value === null || value.length === 0){
        return true;
    }
    else{
        return false;
    }
}

module.exports ={
    isEmpty: isEmpty
}