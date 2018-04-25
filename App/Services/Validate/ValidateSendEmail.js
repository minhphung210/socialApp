export const checkContent = (data) => {
    let mess ="";
    if(data.newArr===""){
        mess="Please enter receiver "
    }if(data.password===""){
        mess="Please enter password"
    }if(data.content===""){
        mess ="Please enter content"
    }
    return mess ;
}